import { useState, useEffect } from 'react';
import { useMascota } from '../../context/MascotaContext';

export default function MinijuegoResistencia({ onFinish }) {
  const { mascota, setMascota } = useMascota();
  const [numeros, setNumeros] = useState([]);
  const [sumaCorrecta, setSumaCorrecta] = useState(0);
  const [intentos, setIntentos] = useState(3 + Math.floor((mascota.resistencia - 5) / 2));
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const nums = Array(5).fill(0).map(() => Math.floor(Math.random() * 10) + 1);
    setNumeros(nums);
    setSumaCorrecta(nums.reduce((a, b) => a + b, 0));
  }, []);

  const verificarRespuesta = (e) => {
    e.preventDefault();
    const suma = parseInt(respuesta);

    if (suma === sumaCorrecta) {
      const mascotaActualizada = { ...mascota };
      mascotaActualizada.nivel++;
      mascotaActualizada.resistencia += 3;
      mascotaActualizada.ataque += 1;
      mascotaActualizada.defensa += 1;
      if (mascotaActualizada.naturaleza === 3) mascotaActualizada.resistencia += 2;
      
      setMascota(mascotaActualizada);
      setMensaje('¡Correcto! ¡Demostraste tu resistencia mental!');
      setTimeout(onFinish, 2000);
    } else {
      setIntentos(prev => prev - 1);
      if (intentos <= 1) {
        const mascotaActualizada = { ...mascota };
        mascotaActualizada.salud--;
        setMascota(mascotaActualizada);
        setMensaje(`¡Te has quedado sin intentos! La suma era: ${sumaCorrecta}`);
        setTimeout(onFinish, 2000);
      } else {
        setMensaje(suma < sumaCorrecta ? 'La suma es mayor' : 'La suma es menor');
      }
    }
    setRespuesta('');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Suma Mental</h3>
      <p>Intentos restantes: {intentos}</p>
      
      <div className="flex justify-center space-x-2">
        {numeros.map((num, index) => (
          <div key={index} className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded">
            {num}
          </div>
        ))}
      </div>

      <form onSubmit={verificarRespuesta} className="space-y-2">
        <input
          type="number"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Ingresa la suma"
          disabled={intentos <= 0}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          disabled={intentos <= 0}
        >
          Verificar
        </button>
      </form>

      {mensaje && (
        <p className="mt-4 text-center">{mensaje}</p>
      )}
    </div>
  );
}