import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
};

const fonts = {
  fontHeading: `'iran yekan extra', sans-serif`,
  fontBold: `'iran yekan bold', sans-serif`,
  fontBody: `'iran yekan normal', sans-serif`,
};

const theme = extendTheme({
  config,
  colors: {
    "brand-secondary": "#C2F7FA",
    "brand-primary": "#208D8E",
  },
  fonts,
});

export default theme;
