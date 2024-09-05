import styles from './page.module.css';

export default function Contacto() {
  return (
    <div className={styles['contact-container']}>
      <h1>Contacto</h1>
      <p>Email: contacto@eventos.com</p>
      <p>Teléfono: 123-456-7890</p>
    </div>
  );
}
