import React from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import theme from "../styles/theme";

import { UserProvider } from '../contexts/UserContext'; // import your UserProvider

function App({ Component, pageProps }) {
  const supabaseClient = createPagesBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  return (
    <ChakraProvider theme={theme}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </SessionContextProvider>
    </ChakraProvider>
  );
}

export default App;
