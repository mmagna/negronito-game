import { useState } from 'react';
import MinijuegoAtaque from './MinijuegoAtaque';
import MinijuegoDefensa from './MinijuegoDefensa';
import MinijuegoResistencia from './MinijuegoResistencia';

export default function MenuMinijuegos({ onBack }) {
  const [currentGame, setCurrentGame] = useState(null);

  const renderGame = () => {
    switch(currentGame) {
      case 'ataque':
        return <MinijuegoAtaque onFinish={() => setCurrentGame(null)} />;
      case 'defensa':
        return <MinijuegoDefensa onFinish={() => setCurrentGame(null)} />;
      case 'resistencia':
        return <MinijuegoResistencia onFinish={() => setCurrentGame(null)} />;
      default:
        return (
          <div className="space-y-4">
            <button
              onClick={() => setCurrentGame('ataque')}
              className="w-full bg-red-500 text-white p-3 rounded hover:bg-red-600"
            >
              Entrenamiento de Ataque
            </button>
            <button
              onClick={() => setCurrentGame('defensa')}
              className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
            >
              Entrenamiento de Defensa
            </button>
            <button
              onClick={() => setCurrentGame('resistencia')}
              className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600"
            >
              Entrenamiento de Resistencia
            </button>
            <button
              onClick={onBack}
              className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Volver al Menú Principal
            </button>
          </div>
        );
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Menú de Entrenamiento</h3>
      {renderGame()}
    </div>
  );
}