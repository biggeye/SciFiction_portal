import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Box, Container, Card, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const Twitter = () => {



    const [data, setData] = useState({ followers: 0, tweets: 0 });

useEffect(() => {
  const fetchData = async () => {
    const res = await fetch('/api/twitter/twitter');
    const newData = await res.json();
    setData(newData);
  };

  fetchData();
}, []);

return(
    <Box width="full" height="full">
    <Container bg="gray.400" p={5}>
  <Card>
    <h1>Twitter Stats Dashboard</h1>
    <Card><VStack>Number of followers: {data.followers}</VStack></Card>
    <Card><VStack>Number of tweets: {data.tweets}</VStack></Card>
  </Card>

    <TwitterTweetEmbed tweetId={"1668044019690262528"} />
    </Container>
    </Box> 
);
};
export default Twitter;


