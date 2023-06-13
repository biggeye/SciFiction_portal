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
import VoiceModels from "../components/creators/xilabs/VoiceModels";
import Avatars from "../components/assets/Avatars";
import Scripts from "../components/assets/Scripts";
import Voiceovers from "../components/assets/Voiceovers";
//CONTENT
import Videos from "../components/content/Videos";
import Campaigns from "../components/content/Campaigns";
import { Box } from "@chakra-ui/react";
//AUTH & DB
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Home() {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [currentPage, setCurrentPage] = useState("");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
{/*
  if (!user)
    return (
      <Auth
        redirectTo="/"
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient}
        providers={['twitter']}
        socialLayout="horizontal"
      />
    )
    */}
  return (
    <Layout>
      <Box as="section" bg="black" _dark={{ bg: "brand.800" }} minH="100vh" overflowX="none" overflowY="auto">
        <Navbar handlePageChange={handlePageChange}/> 
        <Box bg="gray.900" as="main" p="2">
            {/*Assets*/}
            {currentPage === "Avatars" && <Avatars supabaseClient={supabaseClient}/>}
            {currentPage === "VoiceModels" && <VoiceModels supabaseClient={supabaseClient} />}
            {currentPage === "Voiceovers" && <Voiceovers supabaseClient={supabaseClient}/>}
            {currentPage === "Scripts" && <Scripts supabaseClient={supabaseClient}/>}
            {/*Content*/}
            {currentPage === "Videos" && <Videos />}
            {currentPage === "Campaigns" && <Campaigns />}
             {/*Social Media*/}          
            {currentPage === "DashBoard" && <DashBoard />}
            {currentPage === "Twitter" && <Twitter />}
            {currentPage === "Facebook" && <Facebook />}
            {currentPage === "YouTube" && <YouTube />}
        </Box>
      </Box>
    </Layout>
  );
}
