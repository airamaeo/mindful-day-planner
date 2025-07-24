import React, {useEffect} from "react"

export default function TaskDetailModal({task, onClose}){    
    if(!task) {
        return null;
    };

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape'){
                onClose();
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => {
            window.removeEventListener('keydown', handleKey);
    }}, [onClose]);
    
    return (
        <div className="taskDetail-overlay" onClick={onClose}>
            <div 
                className="taskDetail-content"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="taskDetail-close-btn" onClick={onClose}>
                    X
                </button>
                <h2>{task.title}</h2>
                <p>{task.date}</p>
                <p>{task.time}</p>
                <p>{task.type}</p>
            </div>
        </div>
    )
}