export const regionalInsightCircle = (props) => {
  const {
    container,
    data,
    xOffset,
    yOffset,
    width,
    idx,
    height,
    circlesPerLine,
    color,
  } = props;
  console.log(data);

  console.log(height);
  const regionalG = container
    .append("g")
    .attr("class", `regional-insight-group-${idx}`)
    .attr("transform", `translate(${xOffset}, ${height * 25 + yOffset})`)
    .selectAll(".region-data")
    .data(data)
    .enter();

  const gEnter = regionalG.append("g");
  const graphLine = gEnter.attr(
    "transform",
    (d, i) => `translate(0,${i * 20})`
  );
  graphLine
    .append("text")
    .attr("transform", `translate(290,5)`)
    .attr("font-size", "12px")
    .text((d) => d.name);
  for (let x = 0; x < circlesPerLine; x++) {
    const radius = 8;
    graphLine
      .append("circle")
      .attr("cx", 80 + x * radius * 2.6)
      .attr("r", radius)
      .attr("fill", function (d) {
        if (x === 0) {
          return color;
        }
        if (Math.round(d.value / 10) > x) {
          return color;
        } else {
          return "#dbdbdb";
        }
      });
  }
};
