import React from 'react';
import styles from './Header.module.css';

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const Header = ({ year, month, onMonthChange, onYearChange }) => {
  const handleMonthChange = (e) => {
    onMonthChange(Number(e.target.value));
  };

  const handleYearChange = (e) => {
    onYearChange(Number(e.target.value));
  };

  return (
    <div className={styles.header}>
      <select className={styles.select} value={month} onChange={handleMonthChange}>
        {months.map((monthName, index) => (
          <option key={index} value={index}>{monthName}</option>
        ))}
      </select>
      <input className={styles.input} type="number" value={year} onChange={handleYearChange} />
    </div>
  );
};

export default Header;
