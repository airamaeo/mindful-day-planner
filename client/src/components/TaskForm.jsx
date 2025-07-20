import React from "react";

export default function TaskForm({
    title, setTitle,
    date, setDate,
    time, setTime,
    type, setType,
    handleSubmit,
    formRef,
    formError
}){

    return(
        <div className="taskForm-container">
            <form onSubmit={handleSubmit} id="addtask-container" className="addtask-container" ref={formRef}>
                <label>Task:</label>
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <label>Date:</label>
                <input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <br />
                <label>Time:</label>
                <input 
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <br />
                <label>Type:</label>
                <select 
                    name="type-options" 
                    id="type-options"
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="">Select type</option>
                    <option value="Personal">Personal</option>
                    <option value="Family">Family</option>
                    <option value="Birthdays">Birthdays</option>
                    <option value="Events">Events</option>
                    <option value="Work">Work</option>
                </select>
                <br />
                {formError && <p className="form-error">{formError}</p>}
                <button type='submit' className='saveTask-Btn'>Save</button>
            </form>

        </div>
    )
}