import React, { useEffect, useRef } from "react";
import { Link, graphql } from "gatsby";
import { Layout } from "../components/layout";
import styled from "styled-components";
import { createMHCharacterMapSVG } from "../graphic/mh-character-map";

const CharacterMapCanvas = styled.div`
  height: 100vh;
  width: 100%;
`;

const MHCharacterMap = ({ pathContext: { data } }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef && divRef.current) {
      createMHCharacterMapSVG(divRef.current);
    }
  }, [divRef.current]);

  return (
    <Layout>
      <CharacterMapCanvas ref={divRef}>
        {JSON.stringify(data)}
      </CharacterMapCanvas>
    </Layout>
  );
};

export default MHCharacterMap;
