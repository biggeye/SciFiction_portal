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
  initialColorMode: "light",
  
};

const baseCardStyle = {
  bg: ' linear-gradient(169deg, rgba(236, 236, 236, 1) 0%, rgba(127, 134, 146, 1) 100%)',
  color: 'brand.800',
  m: '5px',
  borderWidth: '1px',
  borderColor: 'brand.700',
  borderRadius: '10px',
  overflow: "hidden", // keep child boundaries within card
  boxShadow: "md", // small shadow for 3D effect
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between"
};

const layerStyles = {
  card: {
    ...baseCardStyle,
    w: '250px',
    h: '300px',
  },
  miniCard:{
    ...baseCardStyle,
    w: '200px',
    h: '150px',
  },
  videoCard: {
    ...baseCardStyle,
    w: '425px',
    h: '550px',
  },
  voiceoverCard: {
    ...baseCardStyle,
    w: '300px',
    h: '175px',
  },
    main: {
      bg: 'brand.50',
      color: 'brand.900',
    },
    pageFrame: {
      bg: 'brand.800',
      color: 'brand.100',
      width: '100vw',
      height: '100%',
      overflowX: 'none',
      bgImage: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(215,215,215,1) 17%, rgba(181,181,181,0.7343312324929971) 67%, rgba(144,190,226,0.42620798319327735) 100%)"

    },
    subPage: {
      w: 'fill',
      h: 'fill',
      overflowX: 'none',
      background: "linear-gradient(to bottom, #b4b8be, #ececec)",
      color: 'brand.800',

    },
    navSubMenu: {
      w: "fill",
      bg: "brand.200",
      color: "brand.900",
      alignItems: "center",
            justifyContent: "space-between",
      borderWidth: '0',
      overflowX: "auto"
    }
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

const theme = extendTheme({ colors, config, components, layerStyles });

export default theme;
