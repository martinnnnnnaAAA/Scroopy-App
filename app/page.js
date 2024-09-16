// "use client";
// import React, { useState } from 'react';
// import Button from './components/Button/Button';
// import Calendario from './components/Calendario/Calendario';
// import Modal from './components/Modal/Modal';
// import EventForm from './components/EventForm/EventForm';
// import NavBar from './components/NavBar/NavBar';
// import ScroopyMessageForm from './components/ScroopyMessageForm/ScroopyMessageForm'; // Importa el nuevo componente
// import { useEvents } from '@/hooks/useEvents'; // Asegúrate de que esta ruta sea correcta
// import EventScroopyMessage from './components/EventScroopyMessage/EventScroopyMessage';

// const Home = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isMessageModalOpen, setIsMessageModalOpen] = useState(false); // Nuevo estado para el modal de mensajes
//   const [modalContent, setModalContent] = useState(null); // Estado para el contenido del modal
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [month, setMonth] = useState(new Date().getMonth());
//   const { EventosDeUsuario } = useEvents({ id: 1 });

//   const handleOpenModal = (content) => {
//     setModalContent(content); // Establece el contenido del modal
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setModalContent(null); // Limpia el contenido del modal al cerrar
//   };

//   const handleOpenMessageModal = () => { // Maneja la apertura del modal de mensajes
//     setIsMessageModalOpen(true);
//   };

//   const handleCloseMessageModal = () => { // Maneja el cierre del modal de mensajes
//     setIsMessageModalOpen(false);
//   };

//   const handleAddEvent = (event) => {
//     alert(`Evento agregado: ${event.titulo} el ${event.fecha}`);
//     handleCloseModal();
//   };

//   const handleMonthChange = (newMonth) => {
//     setMonth(newMonth);
//   };

//   const handleYearChange = (newYear) => {
//     setYear(newYear);
//   };

//   return (
//     <div className="App">
//       <header>
//         <NavBar 
//           year={year} 
//           month={month} 
//           onMonthChange={handleMonthChange} 
//           onYearChange={handleYearChange} 
//           direccionA="Calendario" 
//         />
//         <Button text="Agregar Evento" onClick={() => handleOpenModal(<EventForm onSubmit={handleAddEvent} />)} />
//         <Button text="Enviar Scroopy Message" onClick={() => handleOpenMessageModal()} /> {/* Nuevo botón */}
//       </header>
//       <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
//         {modalContent}
//       </Modal>
//       <Modal isOpen={isMessageModalOpen} onClose={handleCloseMessageModal}> {/* Nuevo modal para mensajes */}
//         <h2>Enviar Scroopy Message</h2>
//         <ScroopyMessageForm onClose={handleCloseMessageModal} /> {/* Componente de formulario de mensajes */}
//       </Modal>
//       <Calendario year={year} month={month} events={EventosDeUsuario} />
//     </div>
//   );
// };

// export default Home;


// pages/index.js
"use client";
import React, { useState } from 'react';
import Button from './components/Button/Button';
import Calendario from './components/Calendario/Calendario';
import Modal from './components/Modal/Modal';
import EventForm from './components/EventForm/EventForm';
import NavBar from './components/NavBar/NavBar';
import ScroopyMessageForm from './components/ScroopyMessageForm/ScroopyMessageForm';
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

  return (
    <div className="App">
      <header>
        <NavBar 
          year={year} 
          month={month} 
          onMonthChange={handleMonthChange} 
          onYearChange={handleYearChange} 
          direccionA="Calendario" 
        />
        <Button text="Agregar Evento" onClick={() => handleOpenModal(<EventForm onSubmit={handleAddEvent} />)} />
        <Button text="Enviar Scroopy Message" onClick={handleOpenMessageModal} />
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

