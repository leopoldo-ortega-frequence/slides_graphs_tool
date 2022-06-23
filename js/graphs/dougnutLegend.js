export class DoughnutLegend {
  constructor(props) {
    this.selector = props.selector;
    this.data = props.data;
    this.width = props.width;
    this.height = props.height;
    this.title = props.title;
    this.fillColor = props.fillColor;

    this.init();
  }
  // initalizes the framework for the graph, all static elements go here
  init() {
    this.radius = Math.min(this.width, this.height) / 2.8;
    this.color = d3.scaleOrdinal(d3.schemeCategory10);
    this.arc = d3
      .arc()
      .outerRadius(this.radius - 25) // chops offf outer circle
      .innerRadius(this.radius - 50); // chops off innrer circle, use this to convert pie chart to donut

    this.pie = d3
      .pie()
      .sort(null)
      .value((d) => d.value);

    this.selector
      .append("text")
      .text(`${this.title} Chart`)
      .attr("y", 30)
      .attr("x", 10)
      .attr("fill", this.fillColor)
      .attr("font-size", "1.7rem");

    this.graphG = this.selector
      .append("g")
      .attr("transform", "translate(" + 100 + "," + this.height / 2 + ")");

    //   this.graphG
    //     .append("image")
    //     .attr(
    //       "xlink:href",
    //       "https://s3.amazonaws.com/brandcdn-assets/partners/frequence/proposal-v2/img/icon-devices.png"
    //     )
    //     .attr("x", -36)
    //     .attr("y", -30);

    this.legendG = this.graphG
      .append("g")
      .attr("transform", `translate(${110}, ${-60})`);

    // call data update
    this.updateData(this.data);
  }

  updateData(newData) {
    this.updateVis(newData);
    this.updateLegend(newData);
  }

  updateVis(newData) {
    const vis = this; // need this to avoid scoping issues when calling methods

    this.t = d3.transition().duration(750);

    this.path = this.graphG.selectAll("path").data(this.pie(newData));

    this.path.transition(this.t).attrTween("d", arcTween);
    this.path
      .enter()
      .append("path")
      .attr("fill", (d) => `${this.color(d.data.name)}`)
      .transition(this.t)
      .attrTween("d", arcTween);
    function arcTween(d) {
      const i = d3.interpolate(this._current, d);
      this._current = i(1);
      return (t) => vis.arc(i(t));
    }
  }

  updateLegend(newData) {
    // set the data here
    this.legendRow = this.legendG
      .selectAll(".legend-data")
      .data(newData, (d) => d.name);

    // // this enters() the data, therefore it is the parent container for where changes need to take place
    this.enterLegend = this.legendRow
      .enter()
      .append("g")
      .attr("class", "legend-data")
      .attr("transform", (d, i) => {
        if (i % 2 === 0) {
          return `translate(0, ${i % 2 === 0 ? i * 20 : i * 20 - 20})`;
        } else {
          return `translate(250, ${i % 2 === 0 ? i * 20 : i * 20 - 20})`;
        }
      })
      .merge(this.legendRow);

    this.enterRect = this.enterLegend
      .append("rect")
      .attr("width", 30)
      .attr("height", 30)
      .attr("fill", (d) => `${this.color(d.name)}`);

    this.enterText = this.enterLegend
      .append("text")
      .attr("class", "legend-data")
      .attr("x", 40)
      .attr("y", 20)
      .attr("text-anchor", "start")
      .text((d) => {
        return `${d.name} - ${d.value}%`;
      });

    this.exitText = this.legendRow.exit().remove();
  }
}
