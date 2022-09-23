const express = require('express');
require('dotenv').config();

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.status(200).json('Todo web service API');
});

app.use('/api/tasks', require('./routes/task.route'));

module.exports = app;
