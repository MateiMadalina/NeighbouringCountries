

// List the countries
const dropdownList = document.getElementById('all');

const addOptionTagToElement = (dataBase) => {
  let result = [];
  dataBase.forEach(country => {
    result.push(`<option>${country.name.common}</option>`)
  });
  return result.sort().join('');
}
console.log(addOptionTagToElement(countries))
