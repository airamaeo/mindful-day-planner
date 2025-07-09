// Sets up the URLs (endpoints) for tasks
// Connects each URL to a function that handles what to do
// E.g. GET /api/tasks -> shows all tasks

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.delete('/tasks/:id', taskController.deleteTask);
router.put('/tasks/:id', taskController.updateTask);

module.exports = router;