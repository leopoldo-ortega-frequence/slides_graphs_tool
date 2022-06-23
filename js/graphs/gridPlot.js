export const gridPlot = (props) => {
  // props --> do this to make graph more modular
  const { selector, data, title, xProp, yProp } = props;
  const sqauresPerRow = 10;
  const numRows = 10;
  const squareSize = 23;

  function warpData(data) {
    let total = 1;
    let nodes = [];
    for (let val of data) {
      for (let i = 0; i < val.value; i++) {
        nodes.push({
          name: val.name,
          value: total,
        });
        total++;
      }
    }
    return nodes;
  }

  const squareData = warpData(data);
  // sort the data from largest to smallest

  //scales
  const colorScale = d3.scaleOrdinal(d3.schemeTableau10);

  const graphG = selector.append("g").attr("transform", "translate(0,30)");
  const legendG = selector.append("g").attr("transform", "translate(280,50)");

  // appends sqaures
  graphG
    .selectAll("rect")
    .data(squareData)
    .enter()
    .append("rect")
    .attr("x", (d, i) => {
      if (i > 9) {
        const numToString = String(i).split("")[1];
        return Number(numToString) * 25;
      } else {
        return i * 25;
      }
    })
    .attr("y", (d, i) => {
      if (i > 9) {
        const numToString = String(i).split("")[0];
        return Number(numToString) * 25;
      } else {
        return 0;
      }
    })
    .attr("height", squareSize)
    .attr("width", squareSize)
    .attr("class", (d, i) => i)
    .attr("fill", (d) => colorScale(d.name));

  // legend that displays data
  const legendEnter = legendG
    .selectAll(".legend-data")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "legend-info")
    .attr("transform", (d, i) => {
      if (i % 2 === 0) {
        return `translate(0, ${i % 2 === 0 ? i * 25 : i * 25 - 25})`;
      } else {
        return `translate(250, ${i % 2 === 0 ? i * 25 : i * 25 - 25})`;
      }
    });
  legendEnter
    .append("text")
    .attr("font-size", "14px")
    .attr("fill", (d, i) => colorScale(d.name))
    .text((d) => d[yProp] + "%");
  legendEnter
    .append("text")
    .attr("font-size", "14px")
    .attr("fill", (d, i) => colorScale(d.name))
    .attr("y", 15)
    .text((d) => d[xProp]);
  selector
    .append("text")
    .attr("class", "title fill-primary")
    .attr("font-size", "1.7rem")
    .attr("y", 10)
    .text(title);
};
