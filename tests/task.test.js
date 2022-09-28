const request = require('supertest');
const app = require('../app');
const db = require('../models/index');
const taskFactory = require('./factories/task.factory');

beforeEach(async () => {
	await db.sequelize.sync({ force: true, logging: false });
});

afterAll(async () => {
	await db.sequelize.drop();
	await db.sequelize.close();
});

describe('Tasks API', () => {
	it('should list all tasks', async () => {
		taskFactory();

		return await request(app)
			.get('/api/tasks')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body.data).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							name: expect.any(
								String
							),
							status: expect.any(
								String
							),
						}),
					])
				);
			});
	});

	it('should create task', () => {
		const payload = {
			name: 'Sample',
			status: 'PENDING',
		};
		return request(app)
			.post('/api/tasks')
			.send(payload)
			.expect('Content-Type', /json/)
			.expect(201)
			.then((response) => {
				expect(response.body).toEqual(
					expect.objectContaining(payload)
				);
			});
	});

	it('should return null if the task was not found', async () => {
		return await request(app)
			.get(`/api/tasks/${1}`)
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toBe(null);
			});
	});

	it('should show task by id', async () => {
		const task = await taskFactory();

		return await request(app)
			.get(`/api/tasks/${task.id}`)
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(
					expect.objectContaining({
						name: expect.any(String),
						status: expect.any(String),
					})
				);
			});
	});

	it('should not update if the task was not found', async () => {
		return request(app)
			.put(`/api/tasks/${1}`)
			.send({
				name: 'Sample',
				status: 'PENDING',
			})
			.expect('Content-Type', /json/)
			.expect(400);
	});

	it('should update task', async () => {
		const task = await taskFactory();

		return request(app)
			.put(`/api/tasks/${task.id}`)
			.send({
				name: 'Sample',
				status: 'PENDING',
			})
			.expect('Content-Type', /json/)
			.expect(201);
	});

	it('should not delete if the task was not found', async () => {
		return request(app)
			.delete(`/api/tasks/${1}`)
			.expect('Content-Type', /json/)
			.expect(400);
	});

	it('should delete task', async () => {
		const task = await taskFactory();

		return request(app)
			.delete(`/api/tasks/${task.id}`)
			.expect('Content-Type', /json/)
			.expect(200);
	});
});
