const fetch = require('node-fetch');

const user = {
  username: "anze.chan@gmail.com",
  password: "password"
};

// set Ezreal's mana stat to 1
fetch("http://localhost:9000/users/register", {
  method: 'POST',
  body: JSON.stringify(user),
  headers: { 'Content-Type': 'application/json' }
})
  .then(response => response.json())
  .then(data => console.log(data));
