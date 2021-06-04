import {
  select as d3Select,
  scaleLinear,
  Selection,
  ScaleLinear,
  line,
  axisBottom,
  path,
} from "d3";
import MHCharacterMap from "../templates/mh-character-map";
import mhCharacterData from "./mh-character.json";

type Center = {
  x: number;
  y: number;
};

type D3SVG = Selection<SVGElement, unknown, null, undefined>;

type DataType = Array<Array<[number, number, string]>>;

const config = {
  circleRadius: 15,
  distanceBetweenCircles: 150,
  circleColor: "gray",
  colors: ["red", "green", "blue"],
};

const getData = (): typeof mhCharacterData => {
  const sortedCharacters = mhCharacterData.characters.sort((c1, c2) => {
    const noOfC1Relationships = mhCharacterData.relationships.filter(
      r => r.fromCharacter === c1.name || r.toCharacter === c1.name
    ).length;
    const noOfC2Relationships = mhCharacterData.relationships.filter(
      r => r.fromCharacter === c2.name || r.toCharacter === c2.name
    ).length;

    return noOfC2Relationships - noOfC1Relationships;
  });

  return {
    characters: sortedCharacters,
    relationships: mhCharacterData.relationships,
  };
};

const draw = (
  data: typeof mhCharacterData,
  svg: D3SVG,
  center: Center,
  aspectRatio: number
) => {
  //   <path
  //     d="
  //       M (CX - R), CY
  //       a R,R 0 1,0 (R * 2),0
  //       a R,R 0 1,0 -(R * 2),0
  //     "
  //    />
  console.log("aspectRatio", aspectRatio);
  const alignmentPath = svg
    .append("path")
    .attr("d", () => {
      const r = config.distanceBetweenCircles;
      return `M ${center.x - r * aspectRatio}, ${center.y} a ${
        r * aspectRatio
      },${r} 0 1,1 ${r * aspectRatio * 2},0  a ${r * aspectRatio},${r} 0 1,1 -${
        r * aspectRatio * 2
      },0`;
    })
    .attr("stroke", "green")
    .attr("fill", "transparent");

  // const circles = svg.selectAll(`circle`).data(data.characters.slice(0, 7));

  // circles.exit().remove();

  // const allCircles = circles.enter().append("circle");

  // console.log("total length", alignmentPath.node().getTotalLength());

  // allCircles
  //   .attr("cx", (d, i) => {
  //     if (i == 0) {
  //       return center.x;
  //     } else {
  //       const path = alignmentPath.node();
  //       const totalLength = path.getTotalLength();
  //       const noOfDataPointsPathCanFit = Math.floor(
  //         totalLength / config.distanceBetweenCircles
  //       );
  //       return path.getPointAtLength(
  //         (i - 1) * Math.round(totalLength / noOfDataPointsPathCanFit)
  //       ).x;
  //       // return center.x + config.distanceBetweenCircles;
  //     }
  //   })
  //   .attr("cy", (d, i) => {
  //     if (i == 0) {
  //       return center.y;
  //     } else {
  //       const path = alignmentPath.node();
  //       const totalLength = path.getTotalLength();
  //       const noOfDataPointsPathCanFit = Math.floor(
  //         totalLength / config.distanceBetweenCircles
  //       );
  //       return path.getPointAtLength(
  //         (i - 1) * Math.round(totalLength / noOfDataPointsPathCanFit)
  //       ).y;
  //     }
  //   })
  //   .attr("r", config.circleRadius)
  //   .style("stroke", "grey")
  //   .style("fill", "transparent");

  const texts = svg.selectAll(`text`).data(data.characters);

  texts.exit().remove();

  const allTexts = texts.enter().append("text");

  console.log("total length", alignmentPath.node().getTotalLength());

  allTexts
    .attr("x", (d, i) => {
      if (i == 0) {
        return center.x;
      } else {
        const path = alignmentPath.node();
        const totalLength = path.getTotalLength();
        const noOfDataPointsPathCanFit = Math.floor(
          totalLength / config.distanceBetweenCircles
        );
        return path.getPointAtLength(
          (i - 1) * Math.round(totalLength / noOfDataPointsPathCanFit)
        ).x;
        // return center.x + config.distanceBetweenCircles;
      }
    })
    .attr("y", (d, i) => {
      if (i == 0) {
        return center.y;
      } else {
        const path = alignmentPath.node();
        const totalLength = path.getTotalLength();
        const noOfDataPointsPathCanFit = Math.floor(
          totalLength / config.distanceBetweenCircles
        );
        return path.getPointAtLength(
          (i - 1) * Math.round(totalLength / noOfDataPointsPathCanFit)
        ).y;
      }
    })
    .attr("class", "character")
    .attr("style", "text-anchor: middle;")
    .html(d => d.name);
};

export const createMHCharacterMapSVG = (node: HTMLDivElement) => {
  node.childNodes.forEach(child => child.remove());

  const height = node.offsetHeight;
  const width = node.offsetWidth;

  console.log("height, width", height, width);

  const center: Center = {
    x: Math.ceil(width / 2),
    y: Math.ceil(height / 2),
  };

  const aspectRatio = width / height;

  var svg = d3Select(node)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const data = getData();

  draw(data, (svg as unknown) as D3SVG, center, aspectRatio);

  console.log("here");
};
