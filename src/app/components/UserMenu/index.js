"use client"; // Asegúrate de que el archivo sea un Client Component
import styles from './style.module.css';
import { useState, useEffect, useContext } from 'react';
import Link from 'next/link'; 
import { TokenContext } from "../../context/TokenContext";

export default function UserMenu() {
  const { token, name, setToken } = useContext(TokenContext);

  const borrarLS = () => {
    localStorage.removeItem('token'); 
    setToken(null); 
    window.location.href = '/'; 
  };

  return (
    <div className={styles.userMenu}>
      {token ? (
        <div>
          <p>{name}</p>
          <button className={styles.button} onClick={borrarLS}>Cerrar Sesión</button>
        </div>
      ) : (
        <div>
          <Link href="/login">
            <button className={styles.button}>Iniciar Sesión</button>
          </Link>
          <Link href="/register">
            <button className={styles.button}>Registrarse</button>
          </Link>
        </div>
      )}
    </div>
  );
}
