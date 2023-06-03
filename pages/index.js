import Layout from "../components/Layout";
import {
  Center,
  Container,
  Grid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
} from "react-icons/io5";
import { ReactElement } from "react";
import { AtSignIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function Home() {
  return (
    <Layout>
      <Container 
      bgGradient="linear(to-b, white 0%, gray.200 40%, white 60%, white 100%)"
      maxH="100vh"
      maxW="100vw"
      py={12}>
        <Center>
        <Grid   templateAreas={
                `"header header"
                  "main image"`}
  gridTemplateColumns={'70% 30%'}
        spacing={10} 
        w="80vw"
        padding="1rem">
          <Stack spacing={4}>
            <Text
              textTransform={"uppercase"}
              color={"blue.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("blue.50", "blue.900")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              Giveaway Contest
            </Text>
            <Heading>$25 STEAM Gift Card Giveaway!</Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              🚀🎮 SciFiction Giveaway Alert! 🎉
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.100", "gray.700")}
                />
              }
            >
              <Text>
                <h3><b>Requirements:</b></h3>
                          <ol>
                  <li>Follow **@scifiction** on Twitter</li>
                  <li>
                    Re-Tweet the message contest, make sure to tag
                    **@scifiction** and at least **5** of your friends!
                  </li>
                </ol>
                </Text>
                <Text>
                <aside>
                  💡 You now have a chance to WIN a $25 Steam gift card! 🎁
                </aside>
                   <h2>
                  🌌 Explore limitless gaming possibilities fueled by your
                  passion for science fiction. Don't miss out on this incredible
                  opportunity!
                </h2>
                </Text>
                <Text>
                <code>📆 Contest ends on Friday, June 9th.</code>
                <code>#SciFictionGiveaway #Gaming #Steam</code>
              </Text>
            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={
                "/contest_vertical.png"
              }
              objectFit={"cover"}
              maxH="50vh"
              display={{ base: "none", lg: "block" }}
            />
          </Flex>
        </Grid>
        </Center>

      </Container>
    </Layout>
  );
}
