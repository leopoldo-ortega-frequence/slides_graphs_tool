// imports
import { init } from "./init.js";
import { demographics, biasDemographics } from "./data/data.js";
import { selectedDoughnutChart } from "./graphs/selectedDoughnut.js";
import { generateBlu } from "./generateBlue.js";
import { generateDemographicChart } from "./generateDemographicChart.js";
import { dataBreakdown } from "./helper.js";
// DOM
const trueRandBtn = document.querySelector("#trueRandom");
const biasRandBtn = document.querySelector("#biasRandom");
const displaySelectedData = document.querySelector("#data-info");
// states
let displayCircleData = [100, 0];
let selectedData = "True Random";
let currentData = demographics;
let enabledSettings = [];
let selectedDemo, selectedOption, chartName;
let selectedChart = "doughnut";
// init required functions
init();
displaySelectedData.innerText = `The current dataset is ${selectedData.toUpperCase()}`;
// set current data based on data type selection
// handle data button selection
trueRandBtn.addEventListener("click", (e) => {
  selectedData = "True Random";
  currentData = demographics;
  displaySelectedData.innerText = `The current dataset is ${selectedData.toUpperCase()}`;
  if ($(".page").hasClass("audience")) {
    resetAudience();
  }
  if ($(".page").hasClass("demographics")) {
    updateDemographics();
  }
});
biasRandBtn.addEventListener("click", (e) => {
  selectedData = "Bias Random";
  currentData = biasDemographics;
  displaySelectedData.innerText = `The current dataset is ${selectedData.toUpperCase()}`;
  if ($(".page").hasClass("audience")) {
    resetAudience();
  }
  if ($(".page").hasClass("demographics")) {
    updateDemographics();
  }
});

// handle page render functions for Audience page
if ($(".page").hasClass("audience")) {
  updateGraphs();
  // run code only for audience page
  let checkboxes = document.querySelectorAll(
    "input[type=checkbox][name=audience-target]"
  );

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
      displayCircleData = dataBreakdown(enabledSettings, currentData);
      updateGraphs();
      // will also want to pass d3 vis here
    });
  });
}

// JS for Demographics page
if ($(".page").hasClass("demographics")) {
  document
    .getElementById("data-dropdown")
    .addEventListener("change", function (e) {
      selectedOption = e.target.value; // gets dropdown option
      updateDemographics();
    });
  document
    .getElementById("chart-dropdown")
    .addEventListener("change", function (e) {
      // only make this work if user has chosen a data type
      if (selectedOption) {
        selectedChart = e.target.value;
        generateDemographicChart({
          data: selectedDemo,
          name: chartName,
          chart: selectedChart,
        });
      }
    });
}

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
    data: currentData,
    total: displayCircleData[0],
  });
}

// Reset functions on Data button change
function resetAudience() {
  // uncheck all checkboxes
  document
    .querySelectorAll("input[type=checkbox][name=audience-target]")
    .forEach((el) => (el.checked = false));
  d3.select(".svg-audience-prev svg").remove();
  enabledSettings = [];
  // remove existing chart
  d3.select(".audience-chart-container svg").remove();
  displayCircleData = dataBreakdown(enabledSettings, currentData);
  updateGraphs();
}

function updateDemographics() {
  selectedDemo = currentData[selectedOption];
  document.getElementById("data-list").innerHTML = "";
  // append data to DOM
  selectedDemo.forEach((item) => {
    //console.log(item)
    const li = document.createElement("li");
    li.innerHTML = `<div>${item.name}: </div><div>${item.value}%</div>`;
    document.getElementById("data-list").appendChild(li);
  });
  // render a graph onto the page
  chartName =
    selectedOption.charAt(0).toUpperCase() +
    selectedOption.slice(1).replace("Data", "");
  generateDemographicChart({
    data: selectedDemo,
    name: chartName,
    chart: selectedChart,
  });
}
