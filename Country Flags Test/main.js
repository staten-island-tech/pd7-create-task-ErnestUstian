import { DOM } from "./DOM";

let chosenCountry;

let filteredCountries = [];

async function getCountries() {
  let response = await fetch("https://restcountries.com/v3.1/all");
  let flags = await response.json();

  //Filter independent countries
  filteredCountries = flags.filter(
    (country) =>
      country.independent === true && country.independent !== undefined
  );
  getRandCont(filteredCountries);
}

function getRandCont(filteredCountries) {
  //Get random flag from filteredCountries
  let index = Math.floor(Math.random() * filteredCountries.length);
  const chosenCont = filteredCountries[index];
  chosenCountry = chosenCont;
  console.log(chosenCont);
  console.log(chosenCont.name.common);
  console.log(chosenCont.flag);
  display(chosenCont);
}

//Display Flag
function display(flag) {
  DOM.Menupage.innerHTML = "";
  DOM.Menupage.insertAdjacentHTML(
    "beforeend",
    `
    <br />
    <br />
    <div class="card">
        <img style="border: 2px solid black;" src="${flag.flags.png}" alt="${flag.flags.alt}">
    </div>
    `
  );
}

getCountries();

let arrayCorrect = [];

// function displayArray(arrayCorrect) {
//   let myList = document.createElement("ul");
//   for (let i = 0; i < arrayCorrect.length; i++) {
//     let listItem = document.createElement("li");
//     listItem.textContent = arrayCorrect[i];
//     myList.appendChild(listItem);
//   }
//   DOM.CountryList.appendChild(myList);
// }

function displayCountries(arrayCorrect) {
  DOM.ListItem.innerHTML = "";
  arrayCorrect.forEach((flag) =>
    DOM.Menupage.insertAdjacentHTML(
      "beforeend",
      `
      <li class="listItem">${flag}</li>
      `
    )
  );
}

DOM.Button.addEventListener("click", function () {
  const inputValue = DOM.InputBox.value;
  DOM.InputBox.value = "";
  console.log(inputValue);
  console.log(chosenCountry.name.common);
  if (inputValue.toLowerCase() == chosenCountry.name.common.toLowerCase()) {
    arrayCorrect.push(chosenCountry.flag);
    getRandCont(filteredCountries);
    displayCountries(arrayCorrect);
  }
  console.log(arrayCorrect);
});
