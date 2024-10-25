'use client';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import { TokenContext } from "../../context/TokenContext";
import { useRouter } from 'next/navigation';

export default function EventDetail({ params }) {
  const { id: eventId } = params; // Obtén el ID de los params
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(TokenContext);

  const handleSubscribe = async () => {
    try {
      await axios.post(`http://localhost:4000/api/event/${eventId}/enrollment`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Te has suscrito al evento!');
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      alert(`Ya te suscribiste papi`);
      console.error('Error subscribing to event:', errorMessage);
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/event/${eventId}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener el detalle del evento:', error);
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (loading) {
    return <div className={styles.loading}>Cargando detalles del evento...</div>;
  }

  if (!event) {
    return <div className={styles.error}>No se encontró el evento.</div>;
  }

  const eventHasEnded = new Date(event.start_date) < new Date();

  return (
    <div className={styles.eventDetailContainer}>
      <div className={styles.eventDetailCard}>
        <h1 className={styles.eventTitle}>{event.name}</h1>
        <p className={styles.eventDescription}>{event.description}</p>
        
        <div className={styles.eventInfo}>
          <p><strong>Categoría:</strong> {event.event_category.name}</p>
          <p><strong>Fecha de Inicio:</strong> {new Date(event.start_date).toLocaleString()}</p>
          <p><strong>Duración:</strong> {event.duration_in_minutes} minutos</p>
          <p><strong>Precio:</strong> ${event.price}</p>
          <p><strong>Máxima Asistencia:</strong> {event.max_assistance} personas</p>
          <p><strong>Habilitado para inscripción:</strong> {event.enabled_for_enrollment ? 'Sí' : 'No'}</p>
          
          {eventHasEnded ? (
            <p className={styles.eventEnded}>El evento ya ha finalizado</p>
          ) : (
            <button className={styles.button} onClick={handleSubscribe}>Suscribirse</button>
          )}
        </div>
      </div>
    </div>
  );
}
