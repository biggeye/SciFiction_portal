import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  Input,
  Text,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { upload_video } from "../../utils/production/upload";
import VideoPlayer from "../shared/VideoPlayer";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import WarningModal from "../shared/WarningModal";


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
  const {
    isOpen: isDeleteVideoOpen,
    onOpen: onDeleteVideoOpen,
    onClose: onDeleteVideoClose,
  } = useDisclosure();
  useEffect(() => {
    fetchVideos(supabaseClient);
  }, []);
  const fetchVideos = async (supabaseClient) => {
    try {
      const { data, error } = await supabaseClient.from("videos_").select("*");
      if (error) throw error;
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error.message);
    }
  };
  useEffect(() => {
    if (deleteVideoUuid) {
      onDeleteVideoOpen();
    }
  }, [deleteVideoUuid]);
  const handleDelete = (uuid) => {
    setDeleteVideoUuid(uuid);
    onDeleteVideoOpen();
  };
  const handleDeleteConfirm = async () => {
    onDeleteVideoClose();
    await deleteVideo();
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

 
  return (
    <Box layerStyle="subPage">
     <Button
          size="xs"
          colorScheme="blue"
          onClick={onOpen}
        >
          Upload
        </Button>
      <Box overflowX="none" position="absolute" mt={2} ml={2}>
       
      </Box>
      <Table variant="simple" mt={10}>
        <Thead>
          <Tr>
            <Th>Video</Th>
            <Th>Name</Th>
            <Th>Title</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {videos &&
            videos.map((video) => (
              <Tr key={video.uuid}>
                <Td>
                  <VideoPlayer s3Url={video.url} />
                </Td>
                <Td>{video.name}</Td>
                <Td>{video.title}</Td>
                <Td>
                  <Button
                    isLoading={isLoading}
                    size="xs"
                    onClick={() => handleDelete(video.uuid)}
                  >
                    delete
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <WarningModal
        isOpen={isDeleteVideoOpen}
        onClose={onDeleteVideoClose}
        onConfirm={handleDeleteConfirm}
        title="Confirm Delete"
        content="Are you sure you want to delete this Video?"
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Upload Video</DrawerHeader>
          <DrawerBody>
            <FormControl>
              <form id="uploadVideo" onSubmit={uploadVideo}>
                <Box direction="column">
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
                  <Text>Video Upload</Text>
                  <Box w="20vw">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                    />
                  </Box>
                </Box>
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