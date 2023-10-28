import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Card from "./Card";
import Pagination from "./Pagination";
import { useSelector, useDispatch } from 'react-redux';
import { selectImages, setImages, addImage, removeImage } from './gallerySlice';
import {
  Box,
  Wrap,
  WrapItem,
  Center,
  Grid,
  GridItem,
  SimpleGrid,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image
} from "@chakra-ui/react";
import WarningModal from "../WarningModal";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [deleteImageUrl, setDeleteImageUrl] = useState("");
  const rowsPerPage = 10;
  const supabase = useSupabaseClient();
  const images = useSelector(selectImages);
  const dispatch = useDispatch();
  const { isOpen: isImageModalOpen, onOpen: onImageModalOpen, onClose: onImageModalClose } = useDisclosure();

  const { isOpen: isDeleteImageOpen, onOpen: onDeleteImageOpen, onClose: onDeleteImageClose } = useDisclosure();

  const handleDelete = (imageUrl) => {
    setDeleteImageUrl(imageUrl);
    onDeleteImageOpen();
  };

  const handleDeleteConfirm = async () => {
    onDeleteImageClose();
    await deleteImage();
  };

  useEffect(() => {
    if (deleteImageUrl) {
      onDeleteImageOpen();
    }
  }, [deleteImageUrl, onDeleteImageOpen]);

  const deleteImage = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("replicate_predictions").delete().eq("url", deleteImageUrl);
    if (!error) {
      setIsLoading(false);
      onDeleteImageClose();
      setRefresh((prev) => !prev);
    }
  };

  useEffect(() => {
    async function fetchCards() {
      let { count, data: cards, error } = await supabase
        .from("replicate_predictions")
        .select("*", { count: "exact" }) // fetch total count
        .order("created_at", { ascending: false })
        .range(page * rowsPerPage, (page + 1) * rowsPerPage - 1);

      if (error) console.log("error", error);
      else {
        setData(cards);
        setTotal(Math.ceil(count / rowsPerPage)); // update total page count
      }
    }

    fetchCards();
  }, [page, supabase, refresh]);

  const handleImageModalOpen = (imageUrl) => {
    setSelectedImage(imageUrl);
    onImageModalOpen();
  };

  return (
    <Box
      bgGradient="linear(to-b, white 0%, gray.200 40%, white 60%, white 100%)"
      overflowY="none"
      fontSize={["sm", "md", "lg", "xl"]}
      display="flex"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <VStack>
        <Wrap p={10} w="100%">
          {data.map((card) => (
            <WrapItem key={card.id}>
              <Card
                id={card.id}
                imageUrl={card.url}
                createdAt={card.created_at}
                prompt={card.prompt}
                handleDelete={handleDelete}
                isLoading={isLoading}
                handleModalOpen={handleImageModalOpen}
              />
            </WrapItem>
          ))}
        </Wrap>
        <Pagination currentPage={page} totalPages={total} onPageChange={(page) => setPage(page)} />
      </VStack>

      <WarningModal
        isOpen={isDeleteImageOpen}
        onClose={onDeleteImageClose}
        onConfirm={handleDeleteConfirm}
        title="Confirm Delete"
        content="Are you sure you want to delete this Image?"
      />

      <Modal closeOnOverlayClick={false} isOpen={isImageModalOpen} onClose={onImageModalClose} size="xl">
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent>
          <ModalHeader>View Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{selectedImage && <Image src={selectedImage} alt="Selected" />}</ModalBody>
          <ModalFooter>
            {selectedImage && (
              <Button as="a" href={selectedImage} download colorScheme="blue" mr={3}>
                Download
              </Button>
            )}
            <Button onClick={onImageModalClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
