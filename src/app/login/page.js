"use client";
import styles from './page.module.css';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TokenContext } from "../context/TokenContext";
import { setCookie } from 'nookies';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { saveToken, setName } = useContext(TokenContext);
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Establecer el nombre en el contexto
        setName(data.result.username); 
        
        // Guardar el token en cookies con una expiración de 30 días
        setCookie(null, 'user', data.token, {
          path: '/',            // Disponible en todo el sitio
          maxAge: 30 * 24 * 60 * 60,  // 30 días
        });

        // Llamar a la función saveToken, si la necesitas en tu contexto
        saveToken(data.token);
        
        // Redirigir al usuario a la página principal
        router.push('/'); 
      } else {
        alert('Error al iniciar sesión: ' + data.message);
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  return (
    <div className={styles.loginContainer}>
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
