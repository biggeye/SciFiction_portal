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
import performOAuth2Authentication from "../../../utils/auth/oauth2"; // Import the function

const TikAPIConnectButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

<<<<<<< HEAD
  // Function to open the TikAPI authorization page in a new window
  const openTikAPIAuthorizationPage = () => {
    const clientId = "JaDOtuymluYioUkHHJRIKqA9lkEdsPHYSK8GRYQyojaNsRZq"; // Replace with your TikAPI client_id
    const redirectUri = "https://promo.scifiction.com"; // Replace with your TikAPI redirect_uri
=======
  // Function to construct the OAuth Link
  const constructOAuthLink = () => {
    const clientId = "c_BCLMWJVHOJ"; // Replace with your TikAPI client_id
    const redirectUri = "https://promo.scifiction.com"; // Replace with your TikAPI redirect_uri
>>>>>>> 87b256b3ffb34d87fad67323c60368c3853757e1
    const scope = "view_profile explore"; // Scope based on your requirements
    const oAuthLink = `https://tikapi.io/account/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.open(oAuthLink, "TikAPIAuthorization", "width=600,height=400");
  };

  // Function to handle the "Authorize" button click
  const handleAuthorizeClick = () => {
    openTikAPIAuthorizationPage();

    // Add an event listener to capture the token from the callback URL
    window.addEventListener("message", (event) => {
      if (event.origin === "https://promo.scifiction.com") {
        // Extract the token from the event data
        const accessToken = event.data;

        // Call the performOAuth2Authentication function to store the token in Supabase
        performOAuth2Authentication(accessToken, "TikAPI", "TikTok");
      }
    });

    // Close the modal after initiating the OAuth2 authorization
    setIsModalOpen(false);
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

            <Button colorScheme="teal" onClick={handleAuthorizeClick}>
              Authorize
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TikAPIConnectButton;
