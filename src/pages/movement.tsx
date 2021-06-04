import React, { useEffect, useRef } from "react";
// import rd3 from 'react-d3-library';
// import createSVG from "../graphic/sample";
import { createSVG as createMovementGraph } from "../graphic/movement-tracker";
import { Test } from "../components/test";
import styled from "styled-components";
// const RD3Component = rd3.Component;

const Canvas = styled.div`
  height: 300px;
  width: 100%;
`;

const MovementCanvas = styled.div`
  height: 500px;
  width: 500px;
`;

export default function Home() {
  const divRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (divRef && divRef.current) {
  //     createSVG(divRef.current);
  //   }
  // }, [divRef.current])

  useEffect(() => {
    if (divRef && divRef.current) {
      createMovementGraph(divRef.current);
    }
  }, [divRef.current]);
  return (
    <>
      <MovementCanvas ref={divRef}>Home</MovementCanvas>
      <Test></Test>
    </>
  );
  // return <RD3Component data={sampleNode}></RD3Component>
}
