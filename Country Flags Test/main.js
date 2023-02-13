import { DOM } from "./DOM";

fetch("https://restcountries.com/v3.1/all").then((response) => {
  response.json().then((data) => {
    food = data.results;
    display(food);
  });
});
