import React from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Avatars from "../components/creators/elai/Avatars";
import Voices from "../components/creators/xilabs/Voices";
import Talks from "../components/creators/did/Talks";
import Voiceovers from "../components/creators/xilabs/Voiceovers";
import { Box } from "@chakra-ui/react";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'


export default function Home() {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
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
        providers={['google', 'github']}
        socialLayout="horizontal"
      />
    )

 
  return (
    <Layout>
      <Box as="section" bg="black" _dark={{ bg: "brand.800" }} minH="100vh">
        <Navbar handlePageChange={handlePageChange}/> 
        <Box as="main" p="2">
            {/* Add content here, remove div below  */}
            {currentPage === "Talks" && <Talks />}
            {currentPage === "Avatars" && <Avatars />}
            {currentPage === "Voices" && <Voices />}
            {currentPage === "Voiceovers" && <Voiceovers />}
            {currentPage === "Settings" && <Settings />}
        </Box>
      </Box>
    </Layout>
  );
}
