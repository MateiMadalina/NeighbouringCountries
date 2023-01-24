// Select elements
const dropdown = document.getElementById('all'),
  webPage = document.getElementById('country'),
  populationBtn = document.getElementById('population'),
  areaBtn = document.getElementById('area'),
  toolbarNavigation = document.getElementById('toolbar');

// Create a function to add <option> elements to <select> element
const addCountryToDropdown = (dataBase) => {
  let result = [];
  dataBase.forEach((country) => {
    result.push(`<option>${country.name.common}</option>`);
  });
  return result.sort().join("");
};

// A function wich inserts element in HTML
const addElementToHtml = (parent, child) => {
  parent.insertAdjacentHTML("beforeend", child);
};

// Add all <option> elements to HTML
addElementToHtml(
  dropdown,
  `
  <option>-- Select a country --</option>
  ${addCountryToDropdown(countries)}`
);

// Display a text if no country is selected
webPage.innerHTML = `<h2>Select a country from the list</h2>`;

// Do not display buttons
populationBtn.style.display = "none";
areaBtn.style.display = "none";

//Create a variable for name of a country from <h1> element
let countryName = "";

// Add details for a selected country
dropdown.addEventListener("change", () => {
  countries.forEach((country) => {
    if (dropdown.value === country.name.common) {
      webPage.innerHTML = `
      <img src=${country.flags.png}>
      <h1>${country.name.common}</h1>
      <h2>Region: ${country.region}</h2>
      <h3>Subregion: ${country.subregion}</h3>
      <h4>Capital: ${country.capital}</h4>`;
      populationBtn.style.display = "inline";
      areaBtn.style.display = "inline";
    } else if (dropdown.value === "-- Select a country --") {
      webPage.innerHTML = `
      <h2>Select a country from the list</h2>`;
      populationBtn.style.display = "none";
      areaBtn.style.display = "none";
    }
  });
  // select <h1> element with country name as value
  countryName = document.querySelector("h1");
});

// Get the largest country by a specific argument
const getLargestCountryBy = (array, number) => {
  let result = [];
  countries.forEach((country) => {
    array.forEach((border) => {
      if (country.cca3 === border) {
        result.push(country);
      }
    });
  });
  let largestCountryPopulation = result.sort(
    (a, b) => b[number] - a[number]
  )[0];
  // add the country name to <select> element
  dropdown.value = largestCountryPopulation.name.common;

  return `<img src=${largestCountryPopulation.flags.png}>
    <h1>${largestCountryPopulation.name.common}</h1>
    <h2>Region: ${largestCountryPopulation.region}</h2>
    <h3>Subregion: ${largestCountryPopulation.subregion}</h3>
    <h4>Capital: ${largestCountryPopulation.capital[0]}</h4>`;
};

// Set population button
populationBtn.addEventListener("click", () => {
  countries.forEach((country) => {
    if (countryName.textContent === country.name.common) {
      //display in the <main> element
      if (country.borders) {
        webPage.innerHTML = `
        ${getLargestCountryBy(country.borders, "population")}`;
      } else {
        webPage.innerHTML = `
        <h2>This country has no neighbors!</h2>`;
      }
    }
  });
  // add to <h1> element the value of the <select> element which is the current country name
  countryName.innerText = dropdown.value;
});

// Set area button
areaBtn.addEventListener("click", () => {
  countries.forEach((country) => {
    if (countryName.textContent === country.name.common) {
      //display in the <main> element
      if (country.borders) {
        webPage.innerHTML = `
          ${getLargestCountryBy(country.borders, "area")}`;
      } else {
        webPage.innerHTML = `
          <h2>This country has no neighbors!</h2>`;
      }
    }
  });
  // add to <h1> element the value of the <select> element which is the current country name
  countryName.innerText = dropdown.value;
});

// Create two new buttons in the <nav id="toolbar"> element
addElementToHtml(
  toolbarNavigation,
  `
  <button id='prev' disabled>Previous country</button>
  <button id='next' disabled>Next country</button>`
);

const prevBtn = document.getElementById('prev'),
      nextBtn = document.getElementById('next');

// set prev button
console.log(prevBtn)

// set next button
console.log(nextBtn)
