const { DataTypes } = require('sequelize');
const db = require('../libs/db');

const Task = db.define(
	'tasks',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING,
			defaultValue: 'PENDING',
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		indexes: [
			{
				unique: false,
				fields: ['name'],
			},
		],
		underscored: true,
		tableName: 'tasks',
		modelName: 'Task',
		timestamps: true,
	}
);

module.exports = Task;
