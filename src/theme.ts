import { createTheme } from "@fluentui/react";

export const colorPalette = {
  themePrimary: "#d52941",
  themeLighterAlt: "#fdf5f6",
  themeLighter: "#f8d8dd",
  themeLight: "#f3b8c0",
  themeTertiary: "#e77685",
  themeSecondary: "#db3f54",
  themeDarkAlt: "#c12539",
  themeDark: "#a31f31",
  themeDarker: "#781724",
  neutralLighterAlt: "#faf9f8",
  neutralLighter: "#f3f2f1",
  neutralLight: "#edebe9",
  neutralQuaternaryAlt: "#e1dfdd",
  neutralQuaternary: "#d0d0d0",
  neutralTertiaryAlt: "#c8c6c4",
  neutralTertiary: "#a1b4b4",
  neutralSecondary: "#869b9b",
  neutralPrimaryAlt: "#6d8383",
  neutralPrimary: "#172121",
  neutralDark: "#3f5252",
  black: "#2a3a3a",
  white: "#ffffff",
};
export const fluentUITheme = createTheme({
  palette: colorPalette,
});
export const StyledComponentsTheme = {
  spacing: {
    small: "2rem",
  },
};
