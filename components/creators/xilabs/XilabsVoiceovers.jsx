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
  Divider,
  Card
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
import { upload_voiceover } from "../../../utils/production/upload";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function XilabsVoiceovers() {
  const userId = useUser();
  const supabaseClient = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [charactersUsed, setCharactersUsed] = useState("");
  const [voiceOverData, setVoiceOverData] = useState([]);

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
    setVoiceOverData(tableData);
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
    upload_voiceover(response.data, voiceOverData.voice, voiceOverData.script, userId, supabaseClient);
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

       <Flex
   p={50}
   alignItems="center"
   justifyContent="center"
   flexWrap="wrap" // allow cards to wrap to new lines
>
      {data.map((token, tid) => (
        <Card  
         key={tid}
          layerStyle="miniCard"
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
        </Card>
      ))}
    </Flex>

  );
}
