import React, { useEffect, useState } from "react";
import { Box, Image, Button, Input, Spinner } from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Avatar({ uid, url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const supabase = useSupabaseClient();
  const user = useUser();
  useEffect(() => {
    async function downloadImage(path) {
      try {
        const { data, error } = await supabase.storage.from("avatars").download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) {
      downloadImage(url);
    }
  }, [url, supabase]);

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      let { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box>
      {avatarUrl ? (
        <Image boxSize={size} src={avatarUrl} alt="Avatar" />
      ) : (
        <Box boxSize={size} bg="brand.200" />
      )}
      <Box w={size}>
        <Input
          type="file"
          id="avatar-input"
          accept="image/*"
          onChange={uploadAvatar}
          isDisabled={uploading}
          visibility="hidden"
          position="absolute"
        />
        <Button
          as="label"
          htmlFor="avatar-input"
          size="sm"
          colorScheme="teal"
          isLoading={uploading}
          loadingText="Uploading..."
          variant="outline"
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
}
