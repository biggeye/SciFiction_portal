import { useChat } from 'ai/react';
import {
  AddIcon,
  CloseIcon,
  HamburgerIcon,
  RepeatIcon,
  SettingsIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  Grid,
  InputLeftAddon,
  InputRightAddon,
  Center,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

export const runtime = 'experimental-edge';

export default function Chat() {
  const { api, messages, handleSubmit, input, handleInputChange } = useChat();
  const bg = useColorModeValue('gray.50', 'gray.700');
  const responseBg = useColorModeValue('gray.100', 'gray.600');

  return (
    <VStack spacing={4} align="stretch">
    <Box bg={bg} w="100%" p={4} color="black">
      <form onSubmit={handleSubmit}>
        <FormControl>
                    <InputGroup>
          <Input
          mt={4}
            name="prompt"
            value={input}
            onChange={handleInputChange}
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
    <VStack spacing={4} align="stretch">
      {messages.map((message, i) => (
        <Box
          key={i}
          bg={i % 2 === 0 ? bg : responseBg}
          w="100%"
          p={4}
          color="black"
        >
          {message.content}
        </Box>
      ))}
    </VStack>
  </VStack>
);
}
