import Head from "next/head";
import { Box, Main } from "@chakra-ui/react";


const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>promo.SciFiction.com</title>
        <meta name="SciFiction Promotions and Giveaways" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/bigeye_100.png" />
      </Head>

        <Box>{children}</Box>

    </div>
  );
};

export default Layout;
