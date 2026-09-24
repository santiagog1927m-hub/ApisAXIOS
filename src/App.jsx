import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // Guardamos los personajes
  const [personajes, setPersonajes] = useState([]);

  // Controlamos si la información está cargando
  const [cargando, setCargando] = useState(true);

  // Guardamos un posible error
  const [error, setError] = useState(null);

  // Se ejecuta cuando carga el componente
  useEffect(() => {

    // Hacemos la petición a la API
    axios
      .get('https://rickandmortyapi.com/api/character')

      // Si la petición funciona
      .then((respuesta) => {
        setPersonajes(respuesta.data.results);
        setCargando(false);
      })

      // Si ocurre un error
      .catch((error) => {
        setError('No se pudieron cargar los personajes');
        setCargando(false);
      });

  }, []);

  // Mostramos mensaje mientras carga
  if (cargando) return <p>Cargando personajes...</p>;

  // Mostramos mensaje si hay error
  if (error) return <p>{error}</p>;

  return (
    <div className="contenedor">
      <h1>Personajes de Rick and Morty</h1>

      <div className="tarjetas">
        {/* Recorremos la lista de personajes */}
        {personajes.map((personaje) => (
          <div className="tarjeta" key={personaje.id}>

            {/* Mostramos la imagen */}
            <img
              src={personaje.image}
              alt={personaje.name}
            />

            {/* Mostramos el nombre */}
            <h2>{personaje.name}</h2>

            {/* Mostramos el estado */}
            <p>Estado: {personaje.status}</p>

            {/* Mostramos la especie */}
            <p>Especie: {personaje.species}</p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
