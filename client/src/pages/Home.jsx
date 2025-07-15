import React from "react";
import TaskCard from "../components/TaskCard";

export default function Home(){
    return (
        <div className="home-container">
            <h2>Let's start planning!</h2>
            <TaskCard />
        </div>
    )
}