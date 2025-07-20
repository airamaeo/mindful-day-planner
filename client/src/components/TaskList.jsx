import React from "react";
import TaskCard from "./TaskCard";

export default function TaskList({tasks, onDelete}) {
    return (
        <div className="taskList-container">
            {tasks.map(task => (
                <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    date={task.date}
                    time={task.time}
                    type={task.type}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}