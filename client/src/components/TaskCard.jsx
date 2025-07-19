import React from 'react';

export default function TaskCard({id, title, date, time, type, onDelete}){
    return(
        <div className="taskcard-container">
            <h2>{title}</h2>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
            <p>Type: {type}</p>
            <button onClick={() => onDelete(id)}>Delete Task</button>            
        </div>
    )
}