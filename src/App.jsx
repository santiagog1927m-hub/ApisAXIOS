import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // guardamos personajes
  const [personajes, setPersonajes] = useState([]);

  // 
  const [cargando, setCargando] = useState(true);

  // guardamos un posible error
  const [error, setError] = useState(null);

  
  useEffect(() => {

    // hacemos la petición a la API
    axios
      .get('https://rickandmortyapi.com/api/character')

      // si la petición funciona
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

  // mostramos mensaje mientras carga
  if (cargando) return <p>Cargando personajes...</p>;

  // mostramos mensaje si hay error
  if (error) return <p>{error}</p>;

  return (
    <div className="contenedor">
      <h1>Personajes de Rick and Morty</h1>

      <div className="tarjetas">
        {/* Recorremos la lista de personajes */}
        {personajes.map((personaje) => (
          <div className="tarjeta" key={personaje.id}>

            
            <img
              src={personaje.image}
              alt={personaje.name}
            />

            <h2>{personaje.name}</h2>

            
            <p>Estado: {personaje.status}</p>

            
            <p>Especie: {personaje.species}</p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
