import React, { useEffect, useState } from "react";
import ElaiAvatars from "../creators/elai/ElaiAvatars";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  Divider
} from "@chakra-ui/react";
export default function Avatars({ supabaseClient }) {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    fetchAvatars();
  }, []);

  const fetchAvatars = async () => {
    try {
      const { data, error } = await supabaseClient.from("avatar_").select("*");
      if (error) throw error;
      setAvatars(data);
    } catch (error) {
      console.error("Error fetching avatars:", error.message);
    }
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
      

        {avatars.map((avatar) => (
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
            <Image src={avatar.url} alt="Avatar Image" />
            <Text size="md" as="b">{avatar.name}</Text>
            <Text size="md" as="b">{avatar.title}</Text>
            </Box>

          </Box>
        ))}
<Divider />
      <ElaiAvatars />
      </Flex>
      </Box>
  );
}
