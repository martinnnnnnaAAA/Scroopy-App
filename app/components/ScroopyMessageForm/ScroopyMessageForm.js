// import React, { useState } from 'react';

// const ScroopyMessageForm = ({ onClose }) => {
//   const [recipient, setRecipient] = useState('');
//   const [messageBody, setMessageBody] = useState('');
//   const [sendAt, setSendAt] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:6543/messages/send', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           recipient,
//           messageBody,
//           sendAt,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Mensaje enviado:', data.messageSid);
//         alert('Mensaje enviado con éxito!');
//         onClose(); // Cierra el modal después de enviar el mensaje con éxito
//       } else {
//         const errorData = await response.json();
//         alert(`Hubo un error al enviar el mensaje: ${errorData.error}`);
//       }
//     } catch (error) {
//       console.error('Error al enviar el mensaje:', error);
//       alert('Hubo un error al enviar el mensaje.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Número de Teléfono:</label>
//         <input
//           type="text"
//           value={recipient}
//           onChange={(e) => setRecipient(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Mensaje:</label>
//         <textarea
//           value={messageBody}
//           onChange={(e) => setMessageBody(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Fecha y Hora de Envío:</label>
//         <input
//           type="datetime-local"
//           value={sendAt}
//           onChange={(e) => setSendAt(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Enviar</button>
//     </form>
//   );
// };

// export default ScroopyMessageForm;
import React, { useState } from 'react';

const ScroopyMessageForm = ({ onClose }) => {
    const [to, setTo] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:6543/messages/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ to, body }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Mensaje enviado con SID: ${data.sid}`);
                onClose();
            } else {
                throw new Error('Error al enviar el mensaje');
            }
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            alert('Hubo un error al enviar el mensaje.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Enviar Scroopy Message</h2>
            <div>
                <label>Número de Teléfono:</label>
                <input type="text" value={to} onChange={(e) => setTo(e.target.value)} required />
            </div>
            <div>
                <label>Mensaje:</label>
                <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
};

export default ScroopyMessageForm;
