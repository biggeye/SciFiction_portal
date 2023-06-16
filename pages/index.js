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
import { 
  Box,

 } from "@chakra-ui/react";
//AUTH & DB
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
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
        providers={['twitter']}
        socialLayout="horizontal"
      />
    )

  return (
    <Layout overflowX="none">
      <Box as="section" bg="brand.50" _dark={{ bg: "brand.900" }} minH="100vh" overflowX="none" overflowY="auto">
        <Navbar handlePageChange={handlePageChange} supabaseClient={supabaseClient} user={user} /> 
        <Box bg="brand.800" as="main" p="10">
            {/*Assets*/}
            {currentPage === "Avatars" && <Avatars supabaseClient={supabaseClient} user={user}/>}
            {currentPage === "VoiceModels" && <VoiceModels supabaseClient={supabaseClient} user={user} />}
            {currentPage === "Voiceovers" && <Voiceovers supabaseClient={supabaseClient} user={user}/>}
            {currentPage === "Scripts" && <Scripts supabaseClient={supabaseClient} user={user}/>}
            {/*Content*/}
            {currentPage === "Videos" && <Videos supabaseClient={supabaseClient} user={user}/>}
            {currentPage === "Campaigns" && <Campaigns supabaseClient={supabaseClient} user={user}/>}
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
