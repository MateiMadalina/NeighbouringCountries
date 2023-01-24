

// Select elements
const dropdown = document.getElementById('all'),
      webPage = document.getElementById('country');

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

  dropdown.addEventListener('change', () => {
    countries.forEach(country => {
      if (dropdown.value === country.name.common) {
        webPage.innerHTML = `
        <img src=${country.flags.png}>
        <h1>${country.name.common}</h1>
        <h2>Region: ${country.region}</h2>
        <h3>Subregion: ${country.subregion}</h3>
        <h4>Capital: ${country.capital}</h4>`
      }
    })
  })


