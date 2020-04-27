const express = require('express');
const cors = require('cors');
const db = require('./config/queries');

const app = express();
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 8000, () => {
	console.log(`Server listening...`);
});

app.get('/', (req, res) => {
	res.send({ message: 'Welcome to the server!' });
});

app.get('/tasks', db.getTasks);
app.post('/tasks', db.createTask);
app.delete('/tasks/:ID', db.deleteTask);
