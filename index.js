let bcrypt = require('bcrypt');

bcrypt.hash('abc123', 10).then((hash) => bcrypt.compare('abc123', hash)).then((a)=>console.log({a}));

