export const treeMapChart = (props) => {
  const { selector, data, name, fillColor, graphWidth, graphHeight, title } =
    props;
  data.unshift({
    name: name,
    parent: null,
    value: null,
  });
  const treemapG = selector
    .append("g")
    .attr("class", "treemapG")
    .attr("transform", `translate(15,10)`);
  // title for the chart
  treemapG
    .append("text")
    .attr("font-size", "1.4rem")
    .attr("fill", fillColor)
    .text(title);

  const treeGraphG = treemapG
    .append("g")
    .attr("class", "treemapG")
    .attr("transform", `translate(0, 30)`);

  // redners the treemap graph
  const render = () => {
    // stratify the data: reformatting for d3.js
    const root = d3
      .stratify()
      .id(function (d) {
        return d.name;
      }) // Name of the entity (column name is name in csv)
      .parentId(function (d) {
        return d.group;
      })(
      // Name of the parent (column name is parent in csv)
      data
    );
    root.sum(function (d) {
      return +d.value;
    }); // Compute the numeric value for each entity

    // Then d3.treemap computes the position of each element of the hierarchy
    // The coordinates are added to the root object above
    d3.treemap().size([graphWidth, graphHeight]).padding(4)(root);

    // use this information to add rectangles:
    treeGraphG
      .selectAll("rect")
      .data(root.leaves())
      .join("rect")
      .attr("x", function (d) {
        return d.x0;
      })
      .attr("y", function (d) {
        return d.y0;
      })
      .attr("width", function (d) {
        return d.x1 - d.x0;
      })
      .attr("height", function (d) {
        return d.y1 - d.y0;
      })
      .style("stroke", "black")
      .attr("fill", fillColor);

    // and to add the text labels
    treeGraphG
      .selectAll("text")
      .data(root.leaves())
      .join("text")
      .attr("x", function (d) {
        return d.x0 + 5;
      }) // +10 to adjust position (more right)
      .attr("y", function (d) {
        return d.y0 + 15;
      }) // +20 to adjust position (lower)
      .text(function (d) {
        return d.data.name;
      })
      .attr("font-size", "12px")
      .attr("fill", "white");

    data.shift();
  };

  render();
};
