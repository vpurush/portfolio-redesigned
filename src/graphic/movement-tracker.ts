import {
  select as d3Select,
  scaleLinear,
  Selection,
  ScaleLinear,
  line,
  axisBottom,
} from "d3";
import MovementData from "./movement.json";

type Center = {
  x: number;
  y: number;
};

type D3SVG = Selection<SVGElement, unknown, null, undefined>;

type DataType = Array<Array<[number, number, string]>>;

const config = {
  circleRadius: 15,
  circleColor: "gray",
  colors: ["red", "green", "blue"],
};

// const drawLine = (width: number, center: Center, svg: D3SVG): [D3SVG, ScaleLinear<number, number>] => {

//     const minDomain = Math.min(...timelineData.map(d => d.value));
//     const maxDomain = Math.max(...timelineData.map(d => d.value));

//     console.log("max min", minDomain, maxDomain);

//     const lineScale = scaleLinear()
//         .domain([minDomain, maxDomain])
//         .range([0 + config.circleRadius, width - config.circleRadius]);

//     const l = axisBottom(lineScale)
//         .tickValues(timelineData.map(d => d.value))
//         .tick

//     svg.call(l);

//     // const line = svg.append('line')
//     //     .attr("x1", 0)
//     //     .attr('y1', center.y)
//     //     .attr('x2', width)
//     //     .attr('y2', center.y)
//     //     .attr('stroke', 'lightgray');

//     return [line, lineScale];
// };

const drawMovementPath = (
  lineScale: ScaleLinear<number, number>,
  userData: DataType[number],
  svg: D3SVG,
  color: string
) => {
  console.log("called with color", color);
  const circles = svg.selectAll(`circle.color-${color}`).data(userData);

  circles.exit().remove();

  console.log("cirlces", circles, lineScale.domain());

  const allCircles = circles.enter().append("circle");
  allCircles
    .attr("cx", d => {
      return lineScale(d[0]);
    })
    .attr("cy", d => {
      return lineScale(d[1]);
    })
    .attr("r", config.circleRadius)
    .style("fill", color)
    .style("fill-opacity", (d, i) => {
      return (i + 1) / userData.length;
    });

  const lines = svg.selectAll(`line.color-${color}`).data(userData.slice(1));

  lines.exit().remove();

  const allLines = lines.enter().append("line");

  allLines
    .attr("x1", (d, i) => {
      return lineScale(userData[i][0]);
    })
    .attr("y1", (d, i) => {
      return lineScale(userData[i][1]);
    })
    .attr("x2", (d, i) => {
      return lineScale(d[0]);
    })
    .attr("y2", (d, i) => {
      return lineScale(d[1]);
    })
    .style("stroke", color)
    .style("stroke-opacity", 0.5);
};

const createScale = (data: DataType, width: number) => {
  const allLocationValues = data.reduce(
    (prev, user) => [
      ...prev,
      ...user.reduce(
        (prev, location) => [...prev, location[0], location[1]],
        []
      ),
    ],
    []
  );
  const minDomain = Math.min(...allLocationValues);
  const maxDomain = Math.max(...allLocationValues);
  return scaleLinear()
    .domain([minDomain, maxDomain])
    .range([0 + config.circleRadius, width - config.circleRadius]);
};

export const createSVG = (node: HTMLDivElement) => {
  node.childNodes.forEach(child => child.remove());

  const height = node.offsetHeight;
  const width = node.offsetWidth;

  const center: Center = {
    x: Math.ceil(width / 2),
    y: Math.ceil(height / 2),
  };

  // console.log("height", center, height, width);

  var svg = d3Select(node)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const scale = createScale(MovementData as any, width);

  MovementData.forEach((user, i) =>
    drawMovementPath(
      scale,
      user as any,
      svg,
      config.colors[i % config.colors.length]
    )
  );

  // svg.append('text')
  //     .attr('x', 100)
  //     .attr('y', 100)
  //     .attr('color', 'green')
  //     .text('test');

  console.log("here");
};

export default createSVG;
