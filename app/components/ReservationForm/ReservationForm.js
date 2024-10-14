// components/ReservationForm/ReservationForm.js
import React, { useState } from 'react';

const ReservationForm = ({ onSubmit, loading, error, onClose }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const reservationData = { name, date, time, guests };
    onSubmit(reservationData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reserva de Mesa</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>
          Nombre:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Fecha:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Hora:
          <select value={time} onChange={(e) => setTime(e.target.value)} required>
            <option value="">Seleccione una hora</option>
            <option value="12:00">12:00 PM</option>
            <option value="19:00">7:00 PM</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Número de Invitados:
          <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} required />
        </label>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Cargando...' : 'Hacer Reserva'}
      </button>
      <button type="button" onClick={onClose}>Cancelar</button>
    </form>
  );
};

export default ReservationForm;
