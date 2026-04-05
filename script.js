let countriesData = [];

async function fetchCountries() {
  try {
    let loader = document.getElementById("loader");
    loader.style.display = "block";

    let response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region");

    if (response.ok === false) {
      throw new Error("API error");
    }

    let data = await response.json();

    countriesData = data;

    displayCountries(countriesData);

    loader.style.display = "none";

  } catch (error) {
    console.log(error);
    document.getElementById("countries").innerText = "Failed to load data";
  }
}

function displayCountries(data) {
  let container = document.getElementById("countries");

  let result = data.map(function(country) {

    let name = "No Name";
    if (country.name && country.name.common) {
      name = country.name.common;
    }

    let population = "N/A";
    if (country.population) {
      population = country.population;
    }

    let region = "N/A";
    if (country.region) {
      region = country.region;
    }

    let flag = "";
    if (country.flags && country.flags.png) {
      flag = country.flags.png;
    }

    return `
      <div class="card">
        <img src="${flag}" />
        <h3>${name}</h3>
        <p>Population: ${population}</p>
        <p>Region: ${region}</p>
      </div>
    `;
  });

  container.innerHTML = result.join("");
}

fetchCountries();



let SearchInput=document.getElementById("search")
SearchInput.addEventListener("input",function(){
  let value=SearchInput.value.toLowerCase()
  if(value===""){
    displayCountries(countriesData);
    return
  }

  let filteredData=countriesData.filter((country)=>{
    let name=""
    if(country.name && country.name.common){
      name=country.name.common.toLowerCase()
    }
    return name.includes(value)
  })
  displayCountries(filteredData);
})