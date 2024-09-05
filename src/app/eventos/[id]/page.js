"use client"
import { useParams } from 'next/navigation';

export default function EventDetail() {
  const { id } = useParams(); // Obtén el ID de la URL

  return (
    <div>
      <h1>Detalles del Evento {id}</h1>
      {/* Aquí puedes agregar más detalles sobre el evento */}
    </div>
  );
}
