import { DOM } from "./DOM";

let chosenCountry;
let shuffledCountries = [];

async function getCountries() {
  let response = await fetch("https://restcountries.com/v3.1/all");
  let flags = await response.json();

  //Filter independent countries
  let filteredCountries = flags.filter(
    (country) =>
      country.independent === true &&
      country.independent !== undefined &&
      (country.name.common == "Georgia" ||
        country.name.common == "Armenia" ||
        country.name.common == "Spain" ||
        country.name.common == "Italy" ||
        country.name.common == "France" ||
        country.name.common == "Germany")
  );
  shuffledCountries = shuffle(filteredCountries);
  //Display country out of shuffledCountries
  chosenCountry = shuffledCountries.pop();
  display(chosenCountry);
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

//Display Flag
function display(flag) {
  console.log(flag.name.common);
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

function displayCountries(chosenCountry) {
  DOM.CountryList.innerHTML += `<li>${chosenCountry.flag}</li>`;
}

function deleteCountries(correctCountry) {
  DOM.CountryList.innerHTML = '<ul id="listCountries"></ul>';
  shuffledCountries.length = 0;
  let wrongString =
    "Incorrect. The correct country was " + correctCountry + ". TRY AGAIN";
  window.alert(wrongString);
  //Add new way to display countries
  getCountries();
}

DOM.Button.addEventListener("click", function () {
  const inputValue = DOM.InputBox.value;
  DOM.InputBox.value = "";
  if (
    inputValue.toLowerCase().trim() == chosenCountry.name.common.toLowerCase()
  ) {
    if (shuffledCountries.length != 0) {
      displayCountries(chosenCountry);
      chosenCountry = shuffledCountries.pop();
      display(chosenCountry);
    } else {
      window.alert("You got all the countries correctly! Good Job!");
      DOM.CountryList.innerHTML = '<ul id="listCountries"></ul>';
      getCountries();
    }
  } else {
    deleteCountries(chosenCountry.name.common);
  }
});
