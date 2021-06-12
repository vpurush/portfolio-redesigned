import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Padding } from "styled-components-spacing";
import { Layout } from "../components/layout";
import { PrimaryButton } from "@fluentui/react";

export default function Home() {
  return (
    <Layout>
      <PrimaryButton>Click here</PrimaryButton>
      <Padding all="small">Ah ha</Padding>
    </Layout>
  );
}
