import { useMascota } from '../context/MascotaContext';

export default function GameOver() {
  const { mascota } = useMascota();

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-3xl font-bold text-red-600 text-center mb-6">GAME OVER</h2>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Estadísticas finales de {mascota.nombre}</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded">
            <span className="font-bold">Nivel alcanzado:</span> {mascota.nivel}
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <span className="font-bold">Forma final:</span>{' '}
            {mascota.forma === 1 ? 'Base' : mascota.forma === 2 ? 'Intermedia' : 'Final'}
          </div>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4"
        >
          Jugar de nuevo
        </button>
      </div>
    </div>
  );
}