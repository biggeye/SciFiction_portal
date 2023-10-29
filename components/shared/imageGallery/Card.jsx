import React from "react";
import { Spacer, Tag, Button, Box, Flex, Image, Text, Link, chakra } from "@chakra-ui/react";

export default function Card({ imageUrl, created_at, prompt, id, handleDelete, isLoading, handleModalOpen }){
  return (

      <Box
        w="xs"
        bg="white"
        _dark={{ bg: "gray.800" }}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        mx="auto"
      >
        <Image
          w="full"
          h={56}
          fit="cover"
          src={imageUrl}
          alt="Missing Image"

        />

        <Box py={5} textAlign="center">
          <Text
            display="block"
            fontSize="2xl"
         >
            {prompt}
          </Text>
          <chakra.span
            fontSize="sm"
            color="gray.700"
            _dark={{ color: "gray.200" }}
          >
            {created_at}
          </chakra.span>
          <Flex justifyContent="space-between" pl={2} pr={2}>
          <Button size="xs" onClick={() => handleModalOpen(imageUrl)}>open</Button>
  
          <Spacer />
          <Button
              isLoading={isLoading}
              size="xs"
              onClick={() => handleDelete(imageUrl)}
            >
              delete
            </Button>
            </Flex>
        </Box>
      </Box>

  );
};
