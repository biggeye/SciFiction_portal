import React, { useState, useEffect } from "react";
import {
  chakra,
  Box,
  Stack,
  Link,
  HStack,
  Text,
  Container,
  Icon,
  Tooltip,
  Divider,
  Flex,
  useColorModeValue,
  Image
} from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import axios from "axios";
import VideoPlayer from "../shared/VideoPlayer";
import { downloadS3Mp4 } from "../../../utils/downloadS3Mp4";

export default function Avatars() {
  const [tableData, setTableData] = useState([]);
  const [playingVideo, setPlayingVideo] = useState(null);

  const playVideo = async (talk_id) => {
    try {
      const response = await axios.post(
        "https://flask-vercel-silk.vercel.app/api/did/get_talk",
        {
          talk_id: talk_id
        }
      );
      console.log(response);
      console.log(response.data);
      const fileName = `"${talk_id}.mp4"`;
      const videoUrl = response.data.video;
      setPlayingVideo(videoUrl);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchYourData().then((preData) => {
      setTableData(preData);
    });
  }, []);

  const fetchYourData = async () => {
    const response = await axios.get(
      "https://flask-vercel-silk.vercel.app/api/did/get_talks"
    );
    const talks = response.data.talks; // Access the nested talks array

    const preData = talks.map((talk) => ({
      name: talk.name,
      thumbnail: JSON.parse(talk.user_data).thumbnail_url,
      video: talk.result_url,
      audio: talk.audio_url,
      id: talk.id,
    }));

    return preData;
  };

  return (
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={50}
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
    >
      <Container maxW="5xl" p={{ base: 5, md: 6 }}>
        {tableData.map((talk, index) => (
          <Stack
            key={index}
            w="17rem"
            spacing={2}
            p={4}
            border="1px solid"
            borderColor={useColorModeValue("brand.400", "brand.600")}
            rounded="md"
            margin="0 auto"
            _hover={{
              boxShadow: useColorModeValue(
                "0 4px 6px rgba(160, 174, 192, 0.6)",
                "0 4px 6px rgba(9, 17, 28, 0.4)"
              ),
            }}
          >
            {/* Replace the existing content with the corresponding properties from tableData */}
            <HStack justifyContent="space-between" alignItems="baseline">
    <Tooltip
      label={talk.name}
      aria-label={talk.name}
      placement="right-end"
      size="sm"
    >
      <Box pos="relative">
        {playingVideo ? (
          <VideoPlayer s3Url={playingVideo} />
        ) : (
          <Image
            src={talk.thumbnail}
            size="xl"
            borderRadius="md"
            onClick={() => playVideo(talk.id)}
          />
        )}
      </Box>
    </Tooltip>
    <Link isExternal href={talk.video}>
      <Icon as={AiFillGithub} w={6} h={6} />
    </Link>
  </HStack>
  <chakra.h1 fontSize="xl" fontWeight="bold">
    {talk.name}
  </chakra.h1>

            <Divider />
            {/* Replace the existing content with the appropriate data */}
            <Text fontSize="md" color="brand.500">
              Sports lover ⚽️, exercise addict 🏋 and lifelong learner 👨🏻‍💻
            </Text>
          </Stack>
        ))}
      </Container>
    </Flex>
  );
}
