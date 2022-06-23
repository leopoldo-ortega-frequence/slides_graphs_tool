// This file is to provide util functions

// show the total audience target percentage information
export const dataBreakdown = (data, rawData) => {
  let totalSum = 1;
  let percentages = [];
  let activeKeys = [];
  let tempDisplayCircleData = [];
  // we will use a very simple algorithm, total sum is 500
  // only add to total sum if a category is selected
  // more categoreis I select, more diverse the data
  for (let key in rawData) {
    let currentKey = key;
    for (let val of rawData[key]) {
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
    for (let val of rawData[prop]) {
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
  tempDisplayCircleData.push(totalSum.toFixed(1));
  tempDisplayCircleData.push(Math.round(100 - totalSum));
  return tempDisplayCircleData;
};
