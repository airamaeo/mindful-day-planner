import React from 'react';

export default function TaskCard({title, date, time, type}){
    return(
        <div className="taskcard-container">
            <h2>{title}</h2>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
            <p>TYpe: {type}</p>
        </div>
    )
}