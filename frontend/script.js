

// Select elements
const dropdown = document.getElementById('all'),
      webPage = document.getElementById('country'),
      populationBtn = document.getElementById('population'),
      areaBtn = document.getElementById('area');

// Create a function to add <option> elements to <select> element
const addCountryToDropdown = (dataBase) => {
  let result = [];
  dataBase.forEach(country => {
    result.push(`<option>${country.name.common}</option>`)
  });
  return result.sort().join('');
}

// Add all <option> elements to HTML
dropdown.insertAdjacentHTML('beforeend', `
  <option>-- Select a country --</option>
  ${addCountryToDropdown(countries)}`);

// Display a text if no country is selected
webPage.innerHTML = `<h2>Select a country from the list</h2>`

// Do not display buttons
populationBtn.style.display = 'none';
areaBtn.style.display = 'none';

//Create a variable for name of a country from <h1> element
let countryName = '';

// Add details for a selected country
  dropdown.addEventListener('change', () => {
    countries.forEach(country => {
      if (dropdown.value === country.name.common) {
        webPage.innerHTML = `
        <img src=${country.flags.png}>
        <h1>${country.name.common}</h1>
        <h2>Region: ${country.region}</h2>
        <h3>Subregion: ${country.subregion}</h3>
        <h4>Capital: ${country.capital}</h4>`;
        populationBtn.style.display = 'inline';
        areaBtn.style.display = 'inline';
      } else if (dropdown.value === '-- Select a country --') {
        webPage.innerHTML = `
        <h2>Select a country from the list</h2>`;
        populationBtn.style.display = 'none';
        areaBtn.style.display = 'none';
      }
    })
    countryName = document.querySelector('h1');
    console.log(countryName)
  })
  
  // Set population button
  populationBtn.addEventListener('click', () => {

  })


