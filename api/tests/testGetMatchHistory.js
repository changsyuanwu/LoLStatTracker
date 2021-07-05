const fetch = require('node-fetch');

// create a new user with username "test@example.com" and password "password"
fetch("http://localhost:9000/matches/", {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
})
  .then(response => response.json())
  .then(data => console.log(data));
  