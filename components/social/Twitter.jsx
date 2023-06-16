import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Box, Container, Card, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const Twitter = () => {


return(
    <Box width="full" height="full">
    <Container bg="brand.400" p={5}>


    <TwitterTweetEmbed tweetId={"1668044019690262528"} />
    </Container>
    </Box> 
);
};
export default Twitter;


