import React, { useEffect, useState } from "react";
import WarningModal from "../shared/WarningModal";

import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  HStack,
  FormLabel,
  VStack,
  ivider,
  Card,
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerContent,
  DrawerOverlay,
  FormControl,
  useDisclosure,
  SimpleGrid
} from "@chakra-ui/react";
import { upload_avatar } from "../../utils/production/upload";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useSelector, useDispatch } from 'react-redux';
import { selectImages } from '@/utils/redux/gallerySlice';


const convertToDataURI = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function Avatars() {
  const galleryImages = useSelector(selectImages);
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const [avatars, setAvatars] = useState([]);
  const [deleteAvatarUuid, setDeleteAvatarUuid] = useState("");
  const [newAvatarName, setNewAvatarName] = useState("");
  const [newAvatarImage, setNewAvatarImage] = useState("");
  const [newAvatarDescription, setNewAvatarDescription] = useState("");
  const [userInFile, setUserInFile] = useState([]);
  const {
    isOpen: isNewAvatarOpen,
    onOpen: onNewAvatarOpen,
    onClose: onNewAvatarClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteAvatarOpen,
    onOpen: onDeleteAvatarOpen,
    onClose: onDeleteAvatarClose,
  } = useDisclosure();
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);

  const handleDelete = (uuid) => {
    setDeleteAvatarUuid(uuid);
    onDeleteAvatarOpen();
  };
  const handleDeleteConfirm = async () => {
    onDeleteAvatarClose();
    await deleteAvatar();
  };
  useEffect(() => {
    if (deleteAvatarUuid) {
      onDeleteAvatarOpen();
    }
  }, [deleteAvatarUuid]);

  useEffect(() => {
    fetchAvatars(supabaseClient, setAvatars);
  }, []);
  const fetchAvatars = async (supabaseClient) => {
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
  
      // Reset selectedGalleryImage when a new image is uploaded
      setSelectedGalleryImage(null);
    }
  };
  
  const createNewAvatar = async (event) => {
    setIsLoading(true);
    event.preventDefault();
  
    // Use selectedGalleryImage if set, otherwise use the uploaded image
    const avatarImageToUse = selectedGalleryImage || userInFile;
  
    const newAvatarUuid = await upload_avatar(
      avatarImageToUse,
      newAvatarName,
      newAvatarDescription,
      user,
      supabaseClient
    );  
    
    if (!newAvatarUuid) {
      console.log("Avatar upload failed.");
    } else return newAvatarUuid;
    fetchAvatars();
    onNewAvatarClose();
    setIsLoading(false);
  };
  const deleteAvatar = async (event) => {
    setIsLoading(true);
    const { data, error } = await supabaseClient
      .from("avatar_")
      .delete()
      .eq("uuid", deleteAvatarUuid);
    if (!error) {
      setIsLoading(false);

      fetchAvatars(supabaseClient);
    }
  };
console.log(galleryImages);
  return (
    <Box layerStyle="subPage" position="relative">
    <Button
      size="xs"
      colorScheme="blue"
      position="absolute"
      top={2}
      left={2}
      onClick={onNewAvatarOpen}
    >
      New
    </Button>
  
    <Flex
      p={50}
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
    >
      {avatars?.map((avatar) => (
        <Box layerStyle="card" key={avatar.uuid} m={4}>
          <Image h="200" src={avatar.url} alt="Avatar Image" mb={2} />
          <Text fontWeight="bold">{avatar.name}</Text>
          <Text fontStyle="italic" mb={2}>{avatar.title}</Text>
          <Button
            isLoading={isLoading}
            size="xs"
            onClick={() => handleDelete(avatar.uuid)}
          >
            Delete
          </Button>
        </Box>
      ))}
    </Flex>
  
    <WarningModal
      isOpen={isDeleteAvatarOpen}
      onClose={onDeleteAvatarClose}
      onConfirm={handleDeleteConfirm}
      title="Confirm Delete"
      content="Are you sure you want to delete this avatar?"
    />
  
    <Drawer placement="bottom" onClose={onNewAvatarClose} isOpen={isNewAvatarOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          Create New Avatar Model
        </DrawerHeader>
        <DrawerBody>
          <form id="newAvatar" onSubmit={createNewAvatar}>
            <VStack spacing={4}>
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    value={newAvatarName}
                    onChange={(e) => setNewAvatarName(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input
                    type="text"
                    value={newAvatarDescription}
                    onChange={(e) => setNewAvatarDescription(e.target.value)}
                  />
                </FormControl>
              </HStack>
  
              <Box>
                <Text mb={2}>Avatar Sample</Text>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {newAvatarImage && (
                  <Image src={newAvatarImage} alt="Image To Upload" w="15vw" mt={2} />
                )}
              </Box>
              <Text mt={4}>Select an Image from Gallery:</Text>
          <SimpleGrid columns={3} spacing={4}>
            {galleryImages.map((image, index) => (
              <Box
                key={index}
                border={selectedGalleryImage === image.url ? "2px solid blue" : "none"}
                onClick={() => setSelectedGalleryImage(image.url)}
                p={2}
              >
                <Image src={image.url} alt="Gallery Image" />
              </Box>
            ))}
          </SimpleGrid>
  
              <Button type="submit" colorScheme="blue" isLoading={isLoading}>
                Create
              </Button>
            </VStack>
          </form>
  
        
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  </Box>
  
  );
}
