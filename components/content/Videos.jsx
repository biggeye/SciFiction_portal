import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Center,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { upload_video } from "../../utils/production/upload";
import VideoPlayer from "../shared/VideoPlayer";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const convertToDataURI = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function Videos() {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [videos, setVideos] = useState([]);
  const [deleteVideoUuid, setDeleteVideoUuid] = useState("");
  const [uploadVideoName, setUploadVideoName] = useState("");
  const [uploadVideoTitle, setUploadVideoTitle] = useState("");
  const [userInFile, setUserInFile] = useState(null);

  const userId = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    fetchVideos(supabaseClient);
  }, []);

  useEffect(() => {
    if (deleteVideoUuid) {
      deleteVideo();
    }
  }, [deleteVideoUuid]);

  const fetchVideos = async (supabaseClient) => {
    try {
      const { data, error } = await supabaseClient.from("videos_").select("*");
      if (error) throw error;
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error.message);
    }
  };

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const URI = await convertToDataURI(file);
      setUserInFile(URI);
    }
  };

  const uploadVideo = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const newVideoUuid = await upload_video(
      userInFile,
      uploadVideoName,
      uploadVideoTitle,
      userId,
      supabaseClient
    );
    setIsLoading(false);
    fetchVideos(supabaseClient);
    onClose();
  };

  const deleteVideo = async (event) => {
    setIsLoading(true);
    const { data, error } = await supabaseClient
      .from("videos_")
      .delete()
      .eq("uuid", deleteVideoUuid);
    if (!error) {
      setIsLoading(false);
      fetchVideos(supabaseClient);
    }
  };

  return (
    <Box layerStyle="subPage">
            <Box overflowX="none" position="absolute" mt={2} ml={2}>
        <Button
          size="xs"
          colorScheme="blue"
          onClick={() => {
            onOpen();
          }}
        >
          Upload
        </Button>
      </Box>
      <Flex
        p={50}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap" // allow cards to wrap to new lines
      >
        {videos &&
          videos.map((video) => (
            <Box layerStyle="videoCard" key={video.uuid} p={5}>
 
                <VideoPlayer s3Url={video.url}/>
                <Center>
                  {video.name}
                  <br />
                  {video.title}
                </Center>
                <Flex justifyContent="flex-end">
                  <Button
                    isLoading={isLoading}
                    size="xs"
                    onClick={() => setDeleteVideoUuid(video.uuid)}
                  >
                    delete
                  </Button>
                </Flex>
 
            </Box>
          ))}
        <hr />
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Upload Video</DrawerHeader>

          <DrawerBody>
            <FormControl>
              <form id="uploadVideo" onSubmit={uploadVideo}>
                <Flex direction="column">
                  <Text>Name</Text>
                  <Input
                    type="text"
                    value={uploadVideoName}
                    onChange={(e) => setUploadVideoName(e.target.value)}
                  />

                  <Text>Title</Text>
                  <Input
                    type="text"
                    value={uploadVideoTitle}
                    onChange={(e) => setUploadVideoTitle(e.target.value)}
                  />
                </Flex>
                <Card>
                  <Text>Video Upload</Text>
                  <Box w="20vw">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                    />
                  </Box>
                </Card>
                <DrawerFooter>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    isLoading={isLoading}
                  >
                    Upload
                  </Button>
                </DrawerFooter>
              </form>
            </FormControl>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
