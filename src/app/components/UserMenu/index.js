import styles from './style.module.css';

export default function UserMenu() {
  return (
    <div className={styles.userMenu}>
      <p>Bienvenido, Usuario</p>
      <button className={styles.logoutButton}>Cerrar sesión</button>
    </div>
  );
}
