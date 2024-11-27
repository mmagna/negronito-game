import { useMascota } from '../context/MascotaContext';

export default function Evolucion({ onBack }) {
  const { mascota, setMascota } = useMascota();

  const intentarEvolucionar = () => {
    const mascotaActualizada = { ...mascota };

    if (mascota.forma === 1 && mascota.nivel >= 4) {
      mascotaActualizada.forma = 2;
      switch(mascota.naturaleza) {
        case 1:
          mascotaActualizada.ataque += 5;
          mascotaActualizada.defensa += 3;
          mascotaActualizada.resistencia += 3;
          break;
        case 2:
          mascotaActualizada.ataque += 3;
          mascotaActualizada.defensa += 5;
          mascotaActualizada.resistencia += 3;
          break;
        case 3:
          mascotaActualizada.ataque += 3;
          mascotaActualizada.defensa += 3;
          mascotaActualizada.resistencia += 5;
          break;
      }
      setMascota(mascotaActualizada);
    } else if (mascota.forma === 2 && mascota.nivel >= 9) {
      mascotaActualizada.forma = 3;
      switch(mascota.naturaleza) {
        case 1:
          mascotaActualizada.ataque += 10;
          mascotaActualizada.defensa += 5;
          mascotaActualizada.resistencia += 5;
          break;
        case 2:
          mascotaActualizada.ataque += 5;
          mascotaActualizada.defensa += 10;
          mascotaActualizada.resistencia += 5;
          break;
        case 3:
          mascotaActualizada.ataque += 5;
          mascotaActualizada.defensa += 5;
          mascotaActualizada.resistencia += 10;
          break;
      }
      setMascota(mascotaActualizada);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Evolución</h3>
      
      {mascota.forma === 3 ? (
        <p>Tu mascota ya está en su forma final.</p>
      ) : mascota.forma === 2 && mascota.nivel < 9 ? (
        <p>Necesitas nivel 9 para evolucionar (Nivel actual: {mascota.nivel})</p>
      ) : mascota.forma === 1 && mascota.nivel < 4 ? (
        <p>Necesitas nivel 4 para evolucionar (Nivel actual: {mascota.nivel})</p>
      ) : (
        <button
          onClick={intentarEvolucionar}
          className="w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600"
        >
          ¡Evolucionar!
        </button>
      )}

      <button
        onClick={onBack}
        className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
      >
        Volver
      </button>
    </div>
  );
}