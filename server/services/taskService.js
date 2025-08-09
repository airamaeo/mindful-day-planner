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
    if (!task.title || !task.date || !task.time || !task.type) {
        throw new Error("Missing task details: title, date, time or type");
    }

    // Create new task with a uniquee id 
    const newTask = {
        id: Date.now().toString(), 
        title: task.title,
        date: task.date,
        time: task.time,
        type: task.type,
        recurrence: task.recurrence || "none",
        daysOfWeek: task.daysOfWeek || [],
    };

    // Add to tasks array
    tasks.push(newTask);

    // Generate extra tasks if it's recurring
    if(newTask.recurrence !== "none"){
        const recurrences = generateRecurringTasks(newTask);
        tasks.push(...recurrences);
    }

    // Return new task
    return newTask;
};

// Function to delete a task by ID
function deleteTask(taskId) {
    const index = tasks.findIndex(task => task.id === taskId);

    if(index === -1) {
        return {success: false, message: "Task not found"};
    }

    tasks.splice(index, 1);
    return {success: true, message: "Task deleted successfully"};
};

// Function to edit an existing task
function updateTask(id, updatedTask){
    const index = tasks.findIndex(task => task.id === id);

    if(index === -1) {
        return {success: false, message: "Task not found"};
    }

    tasks[index] = {
        ...tasks[index],
        ...updatedTask
    }
    
    return {success: true, message: "Task updated successfully"};
}

// Function to generate recurring tasks/ events
function generateRecurringTasks(task){
    const newTasks = [];
    const startDate = new Date(task.date);

    // Generating tasks for daily occurence
    if(task.recurrence === 'daily'){
        for(let i = 1; i <= 5; i++){
            const newDate = new Date(startDate);

            newDate.setDate(startDate.getDate() + i);

            newTasks.push({
                ...task,
                id: Date.now().toString() + i,
                date: newDate.toISOString().split('T')[0]
            });
        }
    };

    // Generating tasks for weekly occurence
    if(task.recurrence === 'weekly' && Array.isArray(task.daysOfWeek)){
        for(let i = 1; i <= 4; i++){
            task.daysOfWeek.forEach(dayIndex => {
                const newDate = new Date(startDate);

                newDate.setDate(startDate.getDate() + ((7 * i) + (dayIndex - startDate.getDay())));

                newTasks.push({
                    ...task,
                    id: Date.now().toString() + i + dayIndex,
                    date: newDate.toISOString().split('T')[0]
                });                
            })
        }
        return newTasks;
    };    

    // Generating tasks for monthly occurence
    if(recurrence === 'monthly'){
        for(let i = 1; i <= 12; i++){
            const taskDate = new Date(newDate);
            taskDate.setMonth(newDate.getMonth() + i);
            
            recurringTasks.push({
                title,
                date: taskDate.toISOString().split('T')[0],
                time,
                type,
                recurrence,
            });            
        }
    };
    return recurringTasks;      
};

// Function to get the next weekday - for weekly recurrence
function getNextWeekday(currentDate, targetDayIndex){
    let dayOfWeek = currentDate.getDay();
    const diff = (targetDayIndex - dayOfWeek + 7) % 7;
    
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + diff);

    return nextDate
};


// Export the functions so other files can use them
module.exports = {
    getAllTasks,
    addTask,
    deleteTask,
    updateTask,
    generateRecurringTasks,
};