// Describes what a task looks like
// Task title, time and type
// To help with using a real database

const tasks = [];

// Function to get all tasks
function getAllTasks() {
    return tasks;
};

// Function to add a new task
function addTask(task) {
    // To check for required fields
    if (!task.title || !task.time || !task.type) {
        throw new Error("Missing task details: title, time or type");
    }

    // Create new task with a uniquee id 
    const newTask = {
        id: Date.now().toString(), 
        title: task.title,
        time: task.time,
        type: task.type,
    };

    // Add to tasks array
    tasks.push(newTask);

    // Return new task
    return newTask;
};

// Function to delete a task by ID
function deleteTask(taskId) {

};

// Export the functions so other files can use them
module.exports = {
    getAllTasks,
    addTask,
    deleteTask,
};