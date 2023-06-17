import { TwitterTweetEmbed } from "react-twitter-embed";
import { Box, Container, Card, VStack, Input, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

// Instantiate with desired auth type (here's Bearer v2 auth)

const Twitter = () => {
  const [userQuery, setUserQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);

const userSearch = async() => {
    const response = await axios.post("/api/twitter",
    userQuery);
    setQueryResults(response.data);
}


  return (
    <Box layerStyle="subPage">
      <Container p={5}>
        <Input
          placeholder="Search for user..."
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
        />
        <Button onClick={userSearch}>Search</Button>
        <Container>{queryResults}</Container>
        <TwitterTweetEmbed tweetId={"1668044019690262528"} />
      </Container>
    </Box>
  );
};
export default Twitter;
