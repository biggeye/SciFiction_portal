import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
  colors: {
      brand: {
      black: '#070708ff',
      onyx: '#454545ff',
      pear: '#D2DC28ff',
      yellow_green: '#A9C83Cff',
      silver: '#C3C2C3ff',
      seasalt: '#F6F6F6ff',
    },
  },
}


// 3. extend the theme
const theme = extendTheme({ config })

export default theme