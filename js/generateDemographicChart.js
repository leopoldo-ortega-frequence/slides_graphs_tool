// this file will handle the charts for the demgraphic page
import { DoughnutLegend } from "./graphs/dougnutLegend.js";
import { gridPlot } from "./graphs/gridPlot.js";
import { treeMapChart } from "./graphs/treeMap.js";
import { barChart } from "./graphs/barChart.js";
import { circleGrid } from "./graphs/circleGrid.js";
export const generateDemographicChart = (props) => {
  const WIDTH = 1200,
    HEIGHT = 500;
  const dataNames = [
    "Gender",
    "Comp",
    "Age",
    "Income",
    "Education",
    "Parent",
    "Device",
  ];
  const colors = [
    "#1565c0",
    "#303f9f",
    "#c62828",
    "#00838f",
    "#00695c",
    "#4caf50",
    "#827717",
  ];
  const { data, name, chart } = props;
  d3.select(".demographics-svg-container svg").remove();
  const svg = d3
    .select(".demographics-svg-container")
    .append("svg")
    .attr("width", 1200)
    .attr("height", 500)
    .append("g")
    .attr("class", "demographic-container-g")
    .attr("transform", `translate(${WIDTH / 5}, 50)`);
  // in future projects, may want to stick only Class or Functional charts to allow for easier rendering
  if (chart === "doughnut") {
    var render = new DoughnutLegend({
      selector: svg,
      data: data,
      title: name,
      width: 400,
      height: 300,
      fillColor: colors[dataNames.indexOf(name)],
    });
  } else if (chart === "grid") {
    gridPlot({
      selector: svg,
      data: data,
      title: `${name} Chart`,
      xProp: "name",
      yProp: "value",
      fillColor: colors[dataNames.indexOf(name)],
    });
  } else if (chart === "treegraph") {
    data.forEach((d) => {
      d.group = name;
    });
    treeMapChart({
      selector: svg,
      data: data,
      name: name,
      graphWidth: 390,
      graphHeight: 200,
      fillColor: colors[dataNames.indexOf(name)],
      title: `${name} Tree Chart`,
    });
  } else if (chart === "bar") {
    barChart({
      selector: svg,
      data: data,
      width: 370,
      height: 200,
      fillColor: colors[dataNames.indexOf(name)],
      title: `${name} Range`,
      xProp: "value",
      yProp: "name",
    });
  } else if (chart === "circle") {
    circleGrid({
      selector: svg,
      data: data,
      width: 220,
      height: 220,
      fillColor: colors[dataNames.indexOf(name)],
      title: `${name} Composition`,
      xProp: "name",
      yProp: "value",
    });
  }
};
