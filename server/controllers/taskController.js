// Holds the functions that decide how to handle each request
// E.g. What to do when someone wants to see tasks or add one
// Communicates to the service file to get or change the data
const taskService = require('../services/taskService');

function addTask(req, res){
    try {
        const task = req.body;
        if (!task) {
            return res.status(400).json({ error: 'Task input is required' });
        }

        // Add the base task
        const created = taskService.addTask(task);
        const createdItems = [created];

        // If recurrence specified, generate and add occurrences
        if (task.recurrence && task.recurrence !== 'none') {
            const occurrences = taskService.generateRecurringTasks(task);
            occurrences.forEach((occ) => {
            taskService.addTask(occ); // each occurrence has recurrence: 'none'
            });
            createdItems.push(...occurrences);
        }

        // Return either single object or array (client handles both)
        return res.status(201).json(createdItems.length === 1 ? createdItems[0] : createdItems);
    } catch (error) {
        console.error('Error in adding task:', error);
        return res.status(500).json({ error: error.message || 'Failed to add task' });
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

    return res.status(200).json({ message: result.updatedTask });
}

module.exports = {
    addTask,
    getAllTasks,
    deleteTask,
    updateTask,
};