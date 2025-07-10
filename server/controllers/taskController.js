// Holds the functions that decide how to handle each request
// E.g. What to do when someone wants to see tasks or add one
// Communicates to the service file to get or change the data
const taskService = require('../services/taskService');

function addTask(req, res){
    try {
        const task = req.body;
        console.log(task);
        
        if(!task){
            return res.status(400).json({error: 'Task input is required'});
        } 
        const newTask = taskService.addTask(task);

        return res.status(201).json(newTask);
    } catch (error) {
        console.error('Error in adding task:', error.message);
        res.status(500).json({error: 'Failed to add task'});
    }
}

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
    addTask,
    getAllTasks,
    deleteTask,
    updateTask,
};