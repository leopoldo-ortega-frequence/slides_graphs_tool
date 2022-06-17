export const targetCircleChart = (props) => {
  const colorArr = ["#ffbb52", "#4a4a4a", "#45bcfe", "#fe9f31", "#609eeb"];
  const { container, data, width, height, total } = props;
  let parentRadius = Math.min(width, height) / 2.8;
  //console.log(data);
  const color = d3.scaleOrdinal().range(colorArr);

  const circleContainerG = container
    .append("g")
    .attr("class", "circle-container-G")
    .attr("transform", `translate(${width / 2.5},${height / 2.5})`);
  const legendContainerG = container
    .append("g")
    .attr("class", "legend-container-G")
    .attr("transform", `translate(${70},${height - 120})`);
  // draws the graph onto the screen
  data.map((d, i) => {
    ///////////////////////////////
    ////////// MAY BE BETTER TO CONVERT THIS BLOCK AS A MODULAR GRAPH /////
    //////////////////////////
    const circleG = circleContainerG.append("g");
    circleG.attr("transform", `translate(${i},${i})`);
    //console.log(d);

    const pie = d3.pie().sort(null);

    const radius = parentRadius - i * 30;
    const arc = d3
      .arc()
      .outerRadius(radius) // chops offf outer circle
      .innerRadius(radius - 15); // chops off innrer circle, use this to convert pie chart to donut

    const arcs = circleG
      .selectAll("arc")
      .data(pie(d.value))
      .enter()
      .append("g")
      .attr("class", `arc`);

    arcs
      .append("path")
      .style("fill", function (d) {
        return d.index === 0 ? color(i) : "#dbdbdb";
      })
      .attr("d", arc)
      .attr("stroke-width", 6);
  });

  //append center text with percentage
  circleContainerG
    .append("text")
    .attr("text-anchor", "middle")
    .attr("y", -12)
    .attr("fill", colorArr[4])
    .attr("font-size", "18px")
    .text(`Targeting ${total}%`);
  circleContainerG
    .append("text")
    .attr("text-anchor", "middle")
    .attr("y", 12)
    .attr("fill", colorArr[4])
    .attr("font-size", "18px")
    .text(`Of total population`);

  // generate legend here
  const legend = legendContainerG
    .selectAll(".insight-data")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "insight-data");

  legend
    .append("text")
    .attr("x", (d, i) => (i % 2 === 0 ? 0 : 320))
    .attr("y", function (d, i) {
      if (i < 2) {
        return 0;
      } else if (i < 4) {
        return 50;
      } else {
        return 100;
      }
    })
    .attr("font-size", "12px")
    .attr("fill", (d, i) => color(i))
    .text(
      (d) =>
        `${d.name.replace("Data", "").toUpperCase()}: ${
          d.value[0]
        }% OF POPULATION`
    );
  legend
    .append("text")
    .attr("x", (d, i) => (i % 2 === 0 ? 0 : 320))
    .attr("y", function (d, i) {
      if (i < 2) {
        return 20;
      } else if (i < 4) {
        return 70;
      } else {
        return 120;
      }
    })
    .attr("fill", "#4a4a4a")
    .text((d) => d.selected);
  legend
    .append("circle")
    .attr("cx", (d, i) => (i % 2 === 0 ? -25 : 290))
    .attr("cy", function (d, i) {
      if (i < 2) {
        return 0;
      } else if (i < 4) {
        return 50;
      } else {
        return 100;
      }
    })
    .attr("font-size", "12px")
    .attr("r", 12)
    .attr("fill", (d, i) => color(i));
};
