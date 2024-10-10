"use client"; 
import styles from './page.module.css';
import { useState } from 'react';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validaciones
    if (firstName.length < 3) {
      alert('El nombre debe tener al menos 3 letras.');
      return;
    }
    if (lastName.length < 3) {
      alert('El apellido debe tener al menos 3 letras.');
      return;
    }
    if (!isValidEmail(email)) {
      alert('Por favor, introduce un email válido.');
      return;
    }
    if (password.length < 3) {
      alert('La contraseña debe tener al menos 3 letras.');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, username: email, password }),
      });
      
      const data = await res.json();

      if (res.ok && data.message === 'created') { 
        localStorage.setItem('token', data.token);
        alert('Registro exitoso.'); // Mensaje de éxito
        window.location.href = '/'; // Redirigir a la página principal
      } else {
        alert('Error al registrarse: ' + data.message);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return (
    <div className={styles.registerConteiner}>
      <h1>Registrarse</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
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
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
