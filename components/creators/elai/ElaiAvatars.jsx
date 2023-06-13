import React from "react";
import { useState, useEffect } from "react";
import {
  ButtonGroup,
  Box,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
  Image,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Textarea,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import AudioPlayer from "../../shared/AudioPlayer";

export default function ElaiAvatars() {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const sizes = ["xs", "sm", "md", "lg", "xl"];
  const [currentName, setCurrentName] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [script, setScript] = useState("");
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchYourData().then((cards) => {
      setData(cards);
    });
  }, []);

  const fetchYourData = async () => {
    const response = await axios.get(
      "https://flask-vercel-silk.vercel.app/api/elai/get_avatars"
    );
    const avatars = response.data;
    console.log(avatars);
  
    const cards = [];
  
    avatars.forEach((avatar) => {
      avatar.variants.forEach((variant) => {
        const card = {
          avatar_name: avatar.name,
          avatar_id: avatar._id,
          thumbnail: variant.thumbnail,
          variant_id: variant.id,
        };
  
        cards.push(card);
      });
    });
  
    return cards;
  };
  

  const handleFormInputChange = (e) => {
    setScript(e.target.value);
  };

  return (
    <Flex
      w="full"
      bg="gray.700"
      _dark={{ bg: "#3e3e3e" }}
      p={50}
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap" // allow cards to wrap to new lines
    >
{data.map((card) => (
  <Box
    key={card.avatar_id}
    bg="white"
    _dark={{ bg: "brand.800" }}
    m={4} // some margin for separation
    borderRadius="md" // rounded corners
    overflow="hidden" // keep child boundaries within card
    boxShadow="sm" // small shadow for 3D effect
    textAlign="center"
  >
    <Box alignItems="center">
      <Image p={2} h={70} alt="thumbnail" src={card.thumbnail} />
      <Text size="sm" as="b">{card.avatar_name}</Text>
      <Text size="xs">{card.variant_id}</Text>
    </Box>
  </Box>
))}


      <Drawer
        size={sizes}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <form id="TTS">
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{currentName}</DrawerHeader>

            <DrawerBody>
              <Flex>
                <Textarea
                  h="100%"
                  rows="auto"
                  placeholder="Type or paste the script here"
                  name="script"
                  onChange={handleFormInputChange}
                />
              </Flex>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isLoading} // Add this line to use the isLoading state
              >
                Generate Voiceover
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </Flex>
  );
}
