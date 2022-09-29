const app = require('./app');
const db = require('./libs/db');

try {
	db.authenticate();
	console.log('Connection has been established successfully.');

	db.sync();
	console.log('Syncing database models');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}

// set port, listen for requests
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
