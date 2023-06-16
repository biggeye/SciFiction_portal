import React from "react";
import { useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import theme from "../styles/theme";

function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY));


  return (
    <ChakraProvider theme={theme}>
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      
        <Component {...pageProps} />

    </SessionContextProvider>
    </ChakraProvider>
  );
}

export default App;
