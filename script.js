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

// SEARCH BOX :

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

// FILTER BY REGION

let regionSelect= document.getElementById("regionFilter");
regionSelect.addEventListener("change",function(){
  let selectedRegion=regionSelect.value;

  if(selectedRegion===""){
    displayCountries(countriesData)
    return
  }

  let filteredData= countriesData.filter((country)=>{
    let region=""
    if(country.region){
      region=country.region
    }

    return region===selectedRegion
  })
  displayCountries(filteredData)
})

// SORT COUNTRY

let sortSelect = document.getElementById("sort");

sortSelect.addEventListener("change", function() {

  let sortValue = sortSelect.value;

  if (sortValue === "") {
    displayCountries(countriesData);
    return;
  }

  let sortedData = [...countriesData].sort(function(a, b) {

    let popA = a.population || 0;
    let popB = b.population || 0;

    if (sortValue === "asc") {
      return popA - popB;
    } else {
      return popB - popA;
    }
  });

  displayCountries(sortedData);
});

// DARK MODE

let toggleBtn = document.getElementById("toggleTheme")
toggleBtn.addEventListener("click",function(){
  document.body.classList.toggle("dark")

  if(document.body.classList.contains("dark")){
    toggleBtn.innerText="☀️ Light Mode";
  }else{
    toggleBtn.innerText="🌙 Dark Mode"
  }
})