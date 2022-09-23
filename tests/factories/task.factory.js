const { faker } = require('@faker-js/faker');
const models = require('../../models');

const data = async (props = {}) => {
	return {
		name: props.name ?? 'Sample Task',
		status: props.status ?? 'PENDING',
	};
};

module.exports = async (props = {}) => models.Task.create(await data(props));
