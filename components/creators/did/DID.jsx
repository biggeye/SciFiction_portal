import React, { useState, useEffect } from "react";
import {
  Center,
  Box,
  Card,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Image,
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
  useClipboard,
} from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import axios from "axios";
import AudioPlayer from "../../shared/AudioPlayer";

export default function DID() {
  const [isLoading, setIsLoading] = useState(false);
  const btnRef = React.useRef();
  //Mappings & Values
  const [avatars, setAvatars] = useState(null);
  const [voiceovers, setVoiceovers] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [voiceover, setVoiceover] = useState("");
  //Information & Labels
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [avatarName, setAvatarName] = useState("");
  const [voiceoverName, setVoiceoverName] = useState("");
  //API State
  const [talkData, setTalkData] = useState([]);
  const [newUrl, setNewUrl] = useState(null);
  // Alert Modal
  const alertDisclosure = useDisclosure(); // Second useDisclosure hook
  const { hasCopied, onCopy } = useClipboard(newUrl);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      const avatarsData = await fetchAvatars();
      const voiceoversData = await fetchVoiceovers();
      
      setAvatars(avatarsData);
      setAvatar(avatarsData[0]?.url);
      setAvatarName(avatarsData[0]?.name);
  
      setVoiceovers(voiceoversData);
      setVoiceover(voiceoversData[0]?.url);
      setVoiceoverName(voiceoversData[0]?.name);
    };
    fetchData();
  }, []);

  const fetchAvatars = async () => {
    try {
      const { data: avatarData, error } = await supabaseClient
        .from("avatar_")
        .select("*");
      if (error) throw error;
      return avatarData;
    } catch (error) {
      console.error("Error fetching avatars:", error.message);
    }
    return [];
  };

  const fetchVoiceovers = async () => {
    try {
      const { data: voiceoverData, error } = await supabaseClient
        .from("voiceover_")
        .select("*");
      if (error) throw error;
      return voiceoverData;
    } catch (error) {
      console.error("Error fetching voiceovers:", error.message);
    }
    return [];
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
    let apiData;
    do {
      const talkResponse = await fetch(`https://api.d-id.com/talks/${talkId}`, getOptions);
      if (!talkResponse.ok) {
          throw new Error('Network response was not ok');
      }
      apiData = await talkResponse.json();
      
      if (apiData.status !== "done") {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } while (apiData.status !== "done");
    setTalkData(apiData);
    return apiData;
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
          ssml: "false",
          reduce_noise: "false",
          audio_url: voiceover,
        },
        config: { fluent: "false", pad_audio: "0.0" },
        source_url: avatar,
        name: title,
      },
    };
    const { data: response } = await axios.request("https://api.d-id.com/talks", options);
    const data = response.data;
    
    if (data) {
      try {
        const talkData = await fetchTalkData(data.id);
        if (talkData.result_url) {
          const newUrl = talkData.result_url;
          console.log(newUrl);

          setNewUrl(newUrl); // Set the URL
          setIsOpen(true);
          setAlertOpen(true);
        } // Set the alertOpen to true
      } catch (err) {
        console.error(err);
      }

      setIsLoading(false);
    }
  };

  return (
    <Box p={10} layerStyle="subPage">
      <Card
        ml={5}
        mr={5}
        p={7}
        bgImage="linear-gradient(16deg, rgba(4,26,46,1) 0%, rgba(53,66,84,1) 18%, rgba(153,159,168,1) 69%, rgba(236,236,236,1) 100%)"
        borderWidth={1}
        borderColor="brand.600"
        dropShadow="lg"
        minW={425}
      >
        <FormControl>
          <form id="newTalk" onSubmit={createTalk}>
            <Flex direction="column" alignItems="center">
              <Input
                w={300}
                rows="auto"
                placeholder="Name of video..."
                name="script"
                value={name}
                onChange={(val) => setName(val.target.value)}
              />

              <Input
                w={300}
                rows="auto"
                placeholder="Title of video..."
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <FormLabel mt={7}>Select Avatar </FormLabel>
              <Select
                w={400}
                onChange={(e) => {
                  setAvatar(
                    avatars.find((avatar) => avatar.url === e.target.value).url
                  );
                  setAvatarName(
                    avatars.find((avatar) => avatar.url === e.target.value)
                      .name
                  );
                }}
              >
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

              <FormLabel mt={7}>Select Voiceover </FormLabel>
              <Select
                w={400}
                onChange={(e) => {
                  setVoiceover(
                    voiceovers.find(
                      (voiceover) => voiceover.url === e.target.value
                    ).url
                  );
                  setVoiceoverName(
                    voiceovers.find(
                      (voiceover) => voiceover.url === e.target.value
                    ).name
                  );
                }}
              >
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

              <Card w={380} mt={7}>
                <Flex
                  direction="column"
                  wrap="flexWrap"
                  alignItems="center"
                  justifyContent="center"
                  p={5}
                >
                  <strong>{name}</strong>
                  <italic>{title}</italic>
                  <Image w="100px" src={avatar} alt="Avatar" />

                  <AudioPlayer src={voiceover} />
                </Flex>

                <Button
                  type="submit"
                  form="newTalk"
                  colorScheme="gray"
                  isLoading={isLoading}
                >
                  Create Video
                </Button>
              </Card>
            </Flex>
          </form>
        </FormControl>
      </Card>
      <AlertDialog
        isOpen={alertDisclosure.isOpen} // Use alertDisclosure here
        leastDestructiveRef={cancelRef}
        onClose={alertDisclosure.onClose}
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
