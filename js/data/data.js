// generate random data for regional demographics
// will need Gender, Age, Househole Income, children info, and ethnicity
// will be used for audience targeting
function randombetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generate(max, numCount, keys) {
  let shuffled = keys
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  var r = [];
  const newData = [];
  var currsum = 0;
  for (var i = 0; i < numCount - 1; i++) {
    r[i] = randombetween(1, max - (numCount - i - 1) - currsum);
    currsum += r[i];
  }
  r[numCount - 1] = max - currsum;

  for (let i = 0; i < shuffled.length; i++) {
    let newObj = {};
    newObj["name"] = shuffled[i];
    newObj["value"] = r[i];
    newObj["selected"] = false;
    newData.push(newObj);
  }
  return newData;
}

const generateDemographics = () => {
  const genderData = generate(100, 2, ["male", "female"]);
  const deviceData = generate(100, 3, ["desktop", "smart phone", "tablet"]);
  const parentData = generate(100, 2, ["No Kids", "Has Kids"]);
  const incomeData = generate(100, 4, [
    "0-50k",
    "50k-100k",
    "100k-150k",
    "150k+",
  ]);
  const ageData = generate(100, 7, [
    "under 18",
    "18-24",
    "25-34",
    "35-44",
    "45-54",
    "55-64",
    "65+",
  ]);
  const educationData = generate(100, 3, [
    "No College",
    "College",
    "Grad School",
  ]);
  const compData = generate(100, 5, [
    "African Americans",
    "Asians",
    "Caucasians",
    "Others",
    "Hispanics",
  ]);
  return {
    genderData,
    deviceData,
    incomeData,
    ageData,
    compData,
    educationData,
    parentData,
  };
};

export const demographics = generateDemographics();
