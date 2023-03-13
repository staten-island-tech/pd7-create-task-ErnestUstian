import { DOM } from "./DOM";

let chosenCountry;
let shuffledCountries = [];

getCountries();

//Starting function for getting countries
async function getCountries() {
  let response = await fetch("https://restcountries.com/v3.1/all");
  let flags = await response.json();

  //Filter independent countries
  let filteredCountries = flags.filter(
    (country) =>
      country.independent === true && country.independent !== undefined
  );
  shuffledCountries = shuffle(filteredCountries);
  //Display country out of shuffledCountries
  chosenCountry = shuffledCountries.pop();
  display(chosenCountry);
}

//Shuffle list function
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

//Function on button press
DOM.Button.addEventListener("click", function () {
  inputChecker(DOM.InputBox.value);
  DOM.InputBox.value = "";
});

//Function on Enter key
DOM.InputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    inputChecker(DOM.InputBox.value);
    DOM.InputBox.value = "";
  }
});

//Answer Checker
function inputChecker(inputCountry) {
  let correctName = chosenCountry.name.common;
  //Correct country name
  if (inputCountry.toLowerCase() == correctName.toLowerCase()) {
    //Another country left in the list
    if (shuffledCountries.length != 0) {
      DOM.CountryList.innerHTML += `<li>${chosenCountry.flag}</li>`;
      chosenCountry = shuffledCountries.pop();
      display(chosenCountry);
    }
    //No country left in the list
    else {
      window.alert("You got all the countries correctly! Good Job!");
      DOM.CountryList.innerHTML = '<ul id="listCountries"></ul>';
      getCountries();
    }
  }
  //Wrong country name
  else {
    DOM.CountryList.innerHTML = '<ul id="listCountries"></ul>';
    shuffledCountries.length = 0;
    let wrongString =
      "Incorrect. The correct country was " + correctName + ". TRY AGAIN";
    window.alert(wrongString);
    //Add new way to display countries
    getCountries();
  }
}
