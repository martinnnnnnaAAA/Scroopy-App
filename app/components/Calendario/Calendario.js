import React from 'react';
import WeekdaysRow from '../WeekdaysRow/WeekdaysRow';
import MonthDaysGrid from '../MonthDaysGrid/MonthDaysGrid';
import styles from './Calendario.module.css';

const Calendario = ({ year, month, events }) => {
  return (
    <div className={styles.calendarContainer}>
      <WeekdaysRow />
      <MonthDaysGrid year={year} month={month} events={events} />
    </div>
  );
};

export default Calendario;
