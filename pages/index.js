import React, { useEffect, useState } from 'react';
import {
  Button,
  Box,
  Flex, // Import Flex for layout
  Spacer, // Import Spacer to align content
  Link, // Import Link for placeholder links
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import TermsOfService from "./TermsOfService"; // Correct the import path
import PrivacyPolicy from "./PrivacyPolicy";

// Social Media
import DashBoard from "../components/social/DashBoard";
import Connections from "../components/social/Connections";
import Twitter from "../components/social/Twitter";
import YouTube from "../components/social/YouTube";
import Facebook from "../components/social/Facebook";

// Vendors
import DID from "../components/creators/did/DID";
import ElevenLabs from "../components/creators/xilabs/ElevenLabs";

// Assets
import Videos from "../components/assets/Videos";
import Avatars from "../components/assets/Avatars";
import Scripts from "../components/assets/Scripts";
import Voiceovers from "../components/assets/Voiceovers";

// Auth & DB
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

export default function Home() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [currentPage, setCurrentPage] = useState("");
  // State to manage the modal's open/close state
  const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] = useState(false);
  // State to manage the modal's open/close state for Privacy Policy
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);




  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //If the user is not authenticated, render the Auth component
  if (!user) {
    const appearanceOptions = {
      theme: ThemeSupa,
    }
    return (
      <Auth
        supabaseClient={supabaseClient}
        appearance={appearanceOptions}
        redirectTo="http://localhost:3000"
        providers={['google']}
        queryParams={{
            scopes:  "https://www.googleapis.com/auth/youtube",
            redirectTo:  "http://localhost:3000/"
        }}
        socialLayout="horizontal"
      />
    )
  }

  // Function to open the ToS modal
  const openTermsOfService = () => {
    setIsTermsOfServiceOpen(true);
  };

  // Function to close the ToS modal
  const closeTermsOfService = () => {
    setIsTermsOfServiceOpen(false);
  };

  // Function to open the Privacy Policy modal
  const openPrivacyPolicy = () => {
    setIsPrivacyPolicyOpen(true);
  };

 // Function to close the Privacy Policy modal
const closePrivacyPolicy = () => {
  setIsPrivacyPolicyOpen(false);
};


  return (
    <Layout overflowX="none">
      <Box layerStyle="main" minH="100vh" overflowX="none" overflowY="auto" minW={400}>
        <Navbar handlePageChange={handlePageChange}  /> 

        {/* Assets */}
        {/* ... (other code) */}

        {/* Vendors */}
        {/* ... (other code) */}

        {/* Social Media */}
        {/* ... (other code) */}
      
      
 {/* Footer Section */}
 <Box py={4} bg="gray.200">
          <Flex align="center">
            <Box flex="1">
              {/* Link to open the Privacy Policy modal */}
              <Link onClick={openPrivacyPolicy}>Privacy Policy</Link>
            </Box>
            <Spacer />
            <Box flex="1">
              {/* Button to open the ToS modal */}
              <Button onClick={openTermsOfService}>View Terms of Service</Button>
            </Box>
          </Flex>
        </Box>
      </Box>
      
      {/* Render the Privacy Policy modal */}
      <PrivacyPolicy isOpen={isPrivacyPolicyOpen} onClose={closePrivacyPolicy} />
      
      {/* Render the ToS modal */}
      <TermsOfService isOpen={isTermsOfServiceOpen} onClose={closeTermsOfService} />
    </Layout>
  );
}
