"use client";
import React, { useState } from 'react';
import Button from './components/Button/Button';
import Calendario from './components/Calendario/Calendario';
import Modal from './components/Modal/Modal';
import EventForm from './components/EventForm/EventForm';
import NavBar from './components/NavBar/NavBar';
import ScroopyMessageForm from './components/ScroopyMessageForm/ScroopyMessageForm';
import ReservationForm from './components/ReservationForm/ReservationForm'; // Importa el nuevo componente
import { useReservation } from '../hooks/useReservation';
import { useEvents } from '@/hooks/useEvents';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false); // Nuevo estado para el modal de reservas
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

  const handleOpenReservationModal = () => { // Maneja la apertura del modal de reservas
    setIsReservationModalOpen(true);
  };

  const handleCloseReservationModal = () => { // Maneja el cierre del modal de reservas
    setIsReservationModalOpen(false);
  };

  const handleAddEvent = (event) => {
    alert(`Evento agregado: ${event.titulo} el ${event.fecha}`);
    handleCloseModal();
  };

  const handleMakeReservation = async ({ date, time }) => {
    await useReservation(date, time); // Lógica de reserva que usará el scraping
    alert(`Reserva hecha para el ${date} a las ${time}`);
    handleCloseReservationModal();
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
        <NavBar 
          year={year} 
          month={month} 
          onMonthChange={handleMonthChange} 
          onYearChange={handleYearChange} 
          direccionA="calendario" 
        />
        <Button text="Agregar Evento" onClick={() => handleOpenModal(<EventForm onSubmit={handleAddEvent} />)} />
        <Button text="Enviar Scroopy Message" onClick={handleOpenMessageModal} />
        <Button text="Reservar en Kansas" onClick={handleOpenReservationModal} /> {/* Nuevo botón para reservas */}
      </header>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
      <Modal isOpen={isMessageModalOpen} onClose={handleCloseMessageModal}>
        <ScroopyMessageForm onClose={handleCloseMessageModal} />
      </Modal>
      <Modal isOpen={isReservationModalOpen} onClose={handleCloseReservationModal}> {/* Nuevo modal para reservas */}
        <ReservationForm onSubmit={handleMakeReservation} />
      </Modal>
      <Calendario year={year} month={month} events={EventosDeUsuario} />
    </div>
  );
};

export default Home;
