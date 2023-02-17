import { DOM } from "./DOM";

async function getFlag() {
  let response = await fetch("https://restcountries.com/v3.1/all");
  
  let flags = await response.json();
  let index = Math.floor(Math.random() * flags.length);
  console.log(flags[index]);
  display(flags[index]);
}

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
