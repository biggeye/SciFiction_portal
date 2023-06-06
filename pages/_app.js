import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

function App({ Component, pageProps }) {
  const colors = {
    brand: {
      50: "#f1e7cc",
      100: "#bcd7eb",
      200: "#c7dae5",
      300: "#eac9aa",
      400: "#88cb",
      500: "#5298d1",
      600: "#78afda",
      700: "#e4b18f",
      800: "#cd5123",
      900: "#a4411c"
    }
  };
  
  
  const config = {
    initialColorMode: "dark",
    useSystemColorMode: false
  };
  
  const theme = extendTheme({ colors, config });
  
  return (
    <ChakraProvider theme={theme}>
        <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
