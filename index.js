const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

app.listen(5000);

// run and test app
// node index.js
// go to localhost:5000
