import React, { useState } from 'react';

const EventForm = () => {
  const [isAllDay, setIsAllDay] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const titulo = event.target.titulo.value;
    const fecha = new Date(event.target.fecha.value).toISOString(); // Convertir la fecha a formato ISO (UTC)
    const horaInicio = isAllDay ? '00:00' : event.target.horaInicio.value;
    const horaFin = isAllDay ? '23:59' : event.target.horaFin.value;
    const descripcion = event.target.descripcion.value;
    const color = event.target.color.value;
    const isAllDayChecked = isAllDay;
    
    const data = {
      titulo,
      fecha,
      horaInicio,
      horaFin,
      color,
      isAllDay: isAllDayChecked,
      descripcion,
      fk_usuario: '1', // Aquí debes colocar el ID del usuario correspondiente
      tipo: '0'    // Aquí debes colocar el tipo de evento adecuado
    };

    try {
        alert("fecha:"+ fecha)
      const response = await fetch(`http://localhost:6543/eventos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        
      });

      const result = await response.json();
      
      if (response.ok) {
        setStatusMessage('Evento agregado exitosamente.');
      } else {
        setStatusMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setStatusMessage('Error en la solicitud.');
      console.error('Error en el fetch:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input type="text" name="titulo" required />
        </label>
        <label>
          Fecha:
          <input type="date" name="fecha" required />
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
          <input
            type="checkbox"
            name="allDay"
            onChange={() => setIsAllDay(!isAllDay)}
          />
        </label>
        <button type="submit">Agregar</button>
      </form>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default EventForm;
