"use client"; // Marca este archivo como un Client Component
import styles from './page.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Usar useRouter para redirigir después del login

export default function Login() {
  const [email, setEmail] = useState(''); // Almacena el email del usuario
  const [password, setPassword] = useState('');
  const router = useRouter(); // Para navegar después del login

  const handleLogin = async (e) => {
    e.preventDefault();

    // Realiza la solicitud al servidor
    const res = await fetch('http://localhost:4000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Enviar el email con el nombre "username" en el body de la solicitud
      body: JSON.stringify({ username: email, password }),
    });

    const data = await res.json(); // Procesa la respuesta como JSON

    if (res.ok && data.success) {
      // Guarda el token en localStorage
      localStorage.setItem('token', data.token);
      // Redirige a la página principal después del login
      router.push('/');
    } else {
      alert('Error al iniciar sesión: ' + data.message);
    }
  };

  return (
    <div className={styles['login-container']}>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
