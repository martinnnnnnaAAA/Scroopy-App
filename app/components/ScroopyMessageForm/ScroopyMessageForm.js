import React, { useState } from 'react';

const ScroopyMessageForm = ({ onClose }) => {
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [text, setText] = useState('');
  const [sendAt, setSendAt] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { to, from, text, sendAt };

    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert(`Message scheduled for ${result.sendAt}`);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error scheduling message:', error);
      alert('Failed to schedule message.');
    }
  };

  return (
    <div>
      <h2>Enviar Scroopy Message</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="to">Recipient:</label>
        <input type="text" id="to" name="to" value={to} onChange={(e) => setTo(e.target.value)} required />
        <br />
        <label htmlFor="from">Sender ID:</label>
        <input type="text" id="from" name="from" value={from} onChange={(e) => setFrom(e.target.value)} required />
        <br />
        <label htmlFor="text">Message:</label>
        <textarea id="text" name="text" value={text} onChange={(e) => setText(e.target.value)} required />
        <br />
        <label htmlFor="sendAt">Send At:</label>
        <input type="datetime-local" id="sendAt" name="sendAt" value={sendAt} onChange={(e) => setSendAt(e.target.value)} required />
        <br />
        <button type="submit">Schedule Message</button>
      </form>
    </div>
  );
};

export default ScroopyMessageForm;
