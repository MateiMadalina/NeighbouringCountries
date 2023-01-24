

// Select elements
const dropdown = document.getElementById('all'),
      webPage = document.getElementById('country'),
      populationBtn = document.getElementById('population');

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

// Do not display button
populationBtn.style.display = 'none';

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
      } else if (dropdown.value === '-- Select a country --') {
        webPage.innerHTML = `
        <h2>Select a country from the list</h2>`;
        populationBtn.style.display = 'none';
      }
    })
  })


