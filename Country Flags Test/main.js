import {DOM} from "./DOM"
var flag = undefined

async function getFlag() {
  let response = await fetch("https://restcountries.com/v3.1/all")
  let flags = await response.json()
  let index = Math.floor(Math.random()*flags.length)
  console.log(flags[index])
}

function display{
  DOM.body.innerHTML = "";
  food.forEach((flags) =>
    DOM.insertAdjacentHTML(
      "beforeend",
      `
    <div class="card">
        <h1>${flags.name}</h1>
        <h2>${flags.status}</h2>
        <img src="${flags.image}" alt="image of ${flag.name}">
    </div>
    `
    )
  );
}

getFlag()