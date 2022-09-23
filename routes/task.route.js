const router = require('express').Router();
const {
	index,
	store,
	destroy,
	update,
	show,
} = require('../controllers/task.controller.js');

// router.route('/').get(index).post(store);
// router.route('/:id').get(show).delete(destroy).put(update);

router.get('/', index);

router.post('/', store);

router.get('/:id', show);

router.put('/:id', update);

router.delete('/:id', destroy);

module.exports = router;
