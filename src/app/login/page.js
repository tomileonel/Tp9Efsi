"use client";
import styles from './page.module.css';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TokenContext } from "../context/TokenContext";

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
        setName(data.result.username); 
        console.log(data.result.first_name)
        saveToken(data.token); 
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
