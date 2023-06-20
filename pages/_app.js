import React from "react";
import { useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import theme from "../styles/theme";

import { UserContext } from '../contexts/UserContext'; // import your UserContext

function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY));

  // Initial userState can be fetched from the server as well
  const [userProfile, setUserProfile] = useState({ name: "", avatar_url: "" });

  const updateProfile = async (newProfileData) => {
    // Update the user profile data here
    // The implementation would depend on your backend
    // Update the state after successful update
    setUserProfile(newProfileData);
  }

  return (
    <ChakraProvider theme={theme}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <UserContext.Provider value={{ userProfile, updateProfile }}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </SessionContextProvider>
    </ChakraProvider>
  );
}

export default App;
