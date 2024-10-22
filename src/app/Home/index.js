'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './style.module.css'; // Importa el archivo de estilos

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);



  // Obtener los eventos de la API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/event/');
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los eventos:', error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Cargando eventos...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Eventos</h1>
      <ul className={styles.eventList}>
        {events.map((event) => (
          <li key={event.id} className={styles.eventItem}>
            <Link href={`/eventos/${event.id}`}>
              <div className={styles.eventContent}>
                <h2 className={styles.eventName}>{event.name}</h2>
                <p className={styles.eventDescription}>{event.description}</p>
                <p className={styles.eventDate}>
                  <strong>Fecha de inicio:</strong> {new Date(event.start_date).toLocaleDateString()}
                </p>
                <p className={styles.eventPrice}>
                  <strong>Precio:</strong> ${event.price}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
