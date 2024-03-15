// Component - iqChart
const iqCharts = ETemplate.querySelectorAll(".chart-iq");
if (iqCharts) {
  const ETurnOnLights = (index, paths) => {
    //turning light function
    for (let i = paths.length - 1; i >= index; i--) {
      paths[i].setAttribute("fill-opacity", "1");
    }
  };
  iqCharts &&
    iqCharts.forEach((chart) => {
      const chartSVG = chart.querySelector("svg");
      let dataScore = chart.dataset.score.replace("%", "");
      dataScore = Number(dataScore);
      const SVGPaths = chartSVG.querySelectorAll("path");
      ETurnOnLights(10 - Math.ceil(dataScore / 10), SVGPaths);
    });
}

// sec_12

const characterDivs = ETemplate.querySelectorAll(".characters");
let activeCharacter_i = Array(Number(characterDivs.length)).fill(1);
characterDivs.forEach((character_div, j) => {
  const characterItems = character_div.querySelectorAll(" .pics > .item");
  const dotContaierForCharacters = character_div.querySelector("  .dots");
  const pics = character_div.querySelector(".pics");
  createButtons(characterItems, dotContaierForCharacters, pics);
  character_div.querySelectorAll(" .dots > .dot")[1].classList.add("active");

  activeChararacter(characterItems);

  setInterval(() => characterSlider(activeCharacter_i[j], characterItems, pics, dotContaierForCharacters, j), 3000);
});

function createButtons(section, dotContainer, pics) {
  section.forEach((item, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.onclick = function () {
      showCharacters(section, i, pics, dotContainer);
    };
    item.onclick = function () {
      showCharacters(section, i, pics, dotContainer);
    };
    dotContainer.appendChild(dot);
  });
}

function activeChararacter(items) {
  items.forEach((item) => {
    if (item.classList.contains("d-none")) {
      item.classList.remove("d-none");
    }
  });
  items.forEach((item, i) => {
    if (document.documentElement.scrollWidth > 768) {
      if (i > 3) {
        item.classList.add("d-none");
      }
    } else {
      if (i > 1) {
        item.classList.add("d-none");
      }
    }
  });
}

function showCharacters(characterItems, index, pics, dot, j) {
  activeCharacter_i[j] = index;
  const newItems = rearrange(characterItems, index);
  pics.innerHTML = "";
  newItems.forEach((item) => {
    pics.appendChild(item);
  });

  activeChararacter(newItems);

  dot.querySelectorAll(".dot").forEach((dot) => {
    if (dot.classList.contains("active")) {
      dot.classList.remove("active");
    }
  });
  dot.querySelectorAll(".dot")[index].classList.add("active");
}

function rearrange(arr, index) {
  const newarr = [];
  newarr[1] = arr[index];
  if (index == 0) {
    newarr[0] = arr[arr.length - 1];
  } else {
    newarr[0] = arr[index - 1];
  }

  let indexCopy;
  if (index == arr.length - 1) {
    indexCopy = 0;
  } else {
    indexCopy = index + 1;
  }

  for (let i = 2; i < arr.length; i++) {
    newarr[i] = arr[indexCopy];
    indexCopy++;
    if (indexCopy >= arr.length) {
      indexCopy = 0;
    }
  }
  return newarr;
}

function characterSlider(i, characterItems, pics, dot, j) {
  showCharacters(characterItems, i, pics, dot, j);
  activeCharacter_i[j]++;
  if (activeCharacter_i[j] >= Number(characterItems.length)) {
    activeCharacter_i[j] = 0;
  }
}

// dna
const DNASvgs = document.querySelectorAll(".E-C-DNA");
let myString;
DNASvgs.forEach((svg, k) => {
  myString = `Species${k}`;
  const svg_data = svg.getAttribute("data-ecdna_values");
  let formattedString = svg_data.replace(/'/g, '"');
  var ParsData = JSON.parse(formattedString);

  for (let index = 0; index < ParsData.length; index++) {
    svg.getElementsByClassName(ParsData[index][0])[0].style.stroke = ParsData[index][1];
    svg.getElementsByClassName(ParsData[index][0])[0].style.strokeWidth = ParsData[index][2];
  }

  const gElements = svg.querySelectorAll("g[filter]");
  const pathElements = svg.querySelectorAll('path[fill*="#paint"]');
  const filterElements = svg.querySelectorAll("filter[id]");
  const linearGradientElements = svg.querySelectorAll("linearGradient[id]");

  for (let i = 0; i < gElements.length; i++) {
    gElements[i].setAttribute("filter", `url(#${myString}filter${i}_iii_7_54)`);
    filterElements[i].setAttribute("id", `${myString}filter${i}_iii_7_54`);
  }
  for (let j = 0; j < pathElements.length; j++) {
    pathElements[j].setAttribute("fill", `url(#${myString}paint${j}_linear_7_54)`);
    linearGradientElements[j].setAttribute("id", `${myString}paint${j}_linear_7_54`);
  }
});

const specialDNA = ETemplate.querySelector(".connectedWithTalent-table-type3 > svg");
const lines = specialDNA.querySelectorAll("path[class*='line']");
const talentTableType3Items = ETemplate.querySelectorAll(".talent-table-type3 > div > .bottom > div");
console.log(`number of lines :${lines.length}`);
lines.forEach((line) => {
  line.addEventListener("mouseover", () => {
    line.style.cursor = "pointer";
    lines.forEach((Line) => {
      if (line.classList[1] !== Line.classList[1]) {
        Line.classList.add("dna-line-inactive");
      }
    });
    talentTableType3Items.forEach((item) => {
      if (item.classList[0] !== line.classList[1]) {
        item.classList.add("gray");
      }
    });
  });
  line.addEventListener("mouseout", () => {
    line.style.cursor = "default";
    lines.forEach((Line) => {
      Line.classList.remove("dna-line-inactive");
    });
    talentTableType3Items.forEach((item) => {
      item.classList.remove("gray");
    });
  });
});

// 8 district

const eightDistrictTYPE1Svgs = document.querySelectorAll(".eightDistrict");
eightDistrictTYPE1Svgs.forEach((svg) => {
  const svg_data = svg.getAttribute("data-eight_district_values");
  let formattedString = svg_data.replace(/'/g, '"');
  var ParsData = JSON.parse(formattedString);

  for (let i = 0; i < ParsData.length; i++) {
    const districtPaths = svg.querySelectorAll(`.${ParsData[i][0]}`);
    // console.log(typeof Number(ParsData[i][1]));

    for (let j = 0; j < districtPaths.length; j++) {
      if (j < Number(ParsData[i][1])) {
        districtPaths[districtPaths.length - 1 - j].style.stroke = ParsData[i][2];
      } else {
        districtPaths[districtPaths.length - 1 - j].style.stroke = "white";
      }
    }
  }
});

// 6 ballon
var sixBallonSvgs = document.querySelectorAll(".E-C-sixBallon");
sixBallonSvgs.forEach((svg) => {
  var values = svg.getAttribute("data-values");
  let formattedString = values.replace(/'/g, '"');
  var ParsData = JSON.parse(formattedString);

  for (var i = 0; i < ParsData.length; i++) {
    var svgItemTitleOne = svg.getElementById(ParsData[i][0] + "TitleOne");
    svgItemTitleOne.querySelector("div").textContent = ParsData[i][1];

    var svgItemTitleTwo = svg.getElementById(ParsData[i][0] + "TitleTwo");
    svgItemTitleTwo.querySelector("div").textContent = ParsData[i][2];

    var svgItem = svg.getElementsByClassName(ParsData[i][0]);

    for (var j = 0; j < svgItem.length; j++) {
      svgItem[j].style.fill = ParsData[i][3];
    }
  }
});

//  6 district type1
const ECSixDistrictType1Svgs = document.querySelectorAll(".ECSixDistrictType1");
ECSixDistrictType1Svgs.forEach((svg) => {
  const svg_data = svg.getAttribute("data-ecsix_district_type1");
  let formattedString = svg_data.replace(/'/g, '"');
  var ParsData = JSON.parse(formattedString);

  for (let i = 0; i < ParsData.length; i++) {
    const districtPaths = svg.querySelectorAll(`.${ParsData[i][0]}`);

    for (let j = 0; j < districtPaths.length; j++) {
      if (j < Number(ParsData[i][1])) {
        districtPaths[districtPaths.length - 1 - j].style.stroke = ParsData[i][2];
      } else {
        districtPaths[districtPaths.length - 1 - j].style.stroke = "white";
      }
    }
  }
});

// 6 district type 2
const ECSixDistrictType2Svgs = document.querySelectorAll(".ECSixDistrictType2");
ECSixDistrictType2Svgs.forEach((svg) => {
  const svg_data = svg.getAttribute("data-ecsix_district_type2");
  let formattedString = svg_data.replace(/'/g, '"');
  var ParsData = JSON.parse(formattedString);

  for (let i = 0; i < ParsData.length; i++) {
    const districtPaths = svg.querySelectorAll(`.${ParsData[i][0]}`);

    for (let j = 0; j < districtPaths.length; j++) {
      if (j < Number(ParsData[i][1])) {
        districtPaths[districtPaths.length - 1 - j].style.stroke = ParsData[i][2];
      } else {
        districtPaths[districtPaths.length - 1 - j].style.stroke = "white";
      }
    }
  }
});

// brain
const brainSvgs = document.querySelectorAll(".E-C-brainSVG");
const brainRegions = ETemplate.querySelectorAll(".brain-region");
brainSvgs.forEach((svg) => {
  const svg_data = svg.getAttribute("data-ecb_values");
  let formattedString = svg_data.replace(/'/g, '"');
  var ParsData = JSON.parse(formattedString);

  // console.log(ParsData.length)
  for (let index = 0; index < ParsData.length; index++) {
    svg.getElementsByClassName(ParsData[index][0])[0].style.fill = ParsData[index][1];

    for (let j = 0; j < brainRegions.length; j++) {
      if (brainRegions[j].classList.contains(ParsData[index][0].replace("E-C-B-", ""))) {
        brainRegions[j].querySelector(".en > div:first-child").style.color = ParsData[index][1];
        brainRegions[j].querySelector(".en > div:first-child span").style.color = ParsData[index][1];
        brainRegions[j].querySelector(".en > div:last-child").style.backgroundColor = `${ParsData[index][1]}23`;
        brainRegions[j].querySelectorAll(".details > div > div:last-child").forEach((div) => {
          div.style.color = ParsData[index][1];
        });
        brainRegions[j].querySelector(".svg svg path").style.fill = ParsData[index][1];
      }
    }
  }
});

// 4 type
const FourTypesSvgs = document.querySelectorAll(".fourTypes");
FourTypesSvgs.forEach((svg) => {
  const svg_data = svg.getAttribute("data-ecfourtype_values");
  let formattedString = svg_data.replace(/'/g, '"');
  var ParsData = JSON.parse(formattedString);

  // console.log(ParsData);

  for (let index = 0; index < ParsData.length; index++) {
    svg.getElementsByClassName(`${ParsData[index][0]}-fa`)[0].style.fill = "#D0CFCF";
    svg.getElementsByClassName(`${ParsData[index][0]}-en`)[0].style.fill = "#D0CFCF";
    svg.getElementsByClassName(`${ParsData[index][0]}-corner`)[0].style.fill = "#D0CFCF";

    if (ParsData[index].includes("active")) {
      svg.getElementsByClassName(`${ParsData[index][0]}-fa`)[0].style.fill = ParsData[index][1];
      svg.getElementsByClassName(`${ParsData[index][0]}-en`)[0].style.fill = ParsData[index][1];
      svg.getElementsByClassName(`${ParsData[index][0]}-corner`)[0].style.fill = ParsData[index][1];
    }
  }
});

// 16 region
const SixteenTypeSvgs = document.querySelectorAll(".SixteenTips");
SixteenTypeSvgs.forEach((svg) => {
  const svg_data = svg.getAttribute("data-ecsixteen_values");
  let formattedString = svg_data.replace(/'/g, '"');
  var ParsData = JSON.parse(formattedString);

  // console.log(ParsData);

  for (let index = 0; index < ParsData.length; index++) {
    svg.getElementsByClassName(ParsData[index][0])[0].style.fill = "#F7F7F7";
    svg.getElementsByClassName(ParsData[index][0])[0].style.stroke = "#888";
    svg.getElementsByClassName(`${ParsData[index][0]}-text`)[0].style.fill = "#888";
    if (ParsData[index].includes("active")) {
      svg.getElementsByClassName(ParsData[index][0])[0].style.fill = ParsData[index][1];
      svg.getElementsByClassName(`${ParsData[index][0]}-text`)[0].style.fill = "#fff";
    }
  }
});
