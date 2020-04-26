const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 8000, () => {
	console.log(`Server listening...`);
});

app.get('/', (req, res) => {
	res.send({ message: 'Welcome to the server!' });
});
