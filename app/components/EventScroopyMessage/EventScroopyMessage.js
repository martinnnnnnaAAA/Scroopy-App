
/*Obtener Tokens y Datos de Telegram
Para enviar mensajes a Telegram, necesitas un bot token y el chat ID del destinatario.

Obtener el Token del Bot

Crea un Bot en Telegram:
Abre Telegram y busca el bot @BotFather.
Inicia una conversación con @BotFather y usa el comando /newbot.
Sigue las instrucciones para crear tu bot. Obtendrás un token de API. Guarda este token; lo necesitarás para autenticar las solicitudes a la API de Telegram.
Obtener el Chat ID del Destinatario

Método para Obtener el Chat ID:
Envía un mensaje a tu bot en Telegram.
Luego, puedes usar el siguiente método para obtener el chat_id:
Realiza una solicitud GET a https://api.telegram.org/bot<YOUR_TELEGRAM_BOT_TOKEN>/getUpdates en tu navegador o usando una herramienta como Postman.
En la respuesta JSON, busca el campo "chat": {"id": <CHAT_ID>}. Este es el chat_id que debes usar para enviar mensajes a ese usuario.
Resumen
En Next.js:

Formulario: Asegúrate de que el formulario envíe los datos correctos a tu endpoint API en Node.js.
En Node.js:

Servidor Express: Configura el endpoint para recibir solicitudes.
Controlador: Maneja las solicitudes entrantes.
Servicio: Contiene la lógica de negocio para la programación de mensajes.
Utilidades: Usa node-cron para programar el envío de mensajes.
Telegram:

Obtén el Token del Bot a través de @BotFather.
Obtén el Chat ID de los destinatarios para enviarles mensajes.
Con estos pasos, deberías tener todo configurado para programar y enviar mensajes a través de Telegram usando tu aplicación Next.js y Node.js. Si tienes alguna pregunta o necesitas más ayuda, no dudes en preguntar. */
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

      if (response.ok) {
        alert('Mensaje programado con éxito');
      } else {
        alert('Error al programar el mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al programar el mensaje');
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