import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import "../styles/globals.css";

const colors = {
  primary: "#1a365d",
  secondary: "#153e75",
  black: "#222222",
  white: "#fefefe",
};
const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
