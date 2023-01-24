

// Select element
const dropdown = document.getElementById('all');

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

  
