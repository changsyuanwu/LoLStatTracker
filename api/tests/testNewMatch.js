const fetch = require('node-fetch');

const body = {
  blue_top: "Gragas",
  blue_jungle: "Sion",
  blue_mid: "Kog'Maw",
  blue_adc: "Azir",
  blue_support: "Hecarim",
  red_top: "Jayce",
  red_jungle: "Shaco",
  red_mid: "Ahri",
  red_adc: "Tristana",
  red_support: "Rakan",
  result: "Blue"
}

fetch("http://localhost:9000/matches/new", {
  method: 'POST',
  body: JSON.stringify(body),
  headers: { 'Content-Type': 'application/json' }
})
  .then(response => response.json())
  .then(data => console.log(data));
