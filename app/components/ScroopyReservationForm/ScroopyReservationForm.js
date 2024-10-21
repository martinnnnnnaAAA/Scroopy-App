import React, { useState } from "react";
import { useReservation } from "@/hooks/useReservation";

const ScroopyReservationForm = ({ onClose }) => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [guest, setGuest] = useState("");
  const [time, setTime] = useState("12%3A00");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const { makeReservation } = useReservation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      date,
      location,
      guest,
      time,
      first_name,
      last_name,
      email,
      telephone,
    };

    try {
      const success = await makeReservation(formData);
      if (success) {
        alert("Reserva realizada con éxito.");
      } else {
        alert("Error al realizar la reserva.");
      }
    } catch (error) {
      alert("Error al realizar la reserva: " + error.message);
    }
  };

  return (
    <div>
      <h2>Realizar Scroopy Reserva</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Fecha:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br />
        <label htmlFor="location">Ubicacion:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <br />
        <label htmlFor="guest">Cantidad de personas:</label>
        <input
          type="number"
          id="guest"
          name="guest"
          value={guest}
          onChange={(e) => setGuest(e.target.value)}
          required
        />
        <br />
        <label htmlFor="time">Selecciona una hora:</label>
        <select
          id="time"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        >
          <option value="12%3A00">12:00</option>
          <option value="19%3A00">19:00</option>
        </select>

        <br />
        <label htmlFor="first_name">Nombre:</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="last_name">Apellido:</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="telephone">Telefono:</label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          required
        />
        <br />
        <button type="submit">Agendar Reserva</button>
      </form>
    </div>
  );
};

export default ScroopyReservationForm;
