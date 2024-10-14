// components/ReservationForm/ReservationForm.js
import React, { useState } from 'react';

const ReservationForm = ({ onSubmit }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    const handleSubmit = () => {
        if (date && time) {
            onSubmit({ date, time });
        } else {
            alert("Por favor, selecciona una fecha y una hora.");
        }
    };

    return (
        <div>
            <h2>Reserva en Kansas</h2>
            <label>
                Fecha:
                <select value={date} onChange={handleDateChange}>
                    <option value="">Seleccionar Fecha</option>
                    <option value="2024-10-14">Hoy (14 Oct)</option>
                    <option value="2024-10-15">Mañana (15 Oct)</option>
                    <option value="2024-10-16">Pasado Mañana (16 Oct)</option>
                </select>
            </label>
            <label>
                Hora:
                <select value={time} onChange={handleTimeChange}>
                    <option value="">Seleccionar Hora</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                </select>
            </label>
            <button onClick={handleSubmit}>Reservar</button>
        </div>
    );
};

export default ReservationForm;
