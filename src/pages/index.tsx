import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Padding } from "styled-components-spacing";
import { Layout } from "../components/layout";
import { PrimaryButton } from "@fluentui/react";
import { FontIcon } from "@fluentui/react/lib/Icon";

const StyledFontIcon = styled(FontIcon)`
  font-size: 5rem;
`;

const CenterScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

export default function Home() {
  return (
    <Layout>
      <CenterScreen>
        <StyledFontIcon iconName="Repair" />
        <Padding top="small">This website is under development</Padding>
      </CenterScreen>
    </Layout>
  );
}
