import { useMascota } from '../context/MascotaContext';

export default function Stats({ onBack }) {
  const { mascota } = useMascota();

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Stats de {mascota.nombre}</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-3 rounded">
          <span className="font-bold">Nivel:</span> {mascota.nivel}
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <span className="font-bold">Salud:</span> {mascota.salud}/5
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <span className="font-bold">Ataque:</span> {mascota.ataque}
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <span className="font-bold">Defensa:</span> {mascota.defensa}
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <span className="font-bold">Resistencia:</span> {mascota.resistencia}
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <span className="font-bold">Forma:</span>{' '}
          {mascota.forma === 1 ? 'Base' : mascota.forma === 2 ? 'Intermedia' : 'Final'}
        </div>
      </div>

      <button
        onClick={onBack}
        className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
      >
        Volver
      </button>
    </div>
  );
}