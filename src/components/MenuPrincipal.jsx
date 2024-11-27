import { useState } from 'react';
import { useMascota } from '../context/MascotaContext';
import Stats from './Stats';
import MenuMinijuegos from './Minijuegos/MenuMinijuegos';
import Evolucion from './Evolucion';

export default function MenuPrincipal({ onGameOver }) {
  const [currentView, setCurrentView] = useState('menu');
  const { mascota } = useMascota();

  if (mascota.salud <= 0) {
    onGameOver();
    return null;
  }

  const renderContent = () => {
    switch(currentView) {
      case 'stats':
        return <Stats onBack={() => setCurrentView('menu')} />;
      case 'minijuegos':
        return <MenuMinijuegos onBack={() => setCurrentView('menu')} />;
      case 'evolucion':
        return <Evolucion onBack={() => setCurrentView('menu')} />;
      default:
        return (
          <div className="space-y-4">
            <button
              onClick={() => setCurrentView('stats')}
              className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
            >
              Ver Stats
            </button>
            <button
              onClick={() => setCurrentView('minijuegos')}
              className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600"
            >
              Entrenar (Minijuegos)
            </button>
            <button
              onClick={() => setCurrentView('evolucion')}
              className="w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600"
            >
              Evolucionar
            </button>
          </div>
        );
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Mascota Virtual</h2>
      {renderContent()}
    </div>
  );
}