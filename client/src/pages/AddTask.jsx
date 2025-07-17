import React from "react"
import { useState } from "react";

export default function AddTask(){
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents default form submission

        if(!title || !date || !time || !type){
            alert('Please enter the task details');
            return; 
        }
    }

    return(
        <div className="addtask-container">
            <form onSubmit={handleSubmit}>
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
        </div>
    )
}