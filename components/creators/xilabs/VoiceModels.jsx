import React, { useState, useEffect } from "react";
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
  Stack,
} from "@chakra-ui/react";
import { RiDeleteBin2Line
} from "react-icons/ri";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import AudioPlayer from "../../shared/AudioPlayer";
import AudioRecorder from "../../shared/AudioRecorder";
import XilabsVoiceovers from "./XilabsVoiceovers";

export default function VoiceModels() {
  const [isLoading, setIsLoading] = useState(false);
  const btnRef = React.useRef();
  const sizes = ["xs", "sm", "md", "lg", "xl"];
  const [data, setData] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  //createNewVoiceover
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentName, setCurrentName] = useState("");
  const [currentVoiceId, setCurrentVoiceId] = useState("");
  const [script, setScript] = useState("");
  const [stabilityValue, setStabilityValue] = useState(50);
  const [similarityValue, setSimilarityValue] = useState(50);
  //createNewVoice
  const {
    isOpen: isNewVoiceOpen,
    onOpen: onNewVoiceOpen,
    onClose: onNewVoiceClose,
  } = useDisclosure();
  const [newVoiceName, setNewVoiceName] = useState("");
  const [newVoiceLabels, setNewVoiceLabels] = useState("");
  const [newVoiceDescription, setNewVoiceDescription] = useState("");
  const [newVoiceFile, setNewVoiceFile] = useState(null);
  const [voiceInputOption, setVoiceInputOption] = useState("upload");
  //editVoice
  const [editVoiceName, setEditVoiceName] = useState("");
  const [editVoiceLabels, setEditVoiceLabels] = useState("");
  const [editVoiceDescription, setEditVoiceDescription] = useState("");
  const [editVoiceFile1, setEditVoiceFile1] = useState(null);
  const [editVoiceFile2, setEditVoiceFile2] = useState(null);

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

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
      stability_amt: stabilityValue,
      similarity_amt: similarityValue,
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
  const createNewVoice = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", newVoiceName);
    formData.append("labels", newVoiceLabels);
    formData.append("description", newVoiceDescription);
    formData.append("file1", newVoiceFile);
      const response = await axios.post(
        "https://flask-vercel-silk.vercel.app/api/xilabs/create_new_voice",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    setIsLoading(false);
    onNewVoiceClose();
  };
  const editVoice = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", editVoiceName);
    formData.append("labels", editVoiceLabels);
    formData.append("description", editVoiceDescription);
    formData.append("file1", editVoiceFile1);
    formData.append("file2", editVoiceFile2);
    formData.append("voice_id", currentName);

    try {
      const response = await axios.post(
        "https://flask-vercel-silk.vercel.app/api/xilabs/edit_voice",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

    } catch (error) {
      if (response.status === 413) {
        console.log("File Size Too Large")
      }
    }

    setIsLoading(false);
    onClose();
  };
  const deleteVoice = async (voice_id) => {
    const confirmation = window.confirm("Are you sure you want to delete?");

    if (confirmation) {
      setIsLoading(true);
    
    const response = await axios.post(
        "https://flask-vercel-silk.vercel.app/api/xilabs/delete_voice",
        { "voice_id": voice_id }
    );
    if (response.status === 200) {
      window.alert("Voice Model Deleted.");
      fetchYourData().then((fetchedData) => {
        setData(fetchedData);
      });
    } else {
      window.alert("Something went wrong.");
    }
    setIsLoading(false);
    fetchYourData();
    onClose();
};
  };

  return (
    <Box width="fill" height="fill">
      <Box position="absolute" mt={2} ml={2}>
        <Button
          size="xs"
          colorScheme="blue"
          onClick={() => {
            onNewVoiceOpen();
          }}
        >
          New
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
        {data.map((token, tid) => (
    <Box
    key={tid}
    w="200px"
    bg="brand.200"
    _dark={{ bg: "brand.900" }}
    m={4}
    borderWidth="3px"
    borderColor="brand.400"
    borderRadius="md" // rounded corners
    overflow="hidden" // keep child boundaries within card
    boxShadow="xl" // small shadow for 3D effect
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
           
                        <Text size="md" as="b">
                          {token[x]}
                          </Text>
   
                    )}
                  </Text>
                );
              })}
            </Box>

            <Flex justifyContent="flex-end" p={1}>
              <IconButton
              tooltip="Create Voiceover"
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
               <IconButton
               tooltip="Delete"
                size="xs"
                colorScheme="red"
                icon={<RiDeleteBin2Line />}
                aria-label="Up"
                onClick={() => {
                  setCurrentName(token["name"]);
                  setCurrentVoiceId(token["voice_id"]);
                  deleteVoice(token["voice_id"]);
                }}
              />
            </Flex>
          </Box>
        ))}
      </Flex>
<XilabsVoiceovers />
      <Drawer
        size={sizes}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{currentName}</DrawerHeader>

          <DrawerBody>
            <Tabs
              index={tabIndex}
              onChange={(index) => setTabIndex(index)}
              variant="enclosed"
            >
              <TabList>
                <Tab>Create Voiceover</Tab>
                <Tab>Edit Voice Model</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Flex direction="column">
                    <form id="TTS" onSubmit={createTTS}>
                      <Textarea
                        h="100%"
                        rows="auto"
                        placeholder="Type or paste the script here"
                        name="script"
                        onChange={handleFormInputChange}
                      />
                      <Spacer />
                      <VStack>
                        <Text>Stability Value</Text>
                        <Slider
        step={0.01}
                          min={0}
                          max={1}
                          aria-label="slider-stability"
                          onChange={(val) => setStabilityValue(val)}
                        >
                          <SliderMark
                            value={stabilityValue}
                            textAlign="center"
                            bg="blue.500"
                            color="white"
                          ></SliderMark>
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>

                        <Text>Similarity Value</Text>
                        <Slider
                        min={0}
                        max={1}
                        step={0.01}
                          aria-label="slider-similarity"
                          onChange={(val) => setSimilarityValue(val)}
                        >
                          <SliderMark
                            value={similarityValue}
                            textAlign="center"
                            bg="brand.500"
                            color="white"
                          ></SliderMark>
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                      </VStack>
                    </form>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <VStack>
                    <form id="editVoice" onSubmit={editVoice}>
                      <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                          type="text"
                          value={currentName}
                          isDisabled="true"
                          onChange={(e) => setEditVoiceName(e.target.value)}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Labels</FormLabel>
                        <Input
                          type="text"
                          value={editVoiceLabels}
                          onChange={(e) => setEditVoiceLabels(e.target.value)}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                          value={editVoiceDescription}
                          onChange={(e) =>
                            setEditVoiceDescription(e.target.value)
                          }
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Voice Sample 1</FormLabel>
                        <Input
                          type="file"
                          accept="audio/mpeg"
                          onChange={(e) => setEditVoiceFile1(e.target.files[0])}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Voice Sample 2</FormLabel>
                        <Input
                          type="file"
                          accept="audio/mpeg"
                          onChange={(e) => setEditVoiceFile2(e.target.files[0])}
                        />
                      </FormControl>
                    </form>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>

          <DrawerFooter>
            <Flex>
              {tabIndex === 0 && (
                <Button
                  type="submit"
                  form="TTS"
                  colorScheme="blue"
                  isLoading={isLoading}
                >
                  Generate Voiceover
                </Button>
              )}
              {tabIndex === 1 && (
                <Button
                  type="submit"
                  form="editVoice"
                  colorScheme="blue"
                  isLoading={isLoading}
                >
                  Edit Voice
                </Button>
              )}
              <Spacer />
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer
        placement="bottom"
        onClose={onNewVoiceClose}
        isOpen={isNewVoiceOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Create New Voice Model
          </DrawerHeader>
          <DrawerBody>
            <FormControl>
              <form id="newVoice" onSubmit={createNewVoice}>
                <Flex direction={{ base: "column", md: "row" }}>
                  <Text>Name</Text>
                  <Input
                    type="text"
                    value={newVoiceName}
                    onChange={(e) => setNewVoiceName(e.target.value)}
                  />

                  <Text>Labels</Text>
                  <Input
                    type="text"
                    value={newVoiceLabels}
                    onChange={(e) => setNewVoiceLabels(e.target.value)}
                  />
                  <Text>Description</Text>
                  <Textarea
                    value={newVoiceDescription}
                    onChange={(e) => setNewVoiceDescription(e.target.value)}
                  />
                </Flex>
                <Card>
                  <Text>Voice Sample</Text>
                  <RadioGroup
                    defaultValue="upload"
                    onChange={setVoiceInputOption}
                  >
                    <Stack direction="row" alignItems="center">
                      <Radio value="upload">Upload a file</Radio>
                      <Radio value="record">Record a voice sample</Radio>
                    </Stack>
                  </RadioGroup>
                  {voiceInputOption === "upload" ? (
                    <Container m={5}>
                      <Input
                        type="file"
                        accept="audio/mpeg"
                        onChange={(e) => setNewVoiceFile(e.target.files[0])}
                      />

                      {newVoiceFile && (
                        <AudioPlayer
                          p={5}
                          src={URL.createObjectURL(newVoiceFile)}
                        />
                      )}
                    </Container>
                  ) : (
                    <Container m={5}>
                      <AudioRecorder
                        onRecordingComplete={(blob) => setNewVoiceFile(blob)}
                      />
                      {newVoiceFile && (
                        <AudioPlayer
                          p={5}
                          src={URL.createObjectURL(newVoiceFile)}
                        />
                      )}
                    </Container>
                  )}
                  <Button
                    type="submit"
                    colorScheme="blue"
                    isLoading={isLoading}
                  >
                    Create
                  </Button>
                </Card>
              </form>
            </FormControl>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      </Box>
  );
}
