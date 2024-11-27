import { useState, useEffect } from 'react';
import { useMascota } from '../../context/MascotaContext';

export default function MinijuegoAtaque({ onFinish }) {
  const { mascota, setMascota } = useMascota();
  const [tablero, setTablero] = useState(Array(3).fill().map(() => Array(3).fill(0)));
  const [objetivoX, setObjetivoX] = useState(0);
  const [objetivoY, setObjetivoY] = useState(0);
  const [intentos, setIntentos] = useState(3 + Math.floor((mascota.ataque - 5) / 2));
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Colocar objetivo aleatoriamente
    setObjetivoX(Math.floor(Math.random() * 3));
    setObjetivoY(Math.floor(Math.random() * 3));
  }, []);

  const handleClick = (x, y) => {
    if (tablero[x][y] !== 0 || intentos <= 0) return;

    const nuevoTablero = tablero.map(row => [...row]);
    
    if (x === objetivoX && y === objetivoY) {
      nuevoTablero[x][y] = 2; // Acierto
      setTablero(nuevoTablero);
      setMensaje('¡Has acertado! ¡Victoria!');
      
      const mascotaActualizada = { ...mascota };
      mascotaActualizada.nivel++;
      mascotaActualizada.ataque += 3;
      mascotaActualizada.defensa += 1;
      mascotaActualizada.resistencia += 1;
      if (mascotaActualizada.naturaleza === 1) mascotaActualizada.ataque += 2;
      
      setMascota(mascotaActualizada);
      setTimeout(onFinish, 2000);
    } else {
      nuevoTablero[x][y] = 1; // Fallo
      setTablero(nuevoTablero);
      setIntentos(prev => prev - 1);
      
      let pista = '';
      if (x < objetivoX) pista += 'El objetivo está más abajo. ';
      if (x > objetivoX) pista += 'El objetivo está más arriba. ';
      if (y < objetivoY) pista += 'El objetivo está más a la derecha. ';
      if (y > objetivoY) pista += 'El objetivo está más a la izquierda.';
      
      setMensaje(pista);

      if (intentos <= 1) {
        const mascotaActualizada = { ...mascota };
        mascotaActualizada.salud--;
        setMascota(mascotaActualizada);
        setTimeout(onFinish, 2000);
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Minijuego de Ataque</h3>
      <p>Intentos restantes: {intentos}</p>
      
      <div className="grid grid-cols-3 gap-2">
        {tablero.map((row, x) => (
          row.map((cell, y) => (
            <button
              key={`${x}-${y}`}
              onClick={() => handleClick(x, y)}
              className={`
                w-16 h-16 rounded
                ${cell === 0 ? 'bg-gray-200' : 
                  cell === 1 ? 'bg-red-500' : 'bg-green-500'}
              `}
            />
          ))
        ))}
      </div>

      {mensaje && (
        <p className="mt-4 text-center">{mensaje}</p>
      )}
    </div>
  );
}