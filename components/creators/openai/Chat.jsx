import React, { useState } from 'react';
import {
  ChakraProvider, Flex, Box, VStack, Input, Button, IconButton, Collapse, Heading, Text, 
  Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, 
  FormControl, InputGroup, useDisclosure, useBreakpointValue, useColorModeValue
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { MdImage, MdAudiotrack, MdTextFields, MdOndemandVideo } from 'react-icons/md';

// Assuming useChat is a custom hook you've created
import useChat from './useChat'; 

const ToolIcons = {
  Image: MdImage,
  Voiceover: MdAudiotrack,
  Script: MdTextFields,
  Video: MdOndemandVideo,
};

export default function Chat() {
  const [selectedTool, setSelectedTool] = useState(null);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { messages, handleSubmit, input, handleInputChange } = useChat();
  const isDrawer = useBreakpointValue({ base: true, md: false });

  const bg = useColorModeValue("gray.50", "gray.700");
  const responseBg = useColorModeValue("gray.100", "gray.600");

  const handleToolSelection = (tool) => {
    setSelectedTool(tool);
    onToggle();
  };

  const renderInputForm = () => {
    switch (selectedTool) {
      case 'Image':
        return <Input placeholder="Upload Image" />;
      case 'Voiceover':
        return <Input placeholder="Record Voiceover" />;
      case 'Script':
        return <Input placeholder="Write Script" />;
      case 'Video':
        return <Input placeholder="Upload Video" />;
      default:
        return <Text>Select a tool from the toolbox.</Text>;
    }
  };

  return (
    <ChakraProvider>
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Box>
          {isDrawer ? (
            <IconButton
              icon={<HamburgerIcon />}
              onClick={onToggle}
              variant="outline"
              aria-label="Open Menu"
            />
          ) : (
            <Text>History</Text>
          )}
        </Box>

        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>History</DrawerHeader>
            <DrawerBody></DrawerBody>
          </DrawerContent>
        </Drawer>

        <Box flex="1" maxW="container.xl" p={4}>
          <VStack align="stretch" spacing={4}>
            <Flex justify="space-between" wrap="wrap">
              <Box>
                {Object.entries(ToolIcons).map(([tool, Icon]) => (
                  <IconButton
                    key={tool}
                    aria-label={tool}
                    icon={<Icon />}
                    onClick={() => handleToolSelection(tool)}
                    isRound
                    m={2}
                  />
                ))}
              </Box>
              <VStack spacing={4}>
                <Heading>{selectedTool || 'Output'}</Heading>
                <Collapse in={isOpen} animateOpacity>
                  <Box p={4} border="1px" borderColor="gray.200" rounded="md">
                    {renderInputForm()}
                  </Box>
                </Collapse>
              </VStack>
            </Flex>
          </VStack>

          <VStack spacing={{ base: 2, sm: 4, md: 6 }} align="stretch">
            <Box bg={bg} w={{ base: '100%', md: '80%', lg: '60%' }} p={4} color="black">
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <InputGroup>
                    <Input
                      name="prompt"
                      value={input}
                      onChange={handleInputChange}
                      id="input"
                      placeholder="Type your message..."
                    />
                    <Button colorScheme="blue" type="submit">
                      Submit
                    </Button>
                  </InputGroup>
                </FormControl>
              </form>
              {messages.map((m) => (
                <Box key={m.id} bg={responseBg} p={3} my={2} rounded="md">
                  {m.role === 'user' ? 'User: ' : 'AI: '}
                  {m.content}
                </Box>
              ))}
            </Box>
          </VStack>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}