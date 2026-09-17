import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'

function App() {

  // guardaamos la informacion que vienen de los personajes desde la api
  const [personajes, setPersonajes] = useState([]);

  // aqui sabes si la informacion todavia se esta cargando
  const [cargando, setCargando] = useState(true);

  // aqui guardamos un mensaje por si ocurre un eeror
  const [error, setError] = useState("");

  // Se ejecuta cuando se carga el componente
  useEffect(() => {

    // aqui hacemos la peticion a la api
    axios.get("https://rickandmortyapi.com/api/character")

      // si funciona entra aqui
      .then((respuesta) => {

        // se muestra la rrespuesta
        console.log(respuesta);

        // guardamos los personajes que vienen en results
        setPersonajes(respuesta.data.results);

        // aqui termin la cargsa
        setCargando(false);
      })  

      // si pasa algun error entra aqui
      .catch((error) => {

        // mostramos el error
        console.log(error);

        // mostramos un mensaje al usuario
        setError("No se pudieron cargar los personajes");

        // terminamos la carga
        setCargando(false);
      });

  }, []);

           //mostramos mensaje mientras carga personajes
  if (cargando) {
    return <h2>Cargando personajes...</h2>;
  }

  // si hay un error mostramos el mensaje
  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="contenedor">

      <h1>Personajes de Rick and Morty</h1>

      <div className="tarjetas">

        {/* 
          Recorremos la lista de personajes.
          Por cada personaje creamos una tarjeta.
        */}
        {personajes.map((personaje) => (

          <div className="tarjeta" key={personaje.id}>

            {/* Imagen del personaje */}
            <img
              src={personaje.image}
              alt={personaje.name}
            />

            {/* Nombre del personaje */}
            <h2>{personaje.name}</h2>

            {/* Estado del personaje */}
            <p>Estado: {personaje.status}</p>

            {/* Especie del personaje */}
            <p>Especie: {personaje.species}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;
