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
  Text
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useChat } from "ai/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Chat() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { messages, handleSubmit, input, handleInputChange } = useChat();
  const bg = useColorModeValue("gray.50", "gray.700");
  const responseBg = useColorModeValue("gray.100", "gray.600");
  const isDrawer = useBreakpointValue({ base: true, md: false });
  const supabase = useSupabaseClient();
  const user = useUser(); // Corrected from userId to user
  const [conversationId, setConversationId] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const renderActiveChat = () => {
    return messages.map((message, i) => (
      <Box
        key={i}
        bg={i % 2 === 0 ? bg : responseBg}
        w="100%"
        p={4}
        color="black"
      >
        {message.content}
      </Box>
    ));
  };

  const sidebarContent = (
    <Box
      w={{ base: "full", md: "250px", lg: "300px" }}
      bg={bg}
      p={4}
      h="100vh"
      color="black"
    >
      <Button onClick={createNewConversation}>+</Button>
      <Text>{renderConversations}</Text>
    </Box>
  );

  async function createNewConversation() {
    const { data, error } = await supabase
      .from("conversations")
      .insert([{ user_id: user.id }])
      .single();

    if (error) {
      console.error("Error creating new conversation:", error);
      return null;
    }
    console.log("createNewConversation data return: ", data);
    return data;
  };

  const saveConversation = async () => {
    if (!conversationId) {
      const { data, error } = await supabase
        .from("conversations")
        .insert([{ user_id: user.id, started_at: new Date().toISOString() }])
        .single();

      if (error) {
        console.error("Error creating new conversation:", error);
        return null;
      }
      return data;
    } else {
      const { error } = await supabase
        .from("conversations")
        .update({ ended_at: new Date().toISOString() })
        .match({ id: conversationId });

      if (error) {
        console.error("Error updating conversation end time:", error);
      }
    }
  };

  async function saveToSupabase(prompt, completion) {
    const conversationData = await saveConversation();
    if (conversationData && !conversationId) {
      setConversationId(conversationData.id);
    }

    const { error } = await supabase.from("chatbot_sessions").insert([
      {
        conversation_id: conversationId || conversationData.id,
        prompt: prompt,
        completion: completion,
        user_id: user.id, // Corrected from userId.id to user.id
      },
    ]);

    if (error) {
      console.error("Error saving chatbot session:", error);
    }
  };

  const modifiedHandleSubmit = async (event) => {
    event.preventDefault();
    const { prompt, completion } = await handleSubmit();
    if (prompt && completion) {
      saveToSupabase(prompt, completion);
    }
  };

  const fetchConversations = async () => {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .order('started_at', { ascending: false });
  
    if (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }
  
    return data || [];
  };

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetchConversations().then(setConversations);
  }, []);

  async function renderConversations() {
    
    return conversations.map((conversation) => (
      <Box key={conversation.id} p={2} onClick={() => setSelectedConversation(conversation)}>
        <Text>{conversation.title}</Text>
      </Box>
    ));
  };

  const renderSelectedConversation = () => {

    

    return (
      <Box p={2}>
        <Text>Conversation ID: {selectedConversation.id}</Text>
        <Text>Title: {selectedConversation.title}</Text>
      </Box>
    );
  };

  return (
    <Flex>
      {isDrawer ? (
        <IconButton
          icon={<HamburgerIcon />}
          onClick={onOpen}
          variant="outline"
          aria-label="Open Menu"
        />
      ) : (
        <Box
          w={{ base: 'full', md: '250px', lg: '300px' }}
          bg={bg}
          p={4}
          h="100vh"
          color="black"
        >
          <Button onClick={createNewConversation}>+</Button>
          {renderConversations()}
        </Box>
      )}

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chat History and Settings</DrawerHeader>
          <DrawerBody>{sidebarContent}</DrawerBody>
        </DrawerContent>
      </Drawer>

      <VStack flex="1" spacing={4} align="stretch">
        <Box bg={bg} w="100%" p={4} color="black">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <InputGroup>
                <Input
                  mt={4}
                  name="prompt"
                  value={input}
                  onChange={handleInputChange}
                  onFinish={saveToSupabase}
                  id="input"
                  placeholder="Type your message..."
                />
                <Button mt={4} colorScheme="blue" type="submit">
                  Submit
                </Button>
              </InputGroup>
            </FormControl>
          </form>
        </Box>
        {selectedConversation ? renderSelectedConversation() : renderActiveChat()}
      </VStack>
    </Flex>
  );
}