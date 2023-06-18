import React, { useEffect, useState } from 'react'
//PROPRIETARY
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

//SOCIAL MEDIA
import DashBoard from "../components/social/DashBoard";
import Twitter from "../components/social/Twitter";
import YouTube from "../components/social/YouTube";
import Facebook from "../components/social/Facebook";
//ASSETS
import DID from "../components/creators/did/DID";
import ElevenLabs from "../components/creators/xilabs/ElevenLabs";
import Avatars from "../components/assets/Avatars";
import Scripts from "../components/assets/Scripts";
import Voiceovers from "../components/assets/Voiceovers";
//CONTENT
import Videos from "../components/content/Videos";
import Campaigns from "../components/content/Campaigns";
import { 
  Box,

 } from "@chakra-ui/react";
//AUTH & DB
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Home() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [currentPage, setCurrentPage] = useState("");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!user)
    return (
      <Auth
        redirectTo="/"
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient}
        providers={['google']}
        socialLayout="horizontal"
      />
    )

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
