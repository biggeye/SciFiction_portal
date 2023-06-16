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

const convertToDataURI = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function Voiceovers({ supabaseClient, user }) {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [voiceovers, setVoiceovers] = useState([]);
  const [userInFile, setUserInFile] = useState([]);
  const [uploadVoiceoverName, setUploadVoiceoverName] = useState("");
  const [uploadVoiceoverTitle, setUploadVoiceoverTitle] = useState("");

  const userId = user;

  useEffect(() => {
    fetchVoiceovers();
  }, []);
  const fetchVoiceovers = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("voiceover_")
        .select("*");
      if (error) throw error;
      setVoiceovers(data);
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
fetchVoiceovers();
  };

  return (
      <Box width="fill" height="fill" overflowX="none">
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
        w="full"
        bg="brand.700"
        _dark={{ bg: "#3e3e3e" }}
        p={50}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap" // allow cards to wrap to new lines
      >
      {voiceovers.map((voiceover) => (
        <Box
          key={voiceover.uuid}
          w="200px"
          bgImage="radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(215,215,215,1) 17%, rgba(181,181,181,0.7343312324929971) 67%, rgba(144,190,226,0.42620798319327735) 100%)"
          _dark={{ bg: "brand.900" }}
          m={4}
          borderWidth="1px"
          borderColor="brand.200"
          borderRadius="md" // rounded corners
          overflow="hidden" // keep child boundaries within card
          boxShadow="xl" // small shadow for 3D effect
          textAlign="center"
        >
          <Box p={4}>
            <AudioPlayer src={voiceover.url} />
            <Text size="md" as="b">
              {voiceover.name}
            </Text>
            <Text size="sm">{voiceover.title}</Text>
          </Box>
        </Box>
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
