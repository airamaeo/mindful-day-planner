import React, { useState, useEffect} from "react";
import axios from 'axios';
import TaskCard from "../components/TaskCard";

export default function Home(){
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {    
        setLoading(true);

        const backendUrl = 'http://localhost:5000/api/tasks';

        axios.get(backendUrl)
            .then((res) => {
                setTasks(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Unable to get task');
                setLoading(false);
            });
    }, []);

    return (
        <div className="home-container">
            <h2>Let's start planning!</h2>
            <TaskCard />
        </div>
    )
}