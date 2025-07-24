import React from "react"

export default function TaskDetailModal({task, onClose}){    
    if(!task) {
        return null;
    };

    return (
        <div className="taskDetail-overlay" onClick={onClose}>
            <div 
                className="taskDetail-content"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="taskDetail-close-btn" onClick={onClose}>
                    X
                </button>
                <p>{task.date}</p>
                <p>{task.time}</p>
                <p>{task.type}</p>
            </div>
        </div>
    )
}