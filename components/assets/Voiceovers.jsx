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
     w="200px"
    bgImage="radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(215,215,215,1) 17%, rgba(181,181,181,0.7343312324929971) 67%, rgba(144,190,226,0.42620798319327735) 100%)"

    _dark={{ bg: "gray.900" }}
    m={4}
    borderWidth="1px"
    borderColor="gray.200"
    borderRadius="md" // rounded corners
    overflow="hidden" // keep child boundaries within card
    boxShadow="xl" // small shadow for 3D effect
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
