import React from "react";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import Talks from "../../components/creators/d_id/Talks";
import CreateTalk  from "../../components/creators/d_id/CreateTalk";
import Voices from "../../components/creators/xilabs/Voices";
import Voiceovers from "../../components/creators/xilabs/Voiceovers";
import { useState } from "react";
import { Box } from "@chakra-ui/react";

export default function creators() {
  const [currentPage, setCurrentPage] = useState("");
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <Box as="section" bg="brand.200" _dark={{ bg: "brand.800" }} minH="100vh">
        <Navbar handlePageChange={handlePageChange}/> 
        <Box as="main" p="2">
            {/* Add content here, remove div below  */}
            {currentPage === "Voices" && <Voices />}
            {currentPage === "Voiceovers" && <Voiceovers />}
            {currentPage === "CreateTalk" && <CreateTalk />}
            {currentPage === "Talks" && <Talks />}
            {currentPage === "Settings" && <Settings />} // Add Settings page
        </Box>
      </Box>
    </Layout>
  );
}
