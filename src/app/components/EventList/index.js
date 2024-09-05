import styles from './style.module.css';

export default function EventList() {
  return (
    <div className={styles.eventList}>
      <h1>Listado de Eventos</h1>
      <ul>
        <li>Evento 1</li>
        <li>Evento 2</li>
        <li>Evento 3</li>
      </ul>
    </div>
  );
}
