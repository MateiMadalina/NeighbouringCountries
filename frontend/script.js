let allCountries = document.querySelector('#all'); 
let mainElement = document.querySelector("#country");

// const getAttributeOfCountry = (key,value) =>{
//     let list = [];
//     countries.forEach((country) =>{
//         if(country.hasOwnProperty(key)){
//             list.push(country.value)
//            }
//            else{
//             list.push("-");
//            }
//     }
//     )  
//     return list;
// }



let commonCountries = [];
countries.forEach((country) =>{
    if(country.hasOwnProperty("name")){
        commonCountries.push(country.name.common)
       }
       else{
        commonCountries.push("-");
       }
}
)

let flagsSRC = [];
countries.forEach((flag) =>{
    if(flag.hasOwnProperty("flags")){
        flagsSRC.push(flag.flags.png)
       }
       else{
        flagsSRC.push("-");
       }
}
)


let regions = [];
countries.forEach((region) =>{
    if(region.hasOwnProperty("region")){
        regions.push(region.region)
       }
       else{
        regions.push("-");
       }
}
)


let subregions = [];
countries.forEach((subregion) =>{
   if(subregion.hasOwnProperty("subregion")){
    subregions.push(subregion.subregion)
   }
   else{
    subregions.push("-");
   }
}
)

let capitals = [];
countries.forEach((capital) =>{
    if(capital.hasOwnProperty("capital")){
    capitals.push(capital.capital[0])
}else{
    capitals.push("-")
}
}
)

commonCountries.forEach(name =>{
    let option = document.createElement("option")
    option.textContent = name;
    allCountries.appendChild(option);
    option.setAttribute("value",name);
})


let img = document.createElement("img");
mainElement.appendChild(img);
let h1 = document.createElement("h1");
mainElement.appendChild(h1);
let h2 = document.createElement("h2");
mainElement.appendChild(h2);
let h3 = document.createElement("h3");
mainElement.appendChild(h3);
let h4 = document.createElement("h4");
mainElement.appendChild(h4);


allCountries.addEventListener("change", (event) => {
    let indexEvent = commonCountries.indexOf(event.target.value);
    for(let i = 0; i < flagsSRC.length; i++){
        if(indexEvent === i){
            img.setAttribute('src', `${flagsSRC[i]}`);
            h1.textContent = `${commonCountries[i]}` ;  
            h2.textContent = `${regions[i]}`;  
            h3.textContent = `${subregions[i]}`;
            h4.textContent = `${capitals[i]}`;
    } 
}
})


