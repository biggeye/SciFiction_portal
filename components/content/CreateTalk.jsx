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

} from "@chakra-ui/react";
import { downloadUrl } from "../../utils/downloadUrl";
import { upload_video } from "../../utils/production/upload";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function CreateTalk() {
  const [isLoading, setIsLoading] = useState(false);
  const btnRef = React.useRef();
  const sizes = ["xs", "sm", "md", "lg", "xl"];
  const [data, setData] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  //createNewVoiceover
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [avatar, setAvatar] = useState("");
  const [voiceOver, setVoiceOver] = useState("");
  const [newTalk, setNewTalk] = useState(null);
  const [newUrl, setNewUrl] = useState();
  const [avatars, setAvatars] = useState(null);
  const [voiceovers, setVoiceovers] = useState(null);
  const [duration, setDuration] = useState("");

  const supabaseClient = useSupabaseClient();

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
      return (data);
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

  const createTalk = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: process.env.NEXT_PUBLIC_DID_BEARER_TOKEN,
      },
      body: JSON.stringify({
        script: {
          type: "audio",
          subtitles: "false",
          reduce_noise: "false",
          audio_url: voiceOver,
        },
        config: { fluent: "false", pad_audio: "0.0" },
        name: title,
        persist: true,
        source_url: avatar,
      }),
    };

    try {
      const response = await fetch("https://api.d-id.com/talks", options);
      const data = await response.json();

      const getOptions = {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: process.env.NEXT_PUBLIC_DID_BEARER_TOKEN,
        },
      };
      let talkData;
      do {
        const talkResponse = await fetch(
          `https://api.d-id.com/talks/${data.id}`,
          getOptions
        );
        talkData = await talkResponse.json();
        if (talkData.status !== "done") {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retry
        }
      } while (talkData.status !== "done");

      setNewTalk(data);
      setNewUrl(talkData.result_url);
      setDuration(talkData.duration);
    } catch (err) {
      console.error(err);
    }
    await downloadUrl(newUrl);
    await upload_video(newUrl, title, duration);
    setIsLoading(false);
  };

  return (
    <Box layerStyle="subPage">
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
                  placeholder="Type or paste the script here"
                  name="script"
                  onChange={(val) => setTitle(val.target.value)}
                />

                <FormLabel>Select Avatar
                                  <Select onChange={(val) => setAvatar(val.target.value)}>
                  {avatars && avatars.map((avatar, index) => {

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
                <FormLabel>Select Voiceover
                    <Select onChange={(val) => setVoiceover(val.target.value)}>
                  {voiceovers && voiceovers.map((voiceover) => {
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
                form="TTS"
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
    </Box>
  );
}
