import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  useBreakpointValue,
  Flex,
  Button,
  FormControl,
  Input,
  InputGroup,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useChat } from "ai/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

import { v4 as uuidv4 } from "uuid";

export default function Chat() {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { messages, handleSubmit, input, handleInputChange } = useChat();
  const isDrawer = useBreakpointValue({ base: true, md: false });

  const bg = useColorModeValue("gray.50", "gray.700");
  const responseBg = useColorModeValue("gray.100", "gray.600");


  return (
    <Flex direction={{ base: 'column', md: 'row' }}>
    {isDrawer ? (
      <IconButton
        icon={<HamburgerIcon />}
        onClick={onOpen}
        variant="outline"
        aria-label="Open Menu"
      />
    ) : (
      <Text>History</Text>
    )}
  
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>History</DrawerHeader>
        <DrawerBody></DrawerBody>
      </DrawerContent>
    </Drawer>
  
    <VStack flex="1" spacing={{ base: 2, sm: 4, md: 6 }} align="stretch">
      <Box bg={bg} w={{ base: '100%', md: '80%', lg: '60%' }} p={4} color="black">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <InputGroup>
              <Input
                mt={{ base: 2, md: 4 }}
                name="prompt"
                value={input}
                onChange={handleInputChange}
                id="input"
                placeholder="Type your message..."
              />
              <Button mt={{ base: 2, md: 4 }} colorScheme="blue" type="submit">
                Submit
              </Button>
            </InputGroup>
          </FormControl>
        </form>
        {messages.map((m) => (
          <div key={m.id} className={card}>
            {m.role === 'user' ? 'User: ' : 'AI: '}
           
            {m.content}
          </div>
        ))}
      </Box>
    </VStack>
  </Flex>
)}