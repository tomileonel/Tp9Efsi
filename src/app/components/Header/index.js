'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import styles from './style.module.css';
import UserMenu from '../UserMenu';
import { useContext } from 'react';
import { TokenContext } from '../../context/TokenContext';

export default function Header() {
  const pathname = usePathname(); 
  const { isLoggedIn } = useContext(TokenContext);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>
          <img src="/logo.png" alt="Logo" className={styles.logo} />
        </Link>
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
