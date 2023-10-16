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

// Social Media
import Dashboard from "../components/social/Dashboard";

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
        redirectTo="https://promo.scifiction.com/"
        providers={['google']}
        queryParams={{
            scopes:  "https://www.googleapis.com/auth/youtube",
            redirectTo:  "https://promo.scifiction.com/"
        }}
        socialLayout="horizontal"
      />
    )
  }


  return (
    <Layout overflowX="none">
    <Box layerStyle="main" minH="100vh" overflowX="none" overflowY="auto" minW={400}>
      <Navbar handlePageChange={handlePageChange}  /> 

      {/*Assets*/}
      {currentPage === "Avatars" && <Avatars />}
      {currentPage === "Voiceovers" && <Voiceovers />}
      {currentPage === "Scripts" && <Scripts />}
      {currentPage === "Videos" && <Videos />}

      {/*Vendors*/}
      {currentPage === "ElevenLabs" && <ElevenLabs  />}
      {currentPage === "DID" && <DID />}

      {/*Social Media*/}

      {currentPage === "Dashboard" && <Dashboard />}
    
      {currentPage === "TikTok" && <TikTok />}
    </Box>
  </Layout>
  );
}
