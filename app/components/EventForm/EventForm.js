import React, { useState } from 'react';

const EventForm = ({ onSubmit }) => {
  const [isAllDay, setIsAllDay] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const titulo = event.target.titulo.value;
    const fecha = new Date(event.target.fecha.value); // Convertir la fecha a un objeto Date
    const horaInicio = isAllDay ? '00:00' : event.target.horaInicio.value;
    const horaFin = isAllDay ? '23:59' : event.target.horaFin.value;
    const descripcion = event.target.descripcion.value;
    const color = event.target.color.value;
    
    onSubmit({
      titulo,
      fecha: fecha.toISOString(), // Almacenar en formato ISO (UTC)
      horaInicio,
      horaFin,
      descripcion,
      color,
      isAllDay
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input type="text" name="titulo" required />
      </label>
      <label>
        Fecha:
        <input type="fecha" name="fecha" required />
      </label>
      <label>
        Hora de comienzo:
        <input type="time" name="horaInicio" disabled={isAllDay} required={!isAllDay} />
      </label>
      <label>
        Hora de fin:
        <input type="time" name="horaFin" disabled={isAllDay} required={!isAllDay} />
      </label>
      <label>
        Descripción:
        <textarea name="descripcion" required />
      </label>
      <label>
        Color:
        <input type="color" name="color" required />
      </label>
      <label>
        Todo el día:
        <input type="checkbox" name="allDay" onChange={() => setIsAllDay(!isAllDay)} />
      </label>
      <button type="submit">Agregar</button>
    </form>
  );
};

export default EventForm;
