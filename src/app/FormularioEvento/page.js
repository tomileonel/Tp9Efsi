// src/app/FormularioEvento/page.js
"use client"; // Asegúrate de usar "use client" si es un componente cliente

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from "../context/TokenContext";
import styles from './page.module.css';
import { useRouter } from 'next/navigation'; // Usa next/navigation

const FormularioEvento = () => {
    const { token } = useContext(TokenContext);
    const [evento, setEvento] = useState({
        name: '',
        description: '',
        id_event_category: '',
        id_event_location: '',
        id_tag: '',
        start_date: '',
        duration_in_minutes: '',
        price: '',
        enabled_for_enrollment: false,
        max_assistance: '',
    });

    const [categorias, setCategorias] = useState([]);
    const [eventLocations, setEventLocations] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter(); // Inicializa useRouter

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, locRes, eventsRes] = await Promise.all([
                    axios.get('http://localhost:4000/api/event-category/', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get('http://localhost:4000/api/event-location/', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get('http://localhost:4000/api/event/', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                if (Array.isArray(catRes.data)) {
                    setCategorias(catRes.data);
                }

                if (Array.isArray(locRes.data)) {
                    setEventLocations(locRes.data);
                }

                const events = eventsRes.data.collection || [];
                const extractedTags = events.reduce((acc, evento) => {
                    if (evento.tags && Array.isArray(evento.tags)) {
                        evento.tags.forEach(tag => {
                            acc[tag.name] = tag;
                        });
                    }
                    return acc;
                }, {});

                setTags(Object.values(extractedTags));
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEvento({
            ...evento,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validación de la longitud de nombre y descripción
        if (evento.name.length < 3) {
            alert('El nombre debe tener al menos 3 letras.');
            return;
        }
    
        if (evento.description.length < 3) {
            alert('La descripción debe tener al menos 3 letras.');
            return;
        }
    
        try {
            await axios.post(
                'http://localhost:4000/api/event',
                { ...evento },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Evento creado exitosamente');
            setEvento({
                name: '',
                description: '',
                id_event_category: '',
                id_event_location: '',
                id_tag: '',
                start_date: '',
                duration_in_minutes: '',
                price: '',
                enabled_for_enrollment: false,
                max_assistance: '',
            });
            router.push('/'); // Redirige a la dirección /
        } catch (error) {
            alert('Error al crear el evento');
        }
    };
    return (
        <div className={styles.container}>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h2 className={styles.title}>Crear Evento</h2>
                    <input
                        className={styles.input}
                        type="text"
                        name="name"
                        value={evento.name}
                        onChange={handleChange}
                        placeholder="Nombre del Evento"
                        required
                    />
                    <textarea
                        className={styles.input}
                        name="description"
                        value={evento.description}
                        onChange={handleChange}
                        placeholder="Descripción"
                        required
                    />
                    <select
                        className={styles.input}
                        name="id_event_category"
                        value={evento.id_event_category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccionar Categoría</option>
                        {Array.isArray(categorias) && categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.name}
                            </option>
                        ))}
                    </select>
                    <select
                        className={styles.input}
                        name="id_event_location"
                        value={evento.id_event_location}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccionar Ubicación</option>
                        {Array.isArray(eventLocations) && eventLocations.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        ))}
                    </select>
                    <select
                        className={styles.input}
                        name="id_tag"
                        value={evento.id_tag}
                        onChange={handleChange}
                    >
                        <option value="">Seleccionar Etiqueta</option>
                        {Array.isArray(tags) && tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                                {tag.name}
                            </option>
                        ))}
                    </select>
                    <input
                        className={styles.input}
                        type="datetime-local"
                        name="start_date"
                        value={evento.start_date}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className={styles.input}
                        type="number"
                        name="duration_in_minutes"
                        value={evento.duration_in_minutes}
                        onChange={handleChange}
                        placeholder="Duración en minutos"
                        required
                    />
                    <input
                        className={styles.input}
                        type="number"
                        name="price"
                        value={evento.price}
                        onChange={handleChange}
                        placeholder="Precio"
                        required
                    />
                    <input
                        className={styles.input}
                        type="number"
                        name="max_assistance"
                        value={evento.max_assistance}
                        onChange={handleChange}
                        placeholder="Máxima Asistencia"
                        required
                    />
                    <label>
                        <input
                            type="checkbox"
                            name="enabled_for_enrollment"
                            checked={evento.enabled_for_enrollment}
                            onChange={handleChange}
                        />
                        Habilitado para Inscripción
                    </label>
                    <button type="submit" className={styles.button}>Crear Evento</button>
                </form>
            )}
        </div>
    );
};

export default FormularioEvento;
