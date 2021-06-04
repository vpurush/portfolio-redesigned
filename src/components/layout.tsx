import React from "react";
import { Grommet } from "grommet";
import { ThemeProvider } from "styled-components";
import { theme, StyledComponentsTheme } from "../theme";

type LayoutProps = React.PropsWithChildren<{}>;
export const Layout = (props: LayoutProps) => {
  return (
    <Grommet theme={theme}>
      <ThemeProvider theme={StyledComponentsTheme}>
        {props.children}
      </ThemeProvider>
    </Grommet>
  );
};
