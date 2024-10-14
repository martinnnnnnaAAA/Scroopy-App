"use client";
import React, { useState } from 'react';
import Button from './components/Button/Button';
import Calendario from './components/Calendario/Calendario';
import Modal from './components/Modal/Modal';
import EventForm from './components/EventForm/EventForm';
import NavBar from './components/NavBar/NavBar';
import ScroopyMessageForm from './components/ScroopyMessageForm/ScroopyMessageForm';
import { useReservation } from '../hooks/useReservation';
import { useEvents } from '@/hooks/useEvents';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const { EventosDeUsuario } = useEvents({ id: 1 });

  const handleOpenModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleOpenMessageModal = () => {
    setIsMessageModalOpen(true);
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
  };

  const handleAddEvent = (event) => {
    alert(`Evento agregado: ${event.titulo} el ${event.fecha}`);
    handleCloseModal();
  };

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
  };

  const handleYearChange = (newYear) => {
    setYear(newYear);
  };

  const handleReservation = async () => {
    try {
      const success = await useReservation();
      if (success) {
        alert("Reserva realizada con éxito.");
      } else {
        alert("Error al realizar la reserva!!.");
      }
    } catch (error) {
      alert("Error al realizar la reserva!!.");
    }
  };

  return (
    <div className="App">
      <header>
        <NavBar 
          year={year} 
          month={month} 
          onMonthChange={handleMonthChange} 
          onYearChange={handleYearChange} 
          direccionA="calendario" 
        />
        <Button text="Agregar Evento" onClick={() => handleOpenModal(<EventForm onSubmit={handleAddEvent} />)} />
        <Button text="Enviar Scroopy Message" onClick={handleOpenMessageModal} />
        <Button text="Hacer Reserva" onClick={handleReservation} />
      </header>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
      <Modal isOpen={isMessageModalOpen} onClose={handleCloseMessageModal}>
        <ScroopyMessageForm onClose={handleCloseMessageModal} />
      </Modal>
      <Calendario year={year} month={month} events={EventosDeUsuario} />
    </div>
  );
};

export default Home;
