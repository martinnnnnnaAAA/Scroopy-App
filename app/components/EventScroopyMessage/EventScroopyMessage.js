import React, { useState } from 'react';

const EventScroopyMessage = () => {
  const [isAllDay, setIsAllDay] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const titulo = event.target.titulo.value;
    const destinatario = event.target.destinatario.value;
    const mensaje = event.target.mensaje.value;
    const fecha = new Date(event.target.fecha.value); // Convertir la fecha a un objeto Date
    const hora = new Date(`${event.target.fecha.value}T${event.target.hora.value}`); // Combinar fecha y hora
    const color = event.target.color.value;
  
    // Enviar la información al backend
    try {
      const response = await fetch('/api/schedule-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo,
          destinatario,
          mensaje,
          fecha: fecha.toISOString(), // Almacenar en formato ISO (UTC)
          hora: hora.toISOString(),
          color,
          isAllDay
        }),
      });
  
      const result = await response.json(); // Obtener la respuesta JSON
  
      if (response.ok) {
        alert('Mensaje programado con éxito');
      } else {
        alert(`Error al programar el mensaje: ${result.error || 'Desconocido'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error al programar el mensaje: ${error.message}`);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input type="text" name="titulo" required />
      </label>
      <label>
        Destinatario:
        <input type="text" name="destinatario" required />
      </label>
      <label>
        Mensaje:
        <textarea name="mensaje" required />
      </label>
      <label>
        Fecha:
        <input type="date" name="fecha" required />
      </label>
      <label>
        Hora:
        <input type="time" name="hora" required />
      </label>
      <label>
        Color:
        <input type="color" name="color" required />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default EventScroopyMessage;