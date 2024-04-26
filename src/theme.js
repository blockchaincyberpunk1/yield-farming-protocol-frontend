import { extendTheme } from "@chakra-ui/react";

/**
 * Define your custom theme overrides here. You can customize colors, fonts,
 * component sizes, and much more. This example includes a few custom settings
 * for demonstration.
 */
const customTheme = {
  colors: {
    brand: {
      50: "#e3fafc",
      100: "#c5f6fa",
      200: "#99e9f2",
      300: "#66d9e8",
      400: "#3bc9db",
      500: "#22b8cf",
      600: "#15aabf",
      700: "#1098ad",
      800: "#0c8599",
      900: "#0b7285",
    },
  },
  fonts: {
    heading: "Georgia, serif",
    body: "Arial, sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      sizes: {
        xl: {
          h: "56px",
          fontSize: "lg",
          px: "32px",
        },
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.700",
          },
        },
      },
    },
  },
};

// Using try-catch block to safely extend the theme
let theme;
try {
  theme = extendTheme(customTheme);
} catch (error) {
  console.error("Error extending Chakra UI theme:", error);
  // Provide a fallback theme if extension fails
  theme = extendTheme();
}

export default theme;
