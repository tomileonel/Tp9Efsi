'use client';import { useEffect, useState } from 'react';
import styles from './styles.module.css'; // Asegúrate de crear este archivo CSS

export default function EventDetail({ params }) {
  const { id } = params;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener el detalle del evento basado en el ID
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/event/${id}`);
        const data = await response.json();
        setEvent(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener el detalle del evento:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Cargando detalles del evento...</div>;
  }

  if (!event) {
    return <div className={styles.error}>No se encontró el evento.</div>;
  }

  return (
    <div className={styles.eventDetailContainer}>
      <div className={styles.eventDetailCard}>
        <h1 className={styles.eventTitle}>{event.name}</h1>
        <p className={styles.eventDescription}>{event.description}</p>
        
        <div className={styles.eventInfo}>
          <p><strong>Categoría:</strong> {event.categoria}</p>
          <p><strong>Fecha de Inicio:</strong> {new Date(event.start_date).toLocaleString()}</p>
          <p><strong>Duración:</strong> {event.duration_in_minutes} minutos</p>
          <p><strong>Precio:</strong> ${event.price}</p>
          <p><strong>Máxima Asistencia:</strong> {event.max_assistance} personas</p>
          <p><strong>Habilitado para inscripción:</strong> {event.enabled_for_enrollment ? 'Sí' : 'No'}</p>
        </div>
      </div>
    </div>
  );
}
