export const selectedDoughnutChart = (props) => {
  const { data, container, title, width, height } = props;

  var radius = Math.min(width, height) / 2;

  var color = d3.scaleOrdinal().range(["#0277bd", "#b0bec5"]);

  var arc = d3
    .arc()
    .outerRadius(radius - 30)
    .innerRadius(radius - 50);

  var pie = d3
    .pie()
    .sort(null)
    .value(function (d) {
      return d;
    });

  var svg = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  var g = svg
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    .selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

  g.append("path")
    .attr("d", arc)
    .style("fill", function (d, i) {
      return color(d.data);
    });
  var chartTitle = svg.append("text").attr("x", 30).attr("y", 15).text(title);
  var percentageInfo = svg
    .append("text")
    .attr("text-anchor", "start")
    .attr("font-size", "18px")
    .attr("x", width / 2 - 20)
    .attr("y", height / 2 + 2)
    .text(`${data[0]}%`);
};
