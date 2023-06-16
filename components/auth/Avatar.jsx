'use client';
import React, { useEffect, useState } from 'react';
import { Box, Image, Button, Input, useDisclosure, Spinner } from "@chakra-ui/react";

export default function Avatar({ supabaseClient, user, uid, url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path) {
      try {
        const { data, error } = await supabaseClient.storage.from('avatars').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (url) downloadImage(url)
  }, [url, supabaseClient])

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      let { error: uploadError } = await supabaseClient.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert('Error uploading avatar!')
    } finally {
      setUploading(false)
    }
  }

  return (
    <Box>
      {avatarUrl ? (
        <Image
          boxSize={size}
          src={avatarUrl}
          alt="Avatar"
        />
      ) : (
        <Box boxSize={size} bg="brand.200" />
      )}
      <Box w={size}>
        <Input
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          isDisabled={uploading}
          visibility="hidden"
          position="absolute"
        />
        <Button
          as="label"
          htmlFor="single"
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
  )
}