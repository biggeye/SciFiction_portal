import React, { useEffect, useState } from 'react';
import {
  Box,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";

// Social Media
import DashBoard from "../components/social/DashBoard";
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //If user is not authenticated, render the Auth component
  if (!user) {
    const appearanceOptions = {
      theme: ThemeSupa,
    }
    return (
      <Auth
        supabaseClient={supabaseClient}
        appearance={appearanceOptions}
        redirectTo="/"
        providers={['google']}
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
        {currentPage === "DashBoard" && <DashBoard />}
        {currentPage === "Twitter" && <Twitter />}
        {currentPage === "Facebook" && <Facebook />}
        {currentPage === "YouTube" && <YouTube />}
      </Box>
    </Layout>
  );
}
