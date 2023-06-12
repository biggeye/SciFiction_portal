import React, { useEffect, useState } from "react";
import XilabsVoiceovers from "../creators/xilabs/XilabsVoiceovers";
import { Box } from "@chakra-ui/react";

export default function Voiceovers({ supabaseClient }) {
  const [voiceovers, setVoiceovers] = useState([]);

  useEffect(() => {
    fetchVoiceovers();
  }, []);

  const fetchVoiceovers = async () => {
    try {
      const { data, error } = await supabaseClient.from("voiceover_").select("*");
      if (error) throw error;
      setVoiceovers(data);
    } catch (error) {
      console.error("Error fetching voiceovers:", error.message);
    }
  };

  return (
    <Box width="fill" height="fill">
{/*
      {voiceovers.map((voiceover) => (
         <Box
         key={avatar.uuid}
         bg="white"
         _dark={{ bg: "gray.900" }}
         m={4}
         borderRadius="md" // rounded corners
         overflow="hidden" // keep child boundaries within card
         boxShadow="sm" // small shadow for 3D effect
         textAlign="center"
         >
           <Box p={4}>
           <AudioPlayer src={voiceover.url} />
           <Text size="md" as="b">{voiceover.name}</Text>
           <Text size="sm">{voiceover.date}</Text>
           <Text size="md">{voiceover.script}</Text>
           </Box>

         </Box>
       ))}
      */}

       <XilabsVoiceovers />
      </Box>
  );
}
