"use client";
import React, { useState } from 'react';
import Button from './components/Button/Button';
import Calendario from './components/Calendario/Calendario';
import Modal from './components/Modal/Modal';
import EventForm from './components/EventForm/EventForm';
import NavBar from './components/NavBar/NavBar';
import { useEvents } from '@/hooks/useEvents'; // Asegúrate de que esta ruta sea correcta
import EventScroopyMessage from './components/EventScroopyMessage/EventScroopyMessage';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(''); // Estado para controlar el contenido del modal
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const { EventosDeUsuario } = useEvents({ id: 1 });

  const handleOpenModal = (content) => {
    setModalContent(content); // Establece el contenido del modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(''); // Opcional: Limpiar el contenido cuando se cierra el modal
  };

  const handleAddEvent = (event) => {
    // Aquí puedes manejar el evento agregado
    alert(`Evento agregado: ${event.titulo} el ${event.fecha}`);
    handleCloseModal();
  };

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
  };

  const handleYearChange = (newYear) => {
    setYear(newYear);
  };

  return (
    <div className="App">
      <header>
        <NavBar year={year} month={month} onMonthChange={handleMonthChange} onYearChange={handleYearChange} direccionA="Calendario" />
        <Button text="Agregar Evento" onClick={() => handleOpenModal('eventForm')} />
        <Button text="Programar Mensaje" onClick={() => handleOpenModal('eventScroopyMessage')} />
      </header>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {modalContent === 'eventForm' && (
          <>
            <h2>Agregar Evento</h2>
            <EventForm onSubmit={handleAddEvent} />
          </>
        )}
        {modalContent === 'eventScroopyMessage' && (
          <>
            <h2>Programar Mensaje</h2>
            <EventScroopyMessage />
          </>
        )}
      </Modal>
      <Calendario year={year} month={month} events={EventosDeUsuario} />
    </div>
  );
};

export default Home;
