import { useState } from 'react';
import { useMascota } from '../context/MascotaContext';

export default function CrearPersonaje({ onStart }) {
  const [nombre, setNombre] = useState('');
  const [naturaleza, setNaturaleza] = useState('1');
  const { setMascota } = useMascota();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const mascotaNueva = {
      nombre,
      naturaleza: parseInt(naturaleza),
      nivel: 1,
      salud: 5,
      ataque: 5,
      defensa: 5,
      resistencia: 5,
      forma: 1
    };

    // Aplicar bonus según naturaleza
    switch(parseInt(naturaleza)) {
      case 1: mascotaNueva.ataque += 3; break;
      case 2: mascotaNueva.defensa += 3; break;
      case 3: mascotaNueva.resistencia += 3; break;
    }

    setMascota(mascotaNueva);
    onStart();
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Creación de Personaje</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            maxLength="50"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Naturaleza:</label>
          <select
            value={naturaleza}
            onChange={(e) => setNaturaleza(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="1">Guerrera (Prioriza ataque)</option>
            <option value="2">Reservada (Prioriza defensa)</option>
            <option value="3">Impasible (Prioriza resistencia)</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Crear Personaje
        </button>
      </form>
    </div>
  );
}