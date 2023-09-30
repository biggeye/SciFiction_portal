import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  chakra,
  Flex,
  Divider,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  useColorModeValue
} from '@chakra-ui/react';

import axios from 'axios';


export default function Connections() {
  const [youTubeFollowers, setYouTubeFollowers] = useState("");
  const [youTubePosts, setYouTubePosts] = useState("");
  const youTubechannelId = "UCSMqjzwL0hZ0GEIpvLTOwYw";
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  
  const metrics = [
    {
      name: 'Twitter',
      followers: '',
      posts: ''
    },
    {
      name: 'YouTube',
      followers: youTubeFollowers,
      posts: youTubePosts,
    },
    {
      name: 'Facebook',
      followers: '',
      posts: '',
    },
    ];

  useEffect(() => {
    const channelId = "UCSMqjzwL0hZ0GEIpvLTOwYw";
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    async function queryYoutubeStats(channelId, apiKey) {
      // API endpoint for retrieving channel statistics
      const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;

      try {
        // Send GET request to the YouTube API
        const response = await axios.get(url);

        if (response.status !== 200) {
          throw new Error(`Error: Received response code ${response.status}`);
        }

        // Parse the response JSON
        const data = response.data;

        // Extract desired statistics from the response
        const statistics = data.items[0].statistics;
        const subscriberCount = parseInt(statistics.subscriberCount, 10);
        const videoCount = parseInt(statistics.videoCount, 10);

        return { subscriberCount, videoCount };

      } catch (error) {
        console.error(`An error occurred: ${error}`);
        return { subscriberCount: null, videoCount: null };
      }
    }

    queryYoutubeStats(channelId, apiKey)
      .then(({ subscriberCount, videoCount }) => {
        console.log(`Subscriber count: ${subscriberCount}`);
        setYouTubeFollowers(subscriberCount);

        console.log(`Video count: ${videoCount}`);
        setYouTubePosts(videoCount); 
      })
      .catch(error => console.error(error));

  }, []);

return(
  <Box layerStyle="subPage">
    <Flex justify="left" p={5}>
      <chakra.h3 fontSize="md" fontWeight="bold" textAlign="center">
        Social Media Traffic
      </chakra.h3>
    </Flex>
    <Divider />
    <TableContainer>
      <Table size="md">
        <Thead>
          <Tr fontWeight="900">
            <Th>Network</Th>
            <Th>Followers</Th>
            <Th>Posts</Th>
          </Tr>
        </Thead>
        <Tbody>
          {metrics.map((item, index) => (
            <Tr key={index}>
              <Td fontSize="sm">{item.name}</Td>
              <Td fontSize="sm">{item.followers}</Td>
              <Td fontSize="sm">{item.posts}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  </Box>
)

}