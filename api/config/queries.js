const { pool } = require('./pool');

const getTasks = (request, response) => {
	pool.query('SELECT * FROM tasks ORDER BY ID ASC', (error, results) => {
		if (error) throw error;
		response.status(200).json(results.rows);
	});
};

const getTaskById = (request, response) => {
	const ID = parseInt(request.params.ID);
	pool.query('SELECT * FROM tasks WHERE ID = $1', [ ID ], (error, results) => {
		if (error) throw error;
		response.status(200).json(results.rows);
	});
};

const createTask = (request, response) => {
	const { task, date, deadline, urgency, team, completed } = request.body;
	pool.query(
		'INSERT INTO tasks (task, date, deadline, urgency, team, completed) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
		[ task, date, deadline, urgency, team, completed ],
		(error, results) => {
			if (error) throw error;
			response.status(201).send(`Task added with ID: ${results.rows[0].id}\n`);
		}
	);
};

const updateTask = (request, response) => {
	const ID = request.params.id;
	const { task, date, deadline, urgency, team, completed } = request.body;
	pool.query(
		'UPDATE tasks SET task = $2, date = $3, deadline = $4, urgency = $5, team = $6, completed = $7 WHERE ID = $1',
		[ ID, task, date, deadline, urgency, team, completed ],
		(error, results) => {
			if (error) throw error;
			response.status(200).send(`Entry modified with ID: ${ID}\n`);
		}
	);
};

const deleteTask = (request, response) => {
	const ID = parseInt(request.params.ID);
	pool.query('DELETE FROM tasks WHERE ID = $1', [ ID ], (error, results) => {
		if (error) throw error;
		response.status(200).send(`Task deleted with ID: ${ID}\n`);
	});
};

module.exports = {
	getTasks,
	getTaskById,
	createTask,
	updateTask,
	deleteTask
};
