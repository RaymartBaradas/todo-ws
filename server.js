const app = require('./app');
const db = require('./models');

db.sequelize.sync({ force: true, logging: false });

// set port, listen for requests
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});