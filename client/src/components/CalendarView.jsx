import React from "react"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"

export default function CalendarView({tasks, onDateClick}){
    const calendarEvents = tasks.map(task => ({
        id: task.id,
        title: task.title,
        start: `${task.date}T${task.time}`,
    }));

    return(
        <div className="calendarView-container">
            <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth" 
                dateClick={onDateClick}
                events={calendarEvents}
            />
        </div>
    )
}