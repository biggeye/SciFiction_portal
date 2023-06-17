import React, { useEffect, useState } from "react";
import axios from "axios";
import AudioPlayer from "../shared/AudioPlayer";
import { upload_voiceover } from "../../utils/production/upload";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
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
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Spacer,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  VStack,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

const convertToDataURI = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });






export default function Voiceovers() {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [voiceovers, setVoiceovers] = useState([]);
  const [userInFile, setUserInFile] = useState([]);
  const [uploadVoiceoverName, setUploadVoiceoverName] = useState("");
  const [uploadVoiceoverTitle, setUploadVoiceoverTitle] = useState("");
  const [deleteVoiceoverUuid, setDeleteVoiceoverUuid] = useState("");

  const userId = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    fetchVoiceovers(supabaseClient, setVoiceovers);
  }, []);
  useEffect(() => {
    if (deleteVoiceoverUuid) {
        deleteVoiceover();
    }
}, [deleteVoiceoverUuid]);


const fetchVoiceovers = async (supabaseClient) => {
  try {
    const { data, error } = await supabaseClient
      .from("voiceover_")
      .select("*");
    if (error) throw error;
    setVoiceovers(data);
    return (data);
  } catch (error) {
    console.error("Error fetching voiceovers:", error.message);
  }
};

  const handleAudioUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const URI = await convertToDataURI(file);
      setUserInFile(URI);
    }
  };
  const uploadVoiceover = async (event) => {
    event.preventDefault();
    const newVoiceOverUuid = await upload_voiceover(
      userInFile,
      uploadVoiceoverName,
      uploadVoiceoverTitle,
      userId,
      supabaseClient
    );
fetchVoiceovers(supabaseClient);
  };

const deleteVoiceover = async() => {
  setIsLoading(true);
  const { data, error } = await supabaseClient
  .from('voiceover_')
  .delete()
  .eq('uuid', deleteVoiceoverUuid)
if (!error) {
  setIsLoading(false);
  fetchVoiceovers(supabaseClient);
}
}

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
   flexWrap="wrap"// allow cards to wrap to new lines
      >
      {voiceovers.map((voiceover) => (
        
          <Card key={voiceover.uuid}
          layerStyle="card">
            <AudioPlayer src={voiceover.url} />
       
             <Text > {voiceover.name}</Text>
     
            <Text size="sm">{voiceover.title}</Text>
            <Button isLoading={isLoading} size="xs" onClick={() => setDeleteVoiceoverUuid(voiceover.uuid)}>delete</Button>
            </Card>
        
      ))}

    </Flex>
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Upload Voiceover</DrawerHeader>

          <DrawerBody>
            <FormControl>
              <form id="uploadVoiceover" onSubmit={uploadVoiceover}>
                <Flex direction="column">
                  <Text>Voice Model Name</Text>
                  <Input
                    type="text"
                    value={uploadVoiceoverName}
                    onChange={(e) => setUploadVoiceoverName(e.target.value)}
                  />

                  <Text>Description</Text>
                  <Input
                    type="text"
                    value={uploadVoiceoverTitle}
                    onChange={(e) => setUploadVoiceoverTitle(e.target.value)}
                  />
                </Flex>
                <Card>
                  <Text>Voiceover Upload</Text>
                  <Box w="20vw">
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleAudioUpload}
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
