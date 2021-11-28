import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: {
    "html, body": {
      bg: "black",
    },
  },
};

const theme = extendTheme({
  config,
  styles,
  fonts: {
    heading: "Inter",
    body: "monospace",
  },
});
export default theme;
