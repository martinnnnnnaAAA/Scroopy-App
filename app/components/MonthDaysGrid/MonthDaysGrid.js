import React from 'react';
import styles from './MonthDaysGrid.module.css';

const getDaysInMonth = (year, month) => {
  return new Array(31).fill('').map((v, i) => new Date(year, month, i + 1)).filter(v => v.getMonth() === month);
};

const getPreviousMonthDays = (year, month, startDay) => {
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth).length;

  return new Array(startDay).fill('').map((v, i) => new Date(prevYear, prevMonth, daysInPrevMonth - startDay + i + 1));
};

const getNextMonthDays = (year, month, remainingDays) => {
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  return new Array(remainingDays).fill('').map((v, i) => new Date(nextYear, nextMonth, i + 1));
};

const MonthDaysGrid = ({ year, month, events }) => {
  const daysInMonth = getDaysInMonth(year, month);
  const startDay = daysInMonth[0].getDay();
  const endDay = daysInMonth[daysInMonth.length - 1].getDay();

  const prevMonthDays = getPreviousMonthDays(year, month, startDay);
  const nextMonthDays = getNextMonthDays(year, month, 6 - endDay);

  const allDays = [...prevMonthDays, ...daysInMonth, ...nextMonthDays];

  const weeks = [];
  let week = [];

  allDays.forEach((fecha, index) => {
    if (fecha.getDay() === 0 && week.length) {
      weeks.push(week);
      week = [];
    }
    week.push(fecha);
    if (index === allDays.length - 1) {
      weeks.push(week);
    }
  });

  const eventsForDate = (fecha) => {
    return events.filter(event => new Date(event.fecha).toDateString() === fecha.toDateString());
  };

  return (
    <div className={styles.monthDaysGrid}>
      {weeks.map((week, i) => (
        <div key={i} className={styles.weekRow}>
          {week.map((fecha, j) => (
            <div
              key={j}
              className={`${styles.dayCell} ${fecha.getMonth() === month ? styles.currentMonthDay : styles.otherMonthDay}`}
            >
              {fecha.getDate()}
              {eventsForDate(fecha).map((event, k) => (
                <div key={k} style={{ backgroundColor: event.color }} className={styles.event}>
                  {event.titulo}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MonthDaysGrid;
