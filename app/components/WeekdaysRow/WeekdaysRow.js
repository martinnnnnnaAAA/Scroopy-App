import React from 'react';
import styles from './WeekdaysRow.module.css';

const weekdays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const WeekdaysRow = () => {
  return (
    <div className={styles.weekdaysRow}>
      {weekdays.map((day, index) => (
        <div key={index} className={styles.weekday}>
          {day}
        </div>
      ))}
    </div>
  );
};

export default WeekdaysRow;