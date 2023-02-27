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
  let selectedCont = [];
  //Get random flag from filteredCountries
  let index = Math.floor(Math.random() * filteredCountries.length);
  let chosenCont = filteredCountries[index];
  if (!(chosenCont in selectedCont)) {
    selectedCont.push(chosenCont);
  } else {
    index = Math.floor(Math.random() * filteredCountries.length);
    chosenCont = filteredCountries[index];
  }
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

function displayCountries(arrayCorrect) {
  DOM.CountryList.innerHTML += `<li>${
    arrayCorrect[arrayCorrect.length - 1]
  }</li>`;
}

function deleteCountries(arrayCorrect, correctCountry) {
  DOM.CountryList.innerHTML = '<ul id="listCountries"></ul>';
  arrayCorrect.length = 0;
  let wrongString =
    "LOSER. Incorrect guess. The correct country was " +
    correctCountry +
    ". TRY AGAIN";
  window.alert(wrongString);
  console.log(arrayCorrect);
  getRandCont(filteredCountries);
}

DOM.Button.addEventListener("click", function () {
  const inputValue = DOM.InputBox.value;
  DOM.InputBox.value = "";
  console.log(inputValue);
  console.log(chosenCountry.name.common);
  if (inputValue.toLowerCase().trim() == chosenCountry.name.common.toLowerCase()) {
    arrayCorrect.push(chosenCountry.flag);
    getRandCont(filteredCountries);
    displayCountries(arrayCorrect);
  } else {
    deleteCountries(arrayCorrect, chosenCountry.name.common);
  }
  console.log(arrayCorrect);
});
