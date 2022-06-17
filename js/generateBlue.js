import { targetCircleChart } from "./graphs/targetCircleChart.js";
import { regionalInsightCircle } from "./graphs/regionalInsightCircle.js";
// this will hold the two seperate charts from f4 vis
export const generateBlu = (props) => {
  const targetCircleWidth = 640;
  let keyNames = [];
  let trackHeight = 0;
  const { container, data, width, height, total } = props;
  // append svg to main container
  const svg = d3
    .select(".audience-chart-container")
    .append("svg")
    .attr("width", 1200)
    .attr("height", 900);
  const regionalAreaContainer = svg
    .append("g")
    .attr("class", "regional-chart-container")
    .attr("transform", `translate(${targetCircleWidth + 50}, 30)`);
  //console.log(data);
  // modify data to make chart friendly
  let targetCircleData = [];
  for (let key in data) {
    // will use this to get index os object hack
    keyNames.push(key);
    let currentKey = key;
    let tempObj = {};
    let selected = [];
    let sum = 0;
    for (let val of data[key]) {
      if (val.selected === true) {
        sum += val.value;
        selected.push(val.name);
      }
    }
    if (sum !== 0) {
      tempObj["name"] = key;
      tempObj["value"] = [sum, 100 - sum];
      if (data[key].length === selected.length) {
        tempObj["selected"] = "All";
      } else {
        tempObj["selected"] = selected;
      }
    } else {
      tempObj["name"] = key;
      tempObj["value"] = [100, 0];
      tempObj["selected"] = "All";
    }
    //sum !== 0 ? (tempObj[key] = sum) : (tempObj[key] = 100);
    if (tempObj.name !== "deviceData" && tempObj.name !== "compData") {
      targetCircleData.push(tempObj);
    }
  }

  // render target circle here
  targetCircleChart({
    container: svg,
    data: targetCircleData,
    width: targetCircleWidth,
    height: 660,
    total: total,
  });

  // APPEND REGIONAL INSIGHT SECTION HERE
  regionalAreaContainer
    .append("text")
    .attr("x", 200)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .attr("font-size", "1.4rem")
    .attr("fill", "#fe9f31")
    .text("Regional Insights");
  const color = d3
    .scaleOrdinal()
    .range(["#ffbb52", "#4a4a4a", "#45bcfe", "#fe9f31", "#609eeb"]);
  // will want to loop here to make actual chart modular
  keyNames.forEach((name, i) => {
    if (i !== 0) {
      trackHeight += data[keyNames[i - 1]].length;
    }

    regionalInsightCircle({
      container: regionalAreaContainer,
      data: data[name],
      idx: i,
      width: targetCircleWidth, // using the same value as the target circle to help with x-offset
      height: trackHeight,
      xOffset: 30,
      yOffset: 60,
      circlesPerLine: 10,
      color: color(i),
    });
  });
};
