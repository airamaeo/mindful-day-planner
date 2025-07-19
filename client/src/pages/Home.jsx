import React, { useState, useEffect} from "react";
import axios from 'axios';
import TaskCard from "../components/TaskCard";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import { useRef } from "react";

export default function Home(){
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [feedbackMsg, setFeedbackMsg] = useState('');

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState('');

    const [showForm, setShowForm] = useState(false);
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
            alert('Please add task details');
            return;
        }

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

    const calendarEvents = tasks.map(task => ({
        id: task.id,
        title: task.title,
        start: `${task.date}T${task.time}`,
    }));

    const handleDateClick = (arg) => {
        alert(arg.dateStr);
        setShowForm(true);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="home-container">
            <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth" 
                dateClick={handleDateClick}
                events={calendarEvents}
            />

            <h2>Let's start planning!</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {feedbackMsg && <p className="feedback-msg">{feedbackMsg}</p>}

            {/* AddTask Form */}
            {showForm && (
                <form onSubmit={handleSubmit} id="addtask-container" className="addtask-container" ref={formRef}>
                    <label>Task:</label>
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <br />
                    <label>Date:</label>
                    <input 
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <br />
                    <label>Time:</label>
                    <input 
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <br />
                    <label>Type:</label>
                    <input 
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                    <br />
                    <button type='submit' className='saveTask-Btn'>Save</button>
                </form>
            )}

            {/* Task List */}
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
        </div>
    )
}