import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function CalendarView({tasks, onDateClick}){
    const calendarEvents = tasks.map(task => ({
        id: task.id,
        title: task.title,
        start: `${task.date}T${task.time}`,
    }));

    return(
        <div className="calendarView-container">
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth" 
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                dateClick={onDateClick}
                events={calendarEvents}
                slotMinTime="00:00:00"
                slotMaxTime="24:00:00"
                nowIndicator={true}
                height="auto"
            />
        </div>
    )
}