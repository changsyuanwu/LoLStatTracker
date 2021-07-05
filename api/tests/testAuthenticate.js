const fetch = require('node-fetch');

const user = {
  username: "test@example.com",
  password: "password"
};

// create a new user with username "test@example.com" and password "password"
fetch("http://localhost:9000/users/authenticate", {
  method: 'POST',
  body: JSON.stringify(user),
  headers: { 'Content-Type': 'application/json' }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => {
    console.log(err);
  });
