import { init } from "./init.js";
import { demographics } from "./data/data.js";
import { selectedDoughnutChart } from "./graphs/selectedDoughnut.js";
import { generateBlu } from "./generateBlue.js";
// states
let displayCircleData = [100, 0];
// init required functions
init();
console.log(demographics);

if ($(".page").hasClass("audience")) {
  updateGraphs();
  // run code only for audience page
  let checkboxes = document.querySelectorAll(
    "input[type=checkbox][name=audience-target]"
  );
  let enabledSettings = [];

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      enabledSettings = Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
        .filter((i) => i.checked) // Use Array.filter to remove unchecked checkboxes.
        .map((i) => i.value); // Use Array.map to extract only the checkbox values from the array of objects.

      // here the chnages are registered
      // will need to pass functions here
      d3.select(".svg-audience-prev svg").remove();
      // remove existing chart
      d3.select(".audience-chart-container svg").remove();
      dataBreakdown(enabledSettings);
      updateGraphs();
      // will also want to pass d3 vis here
    });
  });
}

// breaks down the selected data
const dataBreakdown = (data) => {
  let totalSum = 1;
  let percentages = [];
  let activeKeys = [];
  displayCircleData = [];
  // we will use a very simple algorithm, total sum is 500
  // only add to total sum if a category is selected
  // more categoreis I select, more diverse the data
  for (let key in demographics) {
    let currentKey = key;
    for (let val of demographics[key]) {
      // compare selected data
      // set all to false for reset
      val.selected = false;
      for (let name of data) {
        if (name === val.name) {
          val.selected = true;
          if (!activeKeys.includes(currentKey)) {
            activeKeys.push(currentKey);
          }
        }
      }
    }
  }
  // at this point we have the selected info
  for (let prop of activeKeys) {
    let tempSum = 0;
    for (let val of demographics[prop]) {
      if (val.selected === true) {
        tempSum += val.value;
      }
    }
    percentages.push(tempSum);
  }
  for (let val of percentages) {
    totalSum = totalSum * (val / 100);
  }
  totalSum *= 100;
  //totalPercentage = totalSum / percentages.length;
  displayCircleData.push(totalSum.toFixed(1));
  displayCircleData.push(Math.round(100 - totalSum));
};

// handle graph generattions here
function updateGraphs() {
  selectedDoughnutChart({
    data: displayCircleData,
    container: ".svg-audience-prev",
    title: "Target Audience Size",
    width: 200,
    height: 200,
  });
  generateBlu({
    container: ".audience-chart-container",
    data: demographics,
    total: displayCircleData[0],
  });
}
