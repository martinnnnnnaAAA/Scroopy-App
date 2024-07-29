'use client'
import { useState, useEffect } from 'react';

export function useEvents({ id }) {
    const [EventosDeUsuario, setEventosDeUsuario] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const resEventos = await fetch(`http://localhost:6543/eventos/${id}`);
                const dataEventos = await resEventos.json();
                setEventosDeUsuario(dataEventos.message);

            } catch (error) {
                console.log(error);
            }
        };

        fetchEvents();
    }, [id]);

    return { EventosDeUsuario };
}
