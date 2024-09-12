"use client";  // Asegúrate de añadir esto en la primera línea

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Reemplazo para `useRouter`
import styles from './style.module.css';
import UserMenu from '../UserMenu';

export default function Header() {
  const pathname = usePathname(); // Obtiene la ruta actual

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </div>
      <nav className={styles.nav}>
        <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>
          Home
        </Link>
        <Link href="/contacto" aria-current={pathname === '/contacto' ? 'page' : undefined}>
          Contacto
        </Link>
      </nav>
      <UserMenu />
    </header>
  );
}
