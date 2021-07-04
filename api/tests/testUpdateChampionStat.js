const fetch = require('node-fetch');

// set Ezreal's mana stat to 1
fetch("http://localhost:9000/champions/update-stats?name=ezreal&stat=mana&value=1", {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' }
})
  .then(response => response.json())
  .then(data => console.log(data));