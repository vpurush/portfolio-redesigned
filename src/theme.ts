import { ThemeType, generate } from "grommet";

export const theme: ThemeType = {
  global: {
    colors: {
      brand: "#2596be",
    },
    font: {
      family: "'Roboto', sans-serif;",
    },
  },
  button: {
    border: {
      radius: "8px",
    },
  },
  card: {
    container: {
      round: "xsmall",
    },
  },
};

const defaultGrommetTheme = generate();
export const StyledComponentsTheme = {
  spacing: { ...defaultGrommetTheme.global.edgeSize },
};

console.log("StyledComponentsTheme", StyledComponentsTheme);
