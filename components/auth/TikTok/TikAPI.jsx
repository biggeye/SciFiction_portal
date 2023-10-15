import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";

const TikAPIConnectButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to construct the OAuth Link
  const constructOAuthLink = () => {
    const clientId = "your_client_id"; // Replace with your TikAPI client_id
    const redirectUri = "your_redirect_uri"; // Replace with your TikAPI redirect_uri
    const scope = "view_profile explore"; // Scope based on your requirements
    const oAuthLink = `https://tikapi.io/account/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    return oAuthLink;
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Connect to TikAPI</Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Authorize TikAPI</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              To connect your TikAPI account, click the "Authorize" button below. This will open the TikAPI authorization page.
            </Text>

            <Button
              as="a"
              href={constructOAuthLink()}
              target="_blank"
              rel="noopener noreferrer"
              colorScheme="teal"
            >
              Authorize
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TikAPIConnectButton;
