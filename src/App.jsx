import { MascotaProvider } from './context/MascotaContext';
import { useState } from 'react';
import CrearPersonaje from './components/CrearPersonaje';
import MenuPrincipal from './components/MenuPrincipal';
import GameOver from './components/GameOver';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  return (
    <MascotaProvider>
      <div className="min-h-screen bg-gray-100 p-8">
        {!gameStarted && !gameOver && (
          <CrearPersonaje onStart={() => setGameStarted(true)} />
        )}
        {gameStarted && !gameOver && (
          <MenuPrincipal onGameOver={() => setGameOver(true)} />
        )}
        {gameOver && <GameOver />}
      </div>
    </MascotaProvider>
  );
}