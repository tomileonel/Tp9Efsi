"use client"; // Asegúrate de que el archivo sea un Client Component

import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'; // Importar jwt-decode
import Link from 'next/link'; // Importar Link para redirigir

export default function UserMenu() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     try {
  //       const decoded = jwt_decode(token);
  //       setUser(decoded.username); // Ajusta según la estructura del token
  //     } catch (error) {
  //       console.error('Error al decodificar el token:', error);
  //     }
  //   }
  // }, []);

  return (
    <div>
      {user ? (
        <p>Bienvenido, {user}</p>
      ) : (
        <div>
          <Link href="/login">
            <button>Iniciar Sesión</button>
          </Link>
          <Link href="/register">
            <button>Registrarse</button>
          </Link>
        </div>
      )}
    </div>
  );
}
