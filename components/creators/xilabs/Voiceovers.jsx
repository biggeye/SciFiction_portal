import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  RiCloseCircleLine,
  RiDownloadCloud2Line,
  RiPlayCircleLine,
} from "react-icons/ri";
import axios from "axios";
import sliceWords from "../../../utils/sliceWords";
import convertDate from "../../../utils/convertDate";
import { downloadFile } from "../../../utils/downloadFile";

export default function Voiceovers() {
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

      // Extract the "character_count_change_to" from the most recent entry
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
    const voData = { voiceoverId: voiceoverId };
    const response = await axios.post(
      "https://flask-vercel-silk.vercel.app/api/xilabs/delete_voiceover",
      voData
    );
    console.log(response);
    if (response.status === 200) {
      window.alert("Voiceover Deleted.");
      fetchYourData().then((fetchedData) => {
        setData(fetchedData);
      });
    } else {
      window.alert("Something went wrong.");
    }
  };

  return (
    <Flex
      w="full"
      bg="gray.700"
      _dark={{ bg: "#3e3e3e" }}
      p={50}
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
    >
      {" "}
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
              if (x === "voiceover_id" || x === "script") return null;

              return (
                <Text size="xs" key={`${tid}${x}`}>
                  <b>{x}: </b>
                  {token[x]}
                </Text>
              );
            })}
          </Box>

          <Flex justifyContent="flex-end" p={1}>
            <IconButton
              size="xs"
              colorScheme="green"
              icon={<RiPlayCircleLine />}
            />
            <IconButton
              size="xs"
              colorScheme="blue"
              icon={<RiDownloadCloud2Line />}
              aria-label="Up"
              onClick={() => downloadRow(token["voiceover_id"])}
            />
            <IconButton
              size="xs"
              colorScheme="red"
              icon={<RiCloseCircleLine />}
              aria-label="Up"
              onClick={() => deleteRow(token["voiceover_id"])}
            />
          </Flex>
        </Box>
      ))}
    </Flex>
  );
}
