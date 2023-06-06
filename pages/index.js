import Layout from "../components/Layout";
import { chakra, Box, Icon, Image, useColorModeValue } from "@chakra-ui/react";

export default function Home() {
  const bg = useColorModeValue("white", "brand.800");

  const followTwitter = () => {
    window.open("https://twitter.com/scifiction");
  };

  const handleTweetButtonClick = () => {
    // Replace the tweetId with the desired ID
    const tweetId = "1664838272894353408";
    window.open(`https://twitter.com/intent/retweet?tweet_id=${tweetId}`);
  };
  return (
    <Layout>
      <Box pos="relative" overflow="hidden" bg={bg}>
        <Box maxW="7xl" mx="auto">
          <Box
            pos="relative"
            pb={{ base: 8, sm: 16, md: 20, lg: 28, xl: 32 }}
            maxW={{ lg: "2xl" }}
            w={{ lg: "full" }}
            zIndex={1}
            bg={bg}
            border="solid 1px transparent"
          >
            <Icon
              display={{ base: "none", lg: "block" }}
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              h="full"
              w={48}
              color={bg}
              transform="translateX(50%)"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </Icon>
            <Box
              mx="auto"
              maxW={{ base: "7xl" }}
              px={{ base: 4, sm: 6, lg: 8 }}
              mt={{ base: 10, sm: 12, md: 16, lg: 20, xl: 28 }}
            >
              <Box
                w="full"
                textAlign={{ sm: "center", lg: "left" }}
                justifyContent="center"
                alignItems="center"
              >
                <chakra.h1
                  fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
                  letterSpacing="tight"
                  lineHeight="short"
                  fontWeight="bold"
                  color="brand.900"
                  _dark={{ color: "white" }}
                >
                  <chakra.span display={{ base: "block", xl: "inline" }}>
                    STEAM Gift Card {" "}
                  </chakra.span>
                  <chakra.span
                    display={{ base: "block", xl: "inline" }}
                    color="brand.600"
                    _dark={{ color: "brand.400" }}
                  >
                    give-away alert!
                                      </chakra.span>
                </chakra.h1>
                <chakra.p
                  mt={{ base: 3, sm: 5, md: 5 }}
                  fontSize={{ sm: "lg", md: "xl" }}
                  maxW={{ sm: "xl" }}
                  mx={{ sm: "auto", lg: 0 }}
                  color="brand.500"
                >
                  Friday June 9th, the winner of a $25 STEAM Gift Card will be
                  announced!
                  <br />
                  To enter the contest, simply:
                </chakra.p>
                <Box
                  mt={{ base: 5, sm: 8 }}
                  display={{ sm: "flex" }}
                  justifyContent={{ sm: "center", lg: "start" }}
                  fontWeight="extrabold"
                  fontFamily="fantasy"
                >
                  <Box rounded="full" shadow="md">
                    <chakra.a
                      w="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      border="solid 1px transparent"
                      fontSize={{ base: "md", md: "lg" }}
                      rounded="md"
                      color="white"
                      bg="brand.600"
                      _hover={{ bg: "brand.700" }}
                      px={{ base: 8, md: 10 }}
                      py={{ base: 3, md: 4 }}
                      cursor="pointer"
                      onClick={followTwitter}
                    >
                      Follow @SciFiction!
                    </chakra.a>
                  </Box>
                  <Box mt={[3, 0]} ml={[null, 3]}>
                    <chakra.a
                      w="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      px={{ base: 8, md: 10 }}
                      py={{ base: 3, md: 4 }}
                      border="solid 1px transparent"
                      fontSize={{ base: "md", md: "lg" }}
                      rounded="md"
                      color="brand.700"
                      bg="brand.100"
                      _hover={{ bg: "brand.200" }}
                      cursor="pointer"
                      onClick={handleTweetButtonClick}
                    >
                      Re-Tweet!
                    </chakra.a>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        position={{ lg: "absolute" }}
        top={{ lg: 0 }}
        bottom={{ lg: 0 }}
        right={{ lg: 0 }}
        w={{ lg: "50%" }}
        border="solid 1px transparent"
      >
        <Image
          h={["full"]}
          w="full"
          fit="cover"
          src="https://promo.scifiction.com/contest_vertical.png"
          alt=""
          loading="lazy"
        />
      </Box>
    </Layout>
  );
}
