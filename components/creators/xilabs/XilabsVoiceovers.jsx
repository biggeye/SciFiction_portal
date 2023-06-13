import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
  Spacer,
  HStack,
  Divider
} from "@chakra-ui/react";
import {
  RiDeleteBin2Line,
  RiDownloadCloud2Line,
  RiPlayCircleLine,
} from "react-icons/ri";
import axios from "axios";
import sliceWords from "../../../utils/sliceWords";
import convertDate from "../../../utils/convertDate";
import { downloadFile } from "../../../utils/downloadFile";

export default function XilabsVoiceovers() {
  const [data, setData] = useState([]);
  const [charactersUsed, setCharactersUsed] = useState("");

  useEffect(() => {
    fetchYourData().then((fetchedData) => {
      setData(fetchedData);
    });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const mostRecentEntry = data.reduce((prev, curr) => {
        return curr.date_unix > prev.date_unix ? curr : prev;
      });
      const characterCountChangeTo = mostRecentEntry.character_count_change_to;
      setCharactersUsed(characterCountChangeTo);
      console.log(charactersUsed);
    }
  }, [data]);

  const fetchYourData = async () => {
    const response = await axios.get(
      "https://flask-vercel-silk.vercel.app/api/xilabs/get_history"
    );
    const voiceovers = response.data;

    const tableData = voiceovers.map((vo) => ({
      voice: vo.voice_name,
      date: convertDate(vo.date_unix),
      script: sliceWords(vo.text),
      voiceover_id: vo.history_item_id,
    }));

    return tableData;
  };
  const playRow = async (voiceover_id) => {
    const xiApiKey = process.env.XI_API_KEY;

    const playAudio = await axios.get(
      `"https://api.elevenlabs.io/v1/history${voiceover_id}/audio"`,
      {
        headers: {
          "xi-api-key": xiApiKey,
        },
      }
    );
    return playAudio;
  };
  const downloadRow = async (voiceoverId) => {
    const voData = { voiceoverId: voiceoverId };
    const response = await axios.post(
      "https://flask-vercel-silk.vercel.app/api/xilabs/download_voiceover",
      voData
    );
    console.log(response);
    const filename = "voiceover.mp3"; // Set the desired filename for the downloaded audio file

    downloadFile(response.data, filename, "audio/mpeg");
  };
  const deleteRow = async (voiceoverId) => {
    const confirmation = window.confirm("Are you sure you want to delete?");

    if (confirmation) {
      setIsLoading(true);

    const voData = { voiceoverId: voiceoverId };
    const response = await axios.post(
      "https://flask-vercel-silk.vercel.app/api/xilabs/delete_voiceover",
      voData
    );
    if (response.status === 200) {
      window.alert("Voiceover Deleted.");
      fetchYourData().then((fetchedData) => {
        setData(fetchedData);
      });
    } else {
      window.alert("Something went wrong.");
    }
    setIsLoading(false);
    fetchYourData();
  };
};

  return (
    <Box width="fill" height="fill">
    <Box position="absolute" mt={2} ml={2}>
        <Button
          size="xs"
          colorScheme="blue"
          onClick={() => {
            onNewAvatarOpen();
          }}
        >
          New
        </Button>
      </Box>
    <Flex
    w="full"
    bg="gray.700"
    _dark={{ bg: "#3e3e3e" }}
    p={50}
    alignItems="center"
    justifyContent="center"
    flexWrap="wrap" // allow cards to wrap to new lines
>
      {data.map((token, tid) => (
        <Box
        w="300px"
  
        color="gray.700"
          key={tid}
          bg= "gray.300"
          p={1.5}
          _dark={{ bg: "brand.800" }}
          m={4} // some margin for separation
          borderRadius="sm" // rounded corners
          overflow="hidden" // keep child boundaries within card
          boxShadow="sm" // small shadow for 3D effect
          textAlign="center"
        >
          <Flex direction="column">
            <HStack display="flex" justifyContent="space-between"> <Text size="md" as="b">{token.voice}</Text>
            <Text size="xs" as="i">{token.date}</Text>
            </HStack>
          
            <Text size="sm">{token.script}</Text>
            </Flex>

          <Flex justifyContent="flex-end" p={1}>
            <Spacer />
            <IconButton
            tooltip="Download"
              size="xs"
              colorScheme="blue"
              icon={<RiDownloadCloud2Line />}
              aria-label="Up"
              onClick={() => downloadRow(token["voiceover_id"])}
            />
         
            <IconButton
            tooltip="Delete"
              size="xs"
              colorScheme="red"
              icon={<RiDeleteBin2Line />}
              aria-label="Up"
              onClick={() => deleteRow(token["voiceover_id"])}
            />
          </Flex>
        </Box>
      ))}
    </Flex>
    </Box>
  );
}
