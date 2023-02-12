import { DOM } from "./DOM";

fetch("").then((response) => {
  response.json().then((data) => {
    food = data.results;
    display(food);
  });
});
