// Select elements
const countriesDropdown = document.getElementById("all"),
  webPage = document.getElementById("country"),
  populationBtn = document.getElementById("population"),
  areaBtn = document.getElementById("area"),
  toolbarNavigation = document.getElementById("toolbar");

// Create a function to add <option> elements to <select> element
const addCountryToDropdown = (dataBase) => {
  let result = [];
  dataBase.forEach((country) => {
    result.push(`<option>${country.name.common}</option>`);
  });
  return result.sort().join("");
};

const addTranslationToDropdown = (dataBase) => {
  let result = [];
  Object.keys(dataBase[0].translations).forEach((language) => {
    result.push(`<option>${language}</option>`);
  });
  return result.sort().join("");
};

// A function wich inserts element in HTML
const addElementToHtml = (parent, child) => {
  parent.insertAdjacentHTML("beforeend", child);
};

// Add all <option> elements to HTML
addElementToHtml(countriesDropdown,
  `<option>-- Select a country --</option>
  ${addCountryToDropdown(countries)}`
);

addElementToHtml(toolbarNavigation, `<select id="translation"></select>`);
const translationDropdown = document.getElementById("translation");

addElementToHtml(
  translationDropdown,
  `<option>--Select language--</option>
  ${addTranslationToDropdown(countries)}`
);

// Display a text if no country is selected
webPage.innerHTML = `<h2>Select a country from the list</h2>`;

// Do not display buttons
populationBtn.style.display = "none";
areaBtn.style.display = "none";

//Create a variable for name of a country from <h1> element
let countryName = "",
  selectedCountry = [];

// Add details for a selected country
countriesDropdown.addEventListener("change", () => {
  countries.forEach((country) => {
    if (countriesDropdown.value === country.name.common) {
      webPage.innerHTML = `
      <img src=${country.flags.png}>
      <h1>${
        translationDropdown.value === "--Select language--"
          ? country.name.common
          : country.translations[translationDropdown.value].common
      }</h1>
      <h2>Region: ${country.region}</h2>
      <h3>Subregion: ${country.subregion}</h3>
      <h4>Capital: ${country.capital}</h4>`;
      selectedCountry.push(country);
      indexOfCurrentItem = selectedCountry.length - 1;
      populationBtn.style.display = "inline";
      areaBtn.style.display = "inline";
      if (selectedCountry.length > 1) {
        prevBtn.disabled = false;
      }
      // prevBtn.disabled = false;
      // nextBtn.disabled = false;
    } else if (countriesDropdown.value === "-- Select a country --") {
      webPage.innerHTML = `
      <h2>Select a country from the list</h2>`;
      populationBtn.style.display = "none";
      areaBtn.style.display = "none";
      prevBtn.disabled = true;
      nextBtn.disabled = true;
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
  countriesDropdown.value = largestCountryPopulation.name.common;
  selectedCountry.push(largestCountryPopulation);
  indexOfCurrentItem = selectedCountry.length - 1;

  return `<img src=${largestCountryPopulation.flags.png}>
    <h1>${largestCountryPopulation.name.common}</h1>
    <h2>Region: ${largestCountryPopulation.region}</h2>
    <h3>Subregion: ${largestCountryPopulation.subregion}</h3>
    <h4>Capital: ${largestCountryPopulation.capital[0]}</h4>`;
};

// Function that sets buttons
const setsBtn = (button, location) => {
  button.addEventListener("click", () => {
    countries.forEach((country) => {
      if (countryName.textContent === country.name.common) {
        if (country.borders) {
          webPage.innerHTML = `
          ${getLargestCountryBy(country.borders, location)}`;
        } else {
          webPage.innerHTML = `
          <h2>This country has no neighbors!</h2>`;
        }
      }
    });
    // add to <h1> element the value of the <select> element which is the current country name
    countryName.innerText = countriesDropdown.value;
  });
};

// Sets buttons
setsBtn(populationBtn, "population");
setsBtn(areaBtn, "area");

// Create two new buttons in the <nav id="toolbar"> element
addElementToHtml(
  toolbarNavigation,
  `
  <button id='prev' disabled>Previous country</button>
  <button id='next' disabled>Next country</button>`
);

const prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next");

// show previous button
let indexOfCurrentItem = selectedCountry.length - 1;

prevBtn.addEventListener("click", () => {
  if (indexOfCurrentItem === -1 || indexOfCurrentItem === 0) {
    prevBtn.disabled = true;
  } else {
    indexOfCurrentItem--;

    countriesDropdown.value = selectedCountry[indexOfCurrentItem].name.common;
    webPage.innerHTML = `
      <img src=${selectedCountry[indexOfCurrentItem].flags.png}>
      <h1>${selectedCountry[indexOfCurrentItem].name.common}</h1>
      <h2>Region: ${selectedCountry[indexOfCurrentItem].region}</h2>
      <h3>Subregion: ${selectedCountry[indexOfCurrentItem].subregion}</h3>
      <h4>Capital: ${selectedCountry[indexOfCurrentItem].capital}</h4>`;
  }
  // add to <h1> element the value of the <select> element which is the current country name
  countryName.innerText = countriesDropdown.value;
  nextBtn.disabled = false;
});

// show next Button
nextBtn.addEventListener("click", () => {
  if (
    indexOfCurrentItem === -1 ||
    indexOfCurrentItem === selectedCountry.length - 1
  ) {
    nextBtn.disabled = true;
  } else {
    indexOfCurrentItem++;
    countriesDropdown.value = selectedCountry[indexOfCurrentItem].name.common;
    webPage.innerHTML = `
      <img src=${selectedCountry[indexOfCurrentItem].flags.png}>
      <h1>${selectedCountry[indexOfCurrentItem].name.common}</h1>
      <h2>Region: ${selectedCountry[indexOfCurrentItem].region}</h2>
      <h3>Subregion: ${selectedCountry[indexOfCurrentItem].subregion}</h3>
      <h4>Capital: ${selectedCountry[indexOfCurrentItem].capital}</h4>`;
  }
  prevBtn.disabled = false;
  countryName.innerText = countriesDropdown.value;
});

//OPTIONAL TASK: Translations
translationDropdown.addEventListener("change", () => {
  let item = translationDropdown.value;
  countries.forEach((country) => {
    if (
      countriesDropdown.value === country.name.common &&
      Object.keys(country.translations).includes(item)
    ) {
      webPage.innerHTML = `
      <img src=${country.flags.png}>
      <h1>${country.translations[item].common}</h1>
      <h2>Region: ${country.region}</h2>
      <h3>Subregion: ${country.subregion}</h3>
      <h4>Capital: ${country.capital}</h4>`;
    }
  });
});
