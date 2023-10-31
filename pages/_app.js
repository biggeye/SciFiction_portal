import React from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import theme from "../styles/theme";
import { Provider } from 'react-redux';
import { store } from '../data/redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGalleryImages } from '../utils/redux/gallerySlice';
import { UserProvider } from '../contexts/UserContext'; // import your UserProvider

function App({ Component, pageProps }) {
  const supabaseClient = createPagesBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const ReduxProvider = Provider;

  function FetchGalleryImages() {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchGalleryImages());
    }, [dispatch]);

    return null; // This component doesn't render anything
  }
  
  return (
    <ReduxProvider store={store}>
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
    </ReduxProvider>
  );
}

export default App;
