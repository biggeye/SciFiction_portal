import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    50: "#ececec",
    100: "#d0d2d5b",
    200: "#b4b8be",
    300: "#999fa8",
    400: "#7f8692",
    500: "#666e7c",
    600: "#4d5868",
    700: "#354254",
    800: "#1e2d40",
    900: "#041a2e",
  },
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const components = {
  Scrollbars: {
    baseStyle: {
      "::-webkit-scrollbar": {
        width: "16px",
        height: "16px",
      },
      "::-webkit-scrollbar-track": {
        background: "brand.100",  // adjust according to your brand colors
      },
      "::-webkit-scrollbar-thumb": {
        background: "brand.500",  // adjust according to your brand colors
        borderRadius: "8px",
        border: "4px solid transparent",
        backgroundClip: "content-box",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "brand.700",  // adjust according to your brand colors
      },
    },
  },
};

const theme = extendTheme({ colors, config, components });

export default theme;
