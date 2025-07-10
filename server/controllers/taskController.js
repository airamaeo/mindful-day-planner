// Holds the functions that decide how to handle each request
// E.g. What to do when someone wants to see tasks or add one
// Communicates to the service file to get or change the data
const taskService = require('../services/taskService');

function getAllTasks(req, res){
    const tasks = taskService.getAllTasks();

    return res.status(200).json(tasks);
}

function deleteTask(req, res){
    const taskId = req.params.id;

    const result = taskService.deleteTask(taskId);

    if (!result.success) {
        return res.status(404).json({ message: result.message });
    }

    return res.status(200).json({ message: result.message });
}

function updateTask(req, res){
    const id = req.params.id;
    const updatedData = req.body;

    const result = taskService.updateTask(id, updatedData);

    if (!result.success) {
        return res.status(404).json({ message: result.message });
    }

    return res.status(200).json({ message: result.message });
}

module.exports = {
    getAllTasks,
    deleteTask,
    updateTask,
};