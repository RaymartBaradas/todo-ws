const { Sequelize } = require('sequelize');

let sequelize = new Sequelize(
	process.env.DB_NAME ?? 'todos',
	process.env.DB_USERNAME ?? 'root',
	process.env.DB_PASSWORD ?? null,
	{
		host: process.env.DB_HOST ?? 'localhost',
		dialect: process.env.DB_DIALECT ?? 'mysql',
	}
);

if (process.env.NODE_ENV === 'test') {
	sequelize = new Sequelize('sqlite::memory:');
}

module.exports = sequelize;
