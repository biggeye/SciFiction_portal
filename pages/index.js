import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Link,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import TermsOfServiceModal from "./TermsOfServiceModal"; // Correct the import path
import PrivacyPolicyModal from "./PrivacyPolicy";

export default function Home() {
  const [isTermsOfServiceModalOpen, setIsTermsOfServiceModalOpen] = useState(false);
  const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] = useState(false);

  const openTermsOfServiceModal = () => {
    setIsTermsOfServiceModalOpen(true);
  };

  const closeTermsOfServiceModal = () => {
    setIsTermsOfServiceModalOpen(false);
  };

  const openPrivacyPolicyModal = () => {
    setIsPrivacyPolicyModalOpen(true);
  };

  const closePrivacyPolicyModal = () => {
    setIsPrivacyPolicyModalOpen(false);
  };

  return (
    <Layout overflowX="none">
      <Box layerStyle="main" minH="calc(100vh - 100px)" overflowX="none" overflowY="auto" minW={400}>
        <Navbar />
        
        {/* Placeholders for Assets, Vendors, and Social Media */}
        {/* Replace with your content */}
        <Box p={4}>
          {/* Your content goes here */}
          <h1>Main Content</h1>
        </Box>
      </Box>

      {/* Footer Section */}
      <Box py={2} bg="gray.200">
        <Flex align="center" justify="center">
          <Box>
            {/* Link to open the Privacy Policy modal */}
            <Link onClick={openPrivacyPolicyModal}>Privacy Policy</Link>
          </Box>
          <Box mx={2}>|</Box>
          <Box>
            {/* Link to open the ToS modal */}
            <Link onClick={openTermsOfServiceModal}>Terms of Service</Link>
          </Box>
        </Flex>
      </Box>

      {/* Render the Privacy Policy modal */}
      <PrivacyPolicyModal isOpen={isPrivacyPolicyModalOpen} onClose={closePrivacyPolicyModal} />

      {/* Render the ToS modal */}
      <TermsOfServiceModal isOpen={isTermsOfServiceModalOpen} onClose={closeTermsOfServiceModal} />
    </Layout>
  );
}
