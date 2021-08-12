const fetch = require('node-fetch');

const loginUser = {
  username: "test@example.com",
  password: "password"
};

const changePassUser = {
  oldPassword: "password",
  newPassword: "password1"
};

// try to authenticate a user with username "test@example.com" and password "password"
fetch("http://127.0.0.1:9000/users/authenticate", {
  method: 'POST',
  body: JSON.stringify(loginUser),
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' }
})
  .then(response => response.json())
  .then(data => {
    console.log(data);

    // change the user's password to "password1"
    fetch("http://127.0.0.1:9000/users/change-password", {
      method: 'PUT',
      body: JSON.stringify(changePassUser),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });
