import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Padding } from "styled-components-spacing";
import { Button, Card } from "grommet";
import { Layout } from "../components/layout";

export default function Home() {
  return (
    <Layout>
      <Button primary label="Click here" />
      <Card height="small" width="medium">
        <Padding all="small">Ah ha</Padding>
      </Card>
    </Layout>
  );
}
