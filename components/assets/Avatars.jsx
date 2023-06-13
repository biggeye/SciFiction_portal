import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Image, Input, Text, Divider, Card, Drawer, DrawerHeader, DrawerBody, DrawerFooter, DrawerContent, DrawerOverlay, FormControl, useDisclosure } from "@chakra-ui/react";
import { upload_avatar } from "../../utils/production/upload";

const convertToDataURI = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function Avatars({ supabaseClient, user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [avatars, setAvatars] = useState([]);
  const [newAvatarName, setNewAvatarName] = useState("");
  const [newAvatarImage, setNewAvatarImage] = useState("");
  const [newAvatarDescription, setNewAvatarDescription] = useState("");
  
  const [userInFile, setUserInFile] = useState([]);
  const { isOpen: isNewAvatarOpen, onOpen: onNewAvatarOpen, onClose: onNewAvatarClose } = useDisclosure();

const userId = user

  useEffect(() => {
    fetchAvatars();
  }, []);

  const fetchAvatars = async () => {
    try {
      const { data, error } = await supabaseClient.from("avatar_").select("*");
      if (error) throw error;
      setAvatars(data);
    } catch (error) {
      console.error("Error fetching avatars:", error.message);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imagePreview = URL.createObjectURL(file);
      setNewAvatarImage(imagePreview);
      const URI = await convertToDataURI(file);
      setUserInFile(URI);
    }
  };
  const createNewAvatar = async (event) => {
    event.preventDefault();
  const newAvatarUuid = await upload_avatar(userInFile, newAvatarName, newAvatarDescription, user, supabaseClient);
  if (!newAvatarUuid) {
    console.log("Avatar upload failed.");
}
else return newAvatarUuid;
};

  return (
    <Box width="fill" height="fill">
      <Box position="absolute" mt={2} ml={2}>
        <Button
          size="xs"
          colorScheme="blue"
          onClick={() => {
            onNewAvatarOpen();
          }}
        >
          New
        </Button>
      </Box>
      <Flex
        w="full"
        bg="gray.700"
        _dark={{ bg: "#3e3e3e" }}
        p={50}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap" // allow cards to wrap to new lines
      >
        {avatars.map((avatar) => (
          <Box
            key={avatar.uuid}
            w="200px"
            bg="brand.200"
            _dark={{ bg: "gray.900" }}
            m={4}
            borderWidth="3px"
            borderColor="brand.400"
            borderRadius="md" // rounded corners
            overflow="hidden" // keep child boundaries within card
            boxShadow="xl" // small shadow for 3D effect
            textAlign="center"
          >
            <Box p={4}>
              <Image src={avatar.url} alt="Avatar Image" />
              <Text size="md" as="b">
                {avatar.name}
              </Text>
              <Text size="md" as="b">
                {avatar.title}
              </Text>
            </Box>
          </Box>
        ))}
        <Divider />

      </Flex>
      <Drawer
        placement="bottom"
        onClose={onNewAvatarClose}
        isOpen={isNewAvatarOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Create New Avatar Model
          </DrawerHeader>
          <DrawerBody>
            <FormControl>
              <form id="newAvatar" onSubmit={createNewAvatar}>
                <Flex direction={{ base: "column", md: "row" }}>
                  <Text>Name</Text>
                  <Input
                    type="text"
                    value={newAvatarName}
                    onChange={(e) => setNewAvatarName(e.target.value)}
                  />

                  <Text>Description</Text>
                  <Input
                    type="text"
                    value={newAvatarDescription}
                    onChange={(e) => setNewAvatarDescription(e.target.value)}
                  />
                </Flex>
                <Card>
                  <Text>Avatar Sample</Text>
                  <Box w="20vw">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {newAvatarImage && (
                  <Image src={newAvatarImage} alt="Image To Upload" w="15vw" />
                )}
              </Box>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    isLoading={isLoading}
                  >
                    Create
                  </Button>
                </Card>
              </form>
            </FormControl>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
