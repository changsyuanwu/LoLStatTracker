const fetch = require('node-fetch');


fetch("http://localhost:9000/champions/update-stats?name=ezreal&stat=mana&value=1", {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' }
});