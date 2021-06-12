import React from "react";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as FluentThemeProvider } from "@fluentui/react";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { fluentUITheme, StyledComponentsTheme } from "../theme";

initializeIcons();
type LayoutProps = React.PropsWithChildren<{}>;
export const Layout = (props: LayoutProps) => {
  return (
    <FluentThemeProvider theme={fluentUITheme}>
      <ThemeProvider theme={StyledComponentsTheme}>
        {props.children}
      </ThemeProvider>
    </FluentThemeProvider>
  );
};
