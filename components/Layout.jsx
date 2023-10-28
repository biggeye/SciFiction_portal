import Head from "next/head";
import { Box, Main } from "@chakra-ui/react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>promo.SciFiction.com</title>
        <meta name="SciFiction Promotions and Giveaways" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/bigeye_100.png" />
      </Head>
      <Box layerStyle="main" minH="100vh" overflowX="none" overflowY="auto" minW={400}>
      <Navbar handlePageChange={handlePageChange}  /> 
      {children}
      </Box>

    </div>
  );
};

export default Layout;
