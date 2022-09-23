const { Task } = require('../models/index');

// @desc    Get tasks
// @route   GET /api/tasks
const index = async (req, res) => {
	const { page = 1, limit = 10 } = req.query;
	const skip = (page - 1) * limit;
	const count = await Task.count();

	const data = await Task.findAll({
		offset: Math.ceil(skip),
		limit: Math.ceil(limit),
	});

	res.status(200).json({
		data,
		total: count,
		pages: Math.ceil(count / limit),
		current: Math.ceil(page),
	});
};

// @desc    Create task
// @route   POST /api/tasks
const store = async (req, res) => {
	const data = await Task.create({
		name: req.body.name,
		status: req.body.status,
	});

	res.status(201).json(data);
};

// @desc    Show task
// @route   POST /api/tasks/:id
const show = async (req, res) => {
	const data = await Task.findByPk(req.params.id);

	res.status(200).json(data);
};

// @desc    Update task
// @route   POST /api/tasks/:id
const update = async (req, res) => {
	const status = await Task.update(req.body, {
		where: {
			id: req.params.id,
		},
	});

	if (!status[0]) {
		return res.status(400).json({
			message: 'Something went wrong!',
		});
	}

	res.status(201).json({
		message: 'Successfully updated!',
	});
};

// @desc    Delete task
// @route   POST /api/tasks/:id
const destroy = async (req, res) => {
	const status = await Task.destroy({
		where: {
			id: req.params.id,
		},
	});

	if (!status) {
		return res.status(400).json({
			message: 'Something went wrong!',
		});
	}

	res.status(200).json({
		message: 'Successfully deleted!',
	});
};

module.exports = {
	index,
	store,
	show,
	update,
	destroy,
};
