import { DOM } from "./DOM";

async function getFlag() {
  let response = await fetch("https://restcountries.com/v3.1/all");
  let flags = await response.json();

  //Filter independent countries
  const filteredCountries = flags.filter(
    (country) =>
      country.independent === true && country.independent !== undefined
  );

  //Get random flag from filteredCountries
  let index = Math.floor(Math.random() * filteredCountries.length);
  console.log(filteredCountries[index]);
  display(filteredCountries[index]);
}

//Display Flag
function display(flag) {
  DOM.Menupage.innerHTML = "";
  DOM.Menupage.insertAdjacentHTML(
    "beforeend",
    `
    <div class="card">
        <img src="${flag.flags.png}" alt="${flag.flags.alt}">
    </div>
    `
  );
}

getFlag();

DOM.Submit.addEventListener("submit", function checkAnswer() {
  const inputText = DOM.InputBox.value;
  console.log(inputText);
  // (inputText, designatedObject) => {
  //   for (const property in designatedObject) {
  //     if (
  //       designatedObject.hasOwnProperty(property) &&
  //       designatedObject[property].toLowerCase() === inputString.toLowerCase()
  //     ) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };
});
