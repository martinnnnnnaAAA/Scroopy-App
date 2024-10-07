import React, { useState } from "react";
import Link from "next/link"; // Asegúrate de que esta ruta sea correcta
import SelectorMesAno from "../SelectorMesAno/SelectorMesAno";
import styles from './NavBar.module.css';

const NavBar = ({ year, month, onMonthChange, onYearChange, direccionA }) => {
  const [activeTab, setActiveTab] = useState("calendario");
  const [viewType, setViewType] = useState("Mes");

  return (
    <nav className={styles.navbar}>
      <div className={styles.left_section}>
        <Link href="/Calendario">
          <img src="/Images/Logo-Scroopy-Aran-Mazzeo.png" alt="Logo" className={styles.logo} />
        </Link>
        <Link href={`/${direccionA.toLowerCase()}`} className={styles.link}> {direccionA}</Link>
      </div>
      {direccionA != 'Tareas' &&(<div className={styles.middle_section}>
        <SelectorMesAno
          year={year}
          month={month}
          onMonthChange={onMonthChange}
          onYearChange={onYearChange}
        />
      </div>)
        
      }
      
      <div className={styles.right_section}>
      {direccionA != 'Tareas' &&(<select
          value={viewType}
          onChange={(e) => setViewType(e.target.value)}
          className={styles.view_type_selector}
        >
          <option value="Mes">Mes</option>
          <option value="Semana">Semana</option>
        </select>)}
        <button
          className={`${styles.tab_button} ${direccionA === "calendario" ? styles.active : ""}`}
          onClick={() => setActiveTab("calendario")}
        >
          {direccionA === "calendario" ? "Calendario" : <Link href="/calendario">Calendario</Link>}
        </button>
        <button
          className={`${styles.tab_button} ${direccionA === "tareas" ? styles.active : ""}`}
          onClick={() => setActiveTab("tareas")}
        >
          {direccionA === "tareas" ? "Tareas" : <Link href="/tareas">Tareas</Link>}
        </button>
        {direccionA != 'Tareas' &&( <span className={styles.balance}>$ 1.000.000</span>)}
      </div>
    </nav>
  );
};

export default NavBar;
