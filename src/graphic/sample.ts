import {
  select as d3Select,
  scaleLinear,
  Selection,
  ScaleLinear,
  line,
  axisBottom,
} from "d3"
import timelineData from "./timeline.json"

type Center = {
  x: number
  y: number
}

type D3SVG = Selection<SVGElement, unknown, null, undefined>

const config = {
  circleRadius: 15,
  circleColor: "gray",
}

const drawLine = (
  width: number,
  center: Center,
  svg: D3SVG
): [D3SVG, ScaleLinear<number, number>] => {
  const minDomain = Math.min(...timelineData.map(d => d.value))
  const maxDomain = Math.max(...timelineData.map(d => d.value))

  console.log("max min", minDomain, maxDomain)

  const lineScale = scaleLinear()
    .domain([minDomain, maxDomain])
    .range([0 + config.circleRadius, width - config.circleRadius])

  const l = axisBottom(lineScale).tickValues(timelineData.map(d => d.value))
  // .tick

  svg.call(l)

  // const line = svg.append('line')
  //     .attr("x1", 0)
  //     .attr('y1', center.y)
  //     .attr('x2', width)
  //     .attr('y2', center.y)
  //     .attr('stroke', 'lightgray');

  //   return [line, lineScale]
}

const drawMilestones = (
  lineScale: ScaleLinear<number, number>,
  center: Center,
  svg: D3SVG
) => {
  const circles = svg.selectAll("circle").data(timelineData)

  circles.exit().remove()

  console.log("cirlces", circles)

  const allCircles = circles.enter().append("circle")
  allCircles
    .attr("cx", d => {
      console.log("d", d, lineScale(d.value))
      return lineScale(d.value)
    })
    .attr("cy", center.y)
    .attr("r", config.circleRadius)
    .style("fill", config.circleColor)
}

const createSVG = (node: HTMLDivElement) => {
  node.childNodes.forEach(child => child.remove())

  const height = node.offsetHeight
  const width = node.offsetWidth

  const center: Center = {
    x: Math.ceil(width / 2),
    y: Math.ceil(height / 2),
  }

  // console.log("height", center, height, width);

  var svg = d3Select(node)
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  const [, lineScale] = drawLine(width, center, svg)

  drawMilestones(lineScale, center, svg)

  // svg.append('text')
  //     .attr('x', 100)
  //     .attr('y', 100)
  //     .attr('color', 'green')
  //     .text('test');

  console.log("here")
}

export default createSVG
