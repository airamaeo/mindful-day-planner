import React from "react";
import '../styles/TaskModal.css';

export default function TaskModal({onClose, open, children}){
    if(!open) {
        return null;
    };

    return (
        <div className="taskModal-overlay" onClick={onClose}>
            <div 
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close-btn" onClick={onClose}>
                    X
                </button>
                {children}
            </div>
        </div>
    )
}