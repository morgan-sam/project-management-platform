const { pool } = require('./pool');

const getEntries = (request, response) => {
	pool.query('SELECT * FROM tasks ORDER BY ID ASC', (error, results) => {
		if (error) throw error;
		response.status(200).json(results.rows);
	});
};

module.exports = {
	getEntries
};
