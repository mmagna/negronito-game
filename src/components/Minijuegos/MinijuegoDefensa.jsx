import { useState } from 'react';
import { useMascota } from '../../context/MascotaContext';

export default function MinijuegoDefensa({ onFinish }) {
  const { mascota, setMascota } = useMascota();
  const [intentos, setIntentos] = useState(3 + Math.floor((mascota.defensa - 5) / 2));
  const [mensaje, setMensaje] = useState('');

  const opciones = ['Piedra', 'Papel', 'Tijeras'];

  const jugar = (eleccionJugador) => {
    const eleccionCPU = Math.floor(Math.random() * 3);
    
    setMensaje(`CPU eligió: ${opciones[eleccionCPU]}`);

    if (eleccionJugador === eleccionCPU) {
      setMensaje(prev => prev + '\n¡Empate! Intenta de nuevo');
      return;
    }

    const victoria = (eleccionJugador === 0 && eleccionCPU === 2) ||
                    (eleccionJugador === 1 && eleccionCPU === 0) ||
                    (eleccionJugador === 2 && eleccionCPU === 1);

    if (victoria) {
      const mascotaActualizada = { ...mascota };
      mascotaActualizada.nivel++;
      mascotaActualizada.defensa += 3;
      mascotaActualizada.ataque += 1;
      mascotaActualizada.resistencia += 1;
      if (mascotaActualizada.naturaleza === 2) mascotaActualizada.defensa += 2;
      
      setMascota(mascotaActualizada);
      setMensaje(prev => prev + '\n¡Victoria!');
      setTimeout(onFinish, 2000);
    } else {
      setIntentos(prev => prev - 1);
      if (intentos <= 1) {
        const mascotaActualizada = { ...mascota };
        mascotaActualizada.salud--;
        setMascota(mascotaActualizada);
        setMensaje(prev => prev + '\n¡Has perdido!');
        setTimeout(onFinish, 2000);
      } else {
        setMensaje(prev => prev + `\nTe quedan ${intentos - 1} intentos`);
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Piedra, Papel o Tijeras</h3>
      <p>Intentos restantes: {intentos}</p>
      
      <div className="grid grid-cols-3 gap-2">
        {opciones.map((opcion, index) => (
          <button
            key={opcion}
            onClick={() => jugar(index)}
            className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
            disabled={intentos <= 0}
          >
            {opcion}
          </button>
        ))}
      </div>

      {mensaje && (
        <p className="mt-4 whitespace-pre-line text-center">{mensaje}</p>
      )}
    </div>
  );
}