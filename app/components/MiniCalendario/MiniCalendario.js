"use client";
import React from 'react';
import MiniDia from '../MiniDia/MiniDia';
import MiniNombreDia from '../MiniNombreDia/MiniNombreDia';
import styles from './MiniCalendario.module.css';

const MiniCalendario = ({ days }) => {
  const nombresDias = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className={styles.miniCalendario}>
      <div className={styles.miniNombreDias}>
        {nombresDias.map((nombre, index) => (
          <MiniNombreDia key={index} nombre={nombre} />
        ))}
      </div>
      <div className={styles.miniDias}>
        {days.map((day, index) => (
          <MiniDia key={index} day={day} />
        ))}
      </div>
    </div>
  );
};

export default MiniCalendario;