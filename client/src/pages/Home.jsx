import React, { useState, useEffect} from "react";
import axios from 'axios';
import TaskModal from "../components/TaskModal";
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import CalendarView from '../components/CalendarView';
import { useRef } from "react";
import TaskDetailModal from "../components/TaskDetailModal";

export default function Home(){
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [feedbackMsg, setFeedbackMsg] = useState('');

    const [selectedTasks, setSelectedTasks] = useState(null);

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState('');

    const [showForm, setShowForm] = useState(false);
    const [formError, setFormError] = useState('');
    const formRef = useRef(null);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!title || !date || !time || !type){
            setFormError('Please add task details');
            return;
        }
        setFormError("");

        axios.post(backendUrl, {
            title,
            date,
            time,
            type
        })
            .then((res) => {
                setTasks([...tasks, res.data]);
                setTitle('');
                setDate('');
                setTime('');
                setType('');
                setFeedbackMsg('Task Added');
                setTimeout(() => setFeedbackMsg(''), 2000);
                setShowForm(false);
            })
            .catch((err) => {
                setError('Error in adding tasks');
            });
    }

    const handleDelete = (taskId) => {
        axios.delete(`http://localhost:5000/api/tasks/${taskId}`)
            .then(() => {
                const updated = tasks.filter(t => t.id !== taskId);
                setTasks(updated);
                localStorage.setItem('favorites', JSON.stringify(updated));
                setFeedbackMsg('Task Deleted');
                setTimeout(() => setFeedbackMsg(''), 2000);
            })
    };

    const handleDateClick = (arg) => {
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
    };

    return (
        <div className="home-container">
            <CalendarView 
                tasks={tasks} 
                onDateClick={handleDateClick}
                onTaskClick={(task) => setSelectedTasks(task)}
            />

            <h2>Let's start planning!</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {feedbackMsg && <p className="feedback-msg">{feedbackMsg}</p>}

            {/* Task Form */}
            {showForm && (
                <TaskModal 
                    open={showForm}
                    onClose={() => setShowForm(false)}
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
                        handleSubmit={handleSubmit}
                        formRef={formRef}
                        formError={formError}
                    />
                </TaskModal>
            )}

            {/* Task List */}
            {selectedTasks && (
                <TaskDetailModal 
                    task={selectedTasks} 
                    onClose={() => setSelectedTasks(null)}
                />
            )}
        </div>
    )
}
