import {DOM} from "./DOM"
var flag = undefined

async function displayFlag() {
  let response = await fetch("https://restcountries.com/v3.1/all")
  let flags = await response.json()
  let index = Math.floor(Math.random()*flags.length)
  console.log(flags[index])
}

displayFlag()