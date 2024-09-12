import Link from 'next/link';
import styles from './style.module.css';

export default function EventList() {
  return (
    <div className={styles.container}>
    <div className={styles.eventList}>
      <h1>Listado de Eventos</h1>
      <ul>
        <li>
          <Link href="/eventos/1">Evento 1</Link>
        </li>
        <li>
          <Link href="/eventos/2">Evento 2</Link>
        </li>
        <li>
          <Link href="/eventos/3">Evento 3</Link>
        </li>
      </ul>
    </div>
    </div>
  );
}
