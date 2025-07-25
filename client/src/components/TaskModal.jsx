import React, { useEffect } from "react";
import '../styles/TaskModal.css';

export default function TaskModal({onClose, open, children}){
    if(!open) {
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
        <div className="taskModal-overlay" onClick={onClose}>
            <div 
                className="taskModal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="taskModal-close-btn" onClick={onClose}>
                    X
                </button>
                {children}
            </div>
        </div>
    )
}