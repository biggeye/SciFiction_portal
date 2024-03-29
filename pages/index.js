import React, { useEffect, useState } from 'react';
import {
  Button,
  Box,
  Flex, // Import Flex for layout
  Spacer, // Import Spacer to align content
  Link, // Import Link for placeholder links
} from "@chakra-ui/react";
import Layout from "../components/Layout";


// Social Media
import Dashboard from "../components/social/Dashboard";
import LiveStream from "../components/creators/did/LiveStream";

// Vendors
import D_ID from "../components/creators/did/DID";
import ElevenLabs from "../components/creators/xilabs/ElevenLabs";
import Img2Img from "../components/creators/replicate/Img2Img";
import Txt2Img from "../components/creators/replicate/Txt2Img";
import Chat from "../components/creators/openai/Chat";

// Assets
import Images from "../components/shared/imageGallery";
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
  const user_id = useUser();
  const [currentPage, setCurrentPage] = useState("");




  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //If user is not authenticated, render the Auth component
  if (!user_id) {
    const appearanceOptions = {
      theme: ThemeSupa,
    }
    return (
      <Auth
        supabaseClient={supabaseClient}
        appearance={appearanceOptions}
        socialLayout="horizontal"
      />
    )
  }


  return (
    <Layout overflowX="none" handlePageChange={handlePageChange}>

     
      {/*Gallery*/}
      {currentPage === "Images" && <Images />}
      {currentPage === "Avatars" && <Avatars />}
      {currentPage === "Voiceovers" && <Voiceovers />}
      {currentPage === "Scripts" && <Scripts />}
      {currentPage === "Videos" && <Videos />}

      {/*Create*/}
      {currentPage === "ElevenLabs" && <ElevenLabs  />}
      {currentPage === "DID" && <D_ID />}
      {currentPage === "Txt2Img" && <Txt2Img />}
      {currentPage === "Img2Img" && <Img2Img />}
      {currentPage === "Chat" && <Chat />}

      {/*Publish*/}
      {currentPage === "Dashboard" && <Dashboard />}
      {currentPage === "TikTok" && <TikTok />}

      {/*Broadcast*/}
      {currentPage === "LiveStream" && <LiveStream />}
      </Layout>
  );
}
