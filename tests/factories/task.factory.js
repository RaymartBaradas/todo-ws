const { faker } = require('@faker-js/faker');
const Task = require('../../models/task.model');

const data = async (props = {}) => {
	return {
		name: props.name ?? 'Sample Task',
		status: props.status ?? 'PENDING',
	};
};

module.exports = async (props = {}) => Task.create(await data(props));
