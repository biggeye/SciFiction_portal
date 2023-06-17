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
  Select,
  Spacer,
  Text,
  useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useClipboard
  } from "@chakra-ui/react";
import { downloadUrl } from "../../utils/downloadUrl";
import { upload_video } from "../../utils/production/upload";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import axios from "axios";

export default function CreateTalk() {
  const [newUrl, setNewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const btnRef = React.useRef();
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [avatar, setAvatar] = useState("");
  const [voiceOver, setVoiceOver] = useState("");
  const [newTalk, setNewTalk] = useState(null);
  const [avatars, setAvatars] = useState(null);
  const [voiceovers, setVoiceovers] = useState(null);
  const [talkData, setTalkData] = useState([]);

  //createNewVoiceover    **** this is the drawer component which is currently using useDisclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

// Alert Modal 
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { hasCopied, onCopy } = useClipboard(newUrl);
  const onAlertClose = () => setIsAlertOpen(false);
  const cancelRef = React.useRef();

  const sizes = ["xs", "sm", "md", "lg", "xl"];

  const supabaseClient = useSupabaseClient();
  const user = useUser();


  useEffect(() => {
    const fetchData = async () => {
      const avatarsData = await fetchAvatars(supabaseClient);
      const voiceoversData = await fetchVoiceovers(supabaseClient);
    };
    fetchData();
  }, []);
  const fetchVoiceovers = async (supabaseClient) => {
    try {
      const { data, error } = await supabaseClient
        .from("voiceover_")
        .select("*");
      if (error) throw error;
      setVoiceovers(data);
      return data;
    } catch (error) {
      console.error("Error fetching voiceovers:", error.message);
    }
  };
  const fetchAvatars = async (supabaseClient) => {
    try {
      const { data, error } = await supabaseClient.from("avatar_").select("*");
      if (error) throw error;
      setAvatars(data);
      return data;
    } catch (error) {
      console.error("Error fetching avatars:", error.message);
    }
  };

  const fetchTalkData = async (talkId) => {
    const getOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik53ek53TmV1R3ptcFZTQjNVZ0J4ZyJ9.eyJodHRwczovL2QtaWQuY29tL2ZlYXR1cmVzIjoidGFsa3MiLCJodHRwczovL2QtaWQuY29tL2N4X2xvZ2ljX2lkIjoiIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmQtaWQuY29tLyIsInN1YiI6ImF1dGgwfDY0MjhiNjgyMWU2MDA2YjY1N2VhZTNmOSIsImF1ZCI6WyJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4Njk4NDM3NywiZXhwIjoxNjg3MDcwNzc3LCJhenAiOiJHenJOSTFPcmU5Rk0zRWVEUmYzbTN6M1RTdzBKbFJZcSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgcmVhZDpjdXJyZW50X3VzZXIgdXBkYXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSBvZmZsaW5lX2FjY2VzcyJ9.i0tBuiYtqjWIjYUieaAwsqVjpiVUJeil-FX3A8eoJ1h3V_t9qLuYfO0Yqe5LTpHfsuJaigEM3BfWw4shifEY5hGzDLLKWabiit2HyjbCrvzIN_XarAcEjxBSby6ZGEy8kz43UXN7kEp3QUHBhbZPlxbek44fYXIdZFcVuxp1shdoi6RqewmcjCNeA1oS2A7z3coK_rzSysndtK2iI0jSm0eyQkx7uibD91sypB7AHRNcG8WU0l8BL17fcKWwl9q5v4dCvqcGSCuYoOggw2X7ncAsEApeDNPFE1EsqKX5R5edK_rYEmS-JWkb7yF4L8QVQg5By6U5pnrntqpdRHrj7w",
      },
    };
    let talkData;
    do {
      const talkResponse = await fetch(
        `https://api.d-id.com/talks/${talkId}`,
        getOptions
      );
      talkData = await talkResponse.json();
      if (talkData.status !== "done") {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } while (talkData.status !== "done");
    return talkData;
  };

  const createTalk = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik53ek53TmV1R3ptcFZTQjNVZ0J4ZyJ9.eyJodHRwczovL2QtaWQuY29tL2ZlYXR1cmVzIjoidGFsa3MiLCJodHRwczovL2QtaWQuY29tL2N4X2xvZ2ljX2lkIjoiIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmQtaWQuY29tLyIsInN1YiI6ImF1dGgwfDY0MjhiNjgyMWU2MDA2YjY1N2VhZTNmOSIsImF1ZCI6WyJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4Njk4NDM3NywiZXhwIjoxNjg3MDcwNzc3LCJhenAiOiJHenJOSTFPcmU5Rk0zRWVEUmYzbTN6M1RTdzBKbFJZcSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgcmVhZDpjdXJyZW50X3VzZXIgdXBkYXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSBvZmZsaW5lX2FjY2VzcyJ9.i0tBuiYtqjWIjYUieaAwsqVjpiVUJeil-FX3A8eoJ1h3V_t9qLuYfO0Yqe5LTpHfsuJaigEM3BfWw4shifEY5hGzDLLKWabiit2HyjbCrvzIN_XarAcEjxBSby6ZGEy8kz43UXN7kEp3QUHBhbZPlxbek44fYXIdZFcVuxp1shdoi6RqewmcjCNeA1oS2A7z3coK_rzSysndtK2iI0jSm0eyQkx7uibD91sypB7AHRNcG8WU0l8BL17fcKWwl9q5v4dCvqcGSCuYoOggw2X7ncAsEApeDNPFE1EsqKX5R5edK_rYEmS-JWkb7yF4L8QVQg5By6U5pnrntqpdRHrj7w",
      },
      data: {
        script: {
          type: "audio",
          subtitles: "false",
          provider: { type: "microsoft", voice_id: "en-US-JennyNeural" },
          ssml: "false",
          reduce_noise: "false",
          audio_url: voiceOver,
        },
        config: { fluent: "false", pad_audio: "0.0" },
        source_url: avatar,
        name: title,
      },
    };

    const response = await axios.request("https://api.d-id.com/talks", options);
    const data = await response.data;
    if (data) {
      try {
        const talkData = await fetchTalkData(data.id);
        setTalkData(talkData);
        const newUrl = talkData.result_url;
        console.log(newUrl);

        setNewUrl(newUrl);  // Set the URL
        setIsOpen(true);  
        setAlertOpen(true); // Set the alertOpen to true

      } catch (err) {
        console.error(err);
      }

      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Box position="absolute" mt={2} ml={2}>
        <Button
          size="xs"
          colorScheme="blue"
          onClick={() => {
            onOpen();
          }}
        >
          New
        </Button>
      </Box>
      <Flex
        p={50}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap" // allow cards to wrap to new lines
      ></Flex>

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
          <DrawerHeader>Create New Talk</DrawerHeader>

          <DrawerBody>
            <Flex direction="column">
              <FormControl>
                <form id="newTalk" onSubmit={createTalk}>
                  <Input
                    rows="auto"
                    placeholder="Name of video..."
                    name="script"
                    onChange={(val) => setTitle(val.target.value)}
                  />

                  <FormLabel>
                    Select Avatar
                    <Select onChange={(val) => setAvatar(val.target.value)}>
                      {avatars &&
                        avatars.map((avatar) => {
                          return (
                            <option
                              key={avatar.uuid}
                              value={avatar.url}
                              label={avatar.name}
                            />
                          );
                        })}
                    </Select>
                  </FormLabel>
                  <FormLabel>
                    Select Voiceover
                    <Select onChange={(val) => setVoiceOver(val.target.value)}>
                      {voiceovers &&
                        voiceovers.map((voiceover) => {
                          return (
                            <option
                              key={voiceover.uuid}
                              value={voiceover.url}
                              label={voiceover.name}
                            />
                          );
                        })}
                    </Select>
                  </FormLabel>
                </form>
              </FormControl>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Flex>
              <Button
                type="submit"
                form="newTalk"
                colorScheme="blue"
                isLoading={isLoading}
              >
                Create Video
              </Button>
              <Spacer />
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <AlertDialog
      isOpen={isAlertOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Copy URL
          </AlertDialogHeader>

          <AlertDialogBody>
            <Input value={newUrl} isReadOnly placeholder="Your URL" />
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onAlertClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onCopy} ml={3}>
              {hasCopied ? "Copied" : "Copy"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
    </Box>
  );
}
