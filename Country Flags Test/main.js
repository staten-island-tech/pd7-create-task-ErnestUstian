import {DOM} from "./DOM"
var flag = undefined

async function getFlag() {
  let response = await fetch("https://restcountries.com/v3.1/all")
  let flags = await response.json()
  let index = Math.floor(Math.random()*flags.length)
  console.log(flags[index])
}

function display(flags) {
  DOM.body.innerHTML = "";
 flags.forEach((flags) =>
    DOM.insertAdjacentHTML(
      "beforeend",
      `
    <div class="card">
        <img src="${flags.flag}" alt="image of ${flag.flag}">
    </div>
    `
    )
  );
}

getFlag()