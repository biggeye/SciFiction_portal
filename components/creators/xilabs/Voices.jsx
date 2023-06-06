import React from "react";
import { useState, useEffect } from "react";
import {
  ButtonGroup,
  Box,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Textarea,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import AudioPlayer from "../shared/AudioPlayer";

export default function Voices() {
  const header = ["Name", "Voice ID", "Preview", "Actions"];
  const color1 = useColorModeValue("brand.400", "brand.400");
  const color2 = useColorModeValue("brand.400", "brand.400");

  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const sizes = ["xs", "sm", "md", "lg", "xl"];
  const [currentName, setCurrentName] = useState("");
  const [currentVoiceId, setCurrentVoiceId] = useState("");
  const [script, setScript] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchYourData().then((fetchedData) => {
      setData(fetchedData);
    });
  }, []);

  const fetchYourData = async () => {
    const response = await axios.get(
      "https://flask-vercel-silk.vercel.app/api/xilabs/get_voices"
    );
    const voices = response.data.voices;

    const tableData = voices.map((voice) => ({
      name: voice.name,
      voice_id: voice.voice_id,
      sample: voice.preview_url,
    }));

    return tableData;
  };

  const handleFormInputChange = (e) => {
    setScript(e.target.value);
  };

  const createTTS = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const voice_id = currentVoiceId;
    const data = {
      voice_id: voice_id,
      script: script,
    };

    const response = await axios.post(
      "https://flask-vercel-silk.vercel.app/api/xilabs/tts",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setIsLoading(false); // set loading state to false when the function ends
    onClose();
  };

  return (
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={50}
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap" // allow cards to wrap to new lines
    >
      {data.map((token, tid) => (
        <Box
          key={tid}
          bg="white"
          _dark={{ bg: "brand.800" }}
          m={4} // some margin for separation
          borderRadius="md" // rounded corners
          overflow="hidden" // keep child boundaries within card
          boxShadow="sm" // small shadow for 3D effect
          textAlign="center"
        >
          <Box p={4}>
            {Object.keys(token).map((x) => {
              if (x === "voice_id") return null;

              return (
                <Text key={`${tid}${x}`}>
                  {x === "sample" ? (
                    <AudioPlayer src={token[x]} />
                  ) : (
                    <>
                      <Text size="md" as="b">
                        {token[x]}
                      </Text>
                    </>
                  )}
                </Text>
              );
            })}
          </Box>

          <Flex justifyContent="flex-end" p={2}>
            <IconButton
              size="xs"
              colorScheme="blue"
              icon={<BsBoxArrowUpRight />}
              aria-label="Up"
              onClick={() => {
                setCurrentName(token["name"]);
                setCurrentVoiceId(token["voice_id"]);
                onOpen();
              }}
            />
          </Flex>
        </Box>
      ))}

      <Drawer
        size={sizes}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <form id="TTS" onSubmit={createTTS}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{currentName}</DrawerHeader>

            <DrawerBody>
              <Flex>
                <Textarea
                  h="100%"
                  rows="auto"
                  placeholder="Type or paste the script here"
                  name="script"
                  onChange={handleFormInputChange}
                />
              </Flex>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isLoading} // Add this line to use the isLoading state
              >
                Generate Voiceover
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </Flex>
  );
}
