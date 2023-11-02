import React, { useEffect, useState } from "react";
import axios from "axios";
import AudioPlayer from "../shared/AudioPlayer";
import { upload_voiceover } from "../../utils/production/upload";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
import WarningModal from "../shared/WarningModal";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Waveform from "../shared/Waveform";


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


  const {
    isOpen: isDeleteVoiceoverOpen,
    onOpen: onDeleteVoiceoverOpen,
    onClose: onDeleteVoiceoverClose,
  } = useDisclosure();

  const handleDelete = (uuid) => {
    setDeleteVoiceoverUuid(uuid);
    onDeleteVoiceoverOpen();
  };
  const handleDeleteConfirm = async () => {
    onDeleteVoiceoverClose();
    await deleteVoiceover();
  };
  useEffect(() => {
    if (deleteVoiceoverUuid) {
      onDeleteVoiceoverOpen();
    }
  }, [deleteVoiceoverUuid]);

  useEffect(() => {
    fetchVoiceovers(supabaseClient, setVoiceovers);
  }, []);

  const fetchVoiceovers = async (supabaseClient) => {
    try {
      const { data, error } = await supabaseClient
        .from("master_content")
        .select("*");
      if (error) throw error;
      setVoiceovers(data);
      return data;
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
    setIsLoading(true);
    const newVoiceOverUuid = await upload_voiceover(
      userInFile,
      uploadVoiceoverName,
      uploadVoiceoverTitle,
      userId,
      supabaseClient
    );
    setIsLoading(false);
    fetchVoiceovers(supabaseClient);
    onClose();
  };

  const deleteVoiceover = async () => {
    setIsLoading(true);
    const { data, error } = await supabaseClient
      .from("master_content")
      .delete()
      .eq("uuid", deleteVoiceoverUuid);
    if (!error) {
      setIsLoading(false);
      fetchVoiceovers(supabaseClient);
      onClose();
    }
  };

  return (
    <Box layerStyle="subPage">
      <Box overflowX="none" position="absolute" mt={2} ml={2}>
        <Button
          size="xs"
          colorScheme="blue"
          onClick={onOpen}
        >
          Upload
        </Button>
      </Box>
  
      <Box p={50}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Voiceover</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {voiceovers.map((voiceover) => (
              <Tr key={voiceover.uuid}>
                <Td>
                  <AudioPlayer src={voiceover.url} />
                </Td>
                <Td>{voiceover.name}</Td>
                <Td>{voiceover.title}</Td>
                <Td>
                  <Button
                    isLoading={isLoading}
                    size="xs"
                    onClick={() => handleDelete(voiceover.uuid)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
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
