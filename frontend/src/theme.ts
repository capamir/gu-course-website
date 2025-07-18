import { extendTheme } from "@chakra-ui/react";

const fonts = {
  fontHeading: `'iran yekan extra', sans-serif`,
  fontBold: `iransans_bold, sans-serif`,
  fontBody: `iransans_regular, sans-serif`,
  fontLight: `iransans_light, sans-serif`,
  fontNum: `iransans_num, sans-serif`,
};

const borderRadius = {
  radii: {
    none: "0",
    sm: "0.125rem",
    base: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
};

const theme = extendTheme({
  colors: {
    "brand-secondary": "#C2F7FA",
    "brand-primary": "#208D8E",
  },
  fonts,
  ...borderRadius,
});

export default theme;
