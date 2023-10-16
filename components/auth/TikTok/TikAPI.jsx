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
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const TikAPIConnectButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const supabase = useSupabaseClient();
  const user = useUser();

  const constructOAuthLink = () => {
    const clientId = "c_BCLMWJVHOJ"; // Replace with your TikAPI client_id
    const redirectUri = "https://promo.scifiction.com/index"; // Replace with your TikAPI redirect_uri
    const scope = "view_profile+live+explore"; // Scope based on your requirements
    const oAuthLink = `https://tikapi.io/account/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.open(oAuthLink, "TikAPIAuthorization", "width=600,height=400");
  };

  // Function to handle the "Authorize" button click
  const handleAuthorizeClick = () => {
    openTikAPIAuthorizationPage();
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    const userId = user;
    const provider = "TikTok";

    const data = {
      id: YOUR_UUID_VALUE, // Replace with the actual UUID value
      user_id: userId,
      provider: provider,
      access_token: accessToken,
      refresh_token: null, // Replace with the actual refresh token value if available
      expires_at: null, // Replace with the actual expiration timestamp if available
      created_at: new Date(),
      updated_at: new Date(),
    };
    
    // Insert the data into the oauth2_tokens table
    const insertData = async () => {
      try {
        const { data, error } = await supabase.from('oauth2_tokens').insert([data]);
        if (error) {
          console.error(error);
        } else {
          console.log('Data inserted successfully:', data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    insertData();
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
