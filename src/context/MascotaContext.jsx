import { createContext, useContext, useState } from 'react';

const MascotaContext = createContext();

export function MascotaProvider({ children }) {
  const [mascota, setMascota] = useState(null);

  return (
    <MascotaContext.Provider value={{ mascota, setMascota }}>
      {children}
    </MascotaContext.Provider>
  );
}

export function useMascota() {
  return useContext(MascotaContext);
}