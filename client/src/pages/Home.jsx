import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import TaskModal from "../components/TaskModal";
import TaskForm from '../components/TaskForm';
import TaskDetailModal from "../components/TaskDetailModal";
import CalendarView from '../components/CalendarView';

export default function Home(){
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [feedbackMsg, setFeedbackMsg] = useState('');

    const [selectedTasks, setSelectedTasks] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formError, setFormError] = useState('');
    const formRef = useRef(null);
    const [editingTask, setEditingTask] = useState(null);

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState('');

    const [recurrence, setRecurrence] = useState("none");
    const [daysOfWeek, setDaysOfWeek] = useState([]);

    const backendUrl = 'http://localhost:5000/api/tasks';

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        setLoading(true);

        axios.get(backendUrl)
            .then((res) => {
                setTasks(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Unable to get tasks');
                setLoading(false);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!title || !date || !time || !type) {
            setFormError('Please add task details');
            return;
        }
    
        try {
            if (editingTask) {
                console.log("Updating task ID:", editingTask.id);
                const taskId = editingTask.id;
                const updatedTaskData = { title, date, time, type, recurrence, daysOfWeek };
    
                const res = await axios.put(`${backendUrl}/${taskId}`, updatedTaskData);
                console.log("Update response:", res.data);
    
                const updatedFromServer = res.data;

                setTasks(prev => prev.map(t => t.id === updatedFromServer.id ? updatedFromServer : t));
            } else {
                const taskData = { title, date, time, type, recurrence, daysOfWeek };
                const response = await axios.post(backendUrl, taskData);
                const payload = response.data;

                const newItems = Array.isArray(payload) ? payload : [payload];
                setTasks(prev => [...prev, ...newItems]);
            }
        } catch (err) {
            console.error(err);
            setFormError("Something went wrong");
        }
    };

    const toggleDayOfWeek = (index) => {
        if (daysOfWeek.includes(index)) {
            setDaysOfWeek(daysOfWeek.filter(day => day !== index));
        } else {
            setDaysOfWeek([...daysOfWeek, index]);
        }
    }

    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`${backendUrl}/${taskId}`);

            const updatedTasks = tasks.filter(task => task.id !== taskId);
            setTasks(updatedTasks);

            localStorage.setItem('favorites', JSON.stringify(updatedTasks));
            setFeedbackMsg('Task deleted');
            setSelectedTasks(null);

            setTimeout(() => setFeedbackMsg(''), 2000);
        } catch (err) {
            console.error('Failed to delete task: ', err);
            setFeedbackMsg('Failed to delete task');
            setTimeout(() => setFeedbackMsg(''), 2000);
        }
    };

    function handleDateClick(arg) {
        const dateTime = new Date(arg.dateStr);
        const isoDate = dateTime.toISOString().split('T')[0];
        const timePart = dateTime.toTimeString().split(':');
        const isoTime = `${timePart[0]}:${timePart[1]}`;

        console.log('Date selected: ', isoDate);
        console.log('Time selected: ', isoTime);

        setDate(isoDate);
        setTime(isoTime);
        setShowForm(true);

        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    const handleTaskClick = (task) => {
        setSelectedTasks(task);
    };

    const handleEditClick = (task) => {
        setSelectedTasks(null);
        setEditingTask(task);
        setTitle(task.title);
        setDate(task.date);
        setTime(task.time);
        setType(task.type);
        setShowForm(true);
    };

    const resetForm = () => {
        setTitle('');
        setDate('');
        setTime('');
        setType('');
        setRecurrence("none");
        setDaysOfWeek([]);
        setFormError('');
        setEditingTask(null);
        setShowForm(false);
    };

    return (
        <div className="home-container">
            <CalendarView 
                tasks={tasks} 
                onDateClick={handleDateClick}
                onTaskClick={handleTaskClick}
            />

            <h2>Let's start planning!</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {feedbackMsg && <p className="feedback-msg">{feedbackMsg}</p>}

            {/* Task Form */}
            {showForm && (
                <TaskModal 
                    open={showForm}
                    onClose={() => {
                        setShowForm(false);
                        setEditingTask(null);
                    }}
                    task={editingTask}
                >
                    <TaskForm
                        title={title}
                        setTitle={setTitle}
                        date={date}
                        setDate={setDate}
                        time={time}
                        setTime={setTime}
                        type={type}
                        setType={setType}
                        recurrence={recurrence}
                        setRecurrence={setRecurrence}
                        daysOfWeek={daysOfWeek}
                        toggleDayOfWeek={toggleDayOfWeek}
                        handleSubmit={handleSubmit}
                        formRef={formRef}
                        formError={formError}
                    />
                </TaskModal>
            )}

            {/* Task Details Modal */}
            {selectedTasks && (
                <TaskDetailModal 
                    task={selectedTasks} 
                    onClose={() => setSelectedTasks(null)}
                    onEdit={handleEditClick}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    );
}
