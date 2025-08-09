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
        id: `${Date.now().toString()}-${Math.random().toString(36).slice(2,6)}`, 
        title: task.title,
        date: task.date,
        time: task.time,
        type: task.type,
        recurrence: task.recurrence || "none",
        daysOfWeek: Array.isArray(task.daysOfWeek) ? task.daysOfWeek : [],
    };

    // Add to tasks array
    tasks.push(newTask);

    // // Generate extra tasks if it's recurring
    // if(newTask.recurrence !== "none"){
    //     const recurrences = generateRecurringTasks(newTask);
    //     tasks.push(...recurrences);
    // }

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
function generateRecurringTasks(task) {
    if (!task || !task.date) return [];

    const results = [];
    const startDate = new Date(task.date);

    const makeOccurrence = (dateObj) => ({
        id: `${Date.now().toString()}-${Math.random().toString(36).slice(2,6)}`,
        title: task.title,
        date: dateObj.toISOString().split('T')[0],
        time: task.time,
        type: task.type,
        recurrence: "none",
        daysOfWeek: [],
    });

    // Daily: next 7 days
    if (task.recurrence === 'daily') {
        for (let i = 1; i <= 7; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        results.push(makeOccurrence(d));
        }
    }

    // Weekly: next 12 weeks for specified daysOfWeek
    if (task.recurrence === 'weekly' && Array.isArray(task.daysOfWeek) && task.daysOfWeek.length) {
        for (let w = 0; w < 12; w++) {
        const weekBase = new Date(startDate);
        weekBase.setDate(startDate.getDate() + w * 7);

        task.daysOfWeek.forEach((dayIndex) => {
            const occ = new Date(weekBase);
            // move to the requested weekday within this week
            const diff = (dayIndex - occ.getDay() + 7) % 7;
            occ.setDate(occ.getDate() + diff);
            // only include occurrences after the original date
            if (occ > startDate) results.push(makeOccurrence(occ));
        });
        }
    }

    // Monthly: next 6 months, same day-of-month (fallback behavior will adjust for short months)
    if (task.recurrence === 'monthly') {
        for (let m = 1; m <= 6; m++) {
        const d = new Date(startDate);
        d.setMonth(startDate.getMonth() + m);
        results.push(makeOccurrence(d));
        }
    }

    return results;
}

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