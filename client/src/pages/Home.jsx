import React, { useState, useEffect} from "react";
import axios from 'axios';
import TaskCard from "../components/TaskCard";
import { Link } from 'react-router-dom';

export default function Home(){
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [feedbackMsg, setFeedbackMsg] = useState('');

    useEffect(() => {    
        setLoading(true);

        const backendUrl = 'http://localhost:5000/api/tasks';

        axios.get(backendUrl)
            .then((res) => {
                setTasks(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Unable to get tasks');
                setLoading(false);
            });
    }, []);

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

    return (
        <div className="home-container">
            <h2>Let's start planning!</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <Link to="/tasks">Add a new task</Link>

            {tasks.map(task => (
                <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    date={task.date}
                    time={task.time}
                    type={task.type}
                    onDelete={handleDelete}
                />
            ))}

            {feedbackMsg && <p className="feedback-msg">{feedbackMsg}</p>}
        </div>
    )
}