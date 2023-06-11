import React from "react";
import { useEffect, useState } from 'react'
//VENDORS
import Talks from "../components/creators/did/Talks";
import ElaiAvatars from "../components/creators/elai/ElaiAvatars";
import VoiceModels from "../components/creators/xilabs/VoiceModels";

//PROPRIETARY
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import DashBoard from "../components/social/DashBoard";
import Avatars from "../components/assets/Avatars";
import Scripts from "../components/assets/Scripts";
import Voiceovers from "../components/assets/Voiceovers";
import { Box } from "@chakra-ui/react";
//AUTH & DB
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Home() {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  if (!user)
    return (
      <Auth
        redirectTo="/"
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient}
        providers={['google', 'twitter']}
        socialLayout="horizontal"
      />
    )

    const [currentPage, setCurrentPage] = useState("");
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
  return (
    <Layout>
      <Box as="section" bg="black" _dark={{ bg: "brand.800" }} minH="100vh" overflowX="none" overflowY="auto">
        <Navbar handlePageChange={handlePageChange}/> 
        <Box bg="gray.900" as="main" p="2">
            {currentPage === "Dashboard" && <Dashboard />}
            {currentPage === "Avatars" && <Avatars />}
            {currentPage === "VoiceModels" && <VoiceModels />}
            {currentPage === "Voiceovers" && <Voiceovers />}
            {currentPage === "Scripts" && <Scripts />}
            {currentPage === "Videos" && <Videos />}
            {currentPage === "Campaigns" && <Campaigns />}
        </Box>
      </Box>
    </Layout>
  );
}
