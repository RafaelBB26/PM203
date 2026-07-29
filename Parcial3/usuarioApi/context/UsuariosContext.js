import { createContext, useContext, useState } from 'react';

const UsuariosContext = createContext();

export function UsuariosProvider({ children }) {
  const [usuarios, setUsuarios] = useState([
    { id: '1', nombre: 'Isay Guerra', edad: 22 },
    { id: '2', nombre: 'Ana López', edad: 19 },
    { id: '3', nombre: 'Carlos Gonzalez', edad: 25 },
    { id: '4', nombre: 'Bjork Guerra', edad: 21 },
    { id: '5', nombre: 'Luisa Martínez', edad: 28 },
  ]);

  return (
    <UsuariosContext.Provider value={[usuarios, setUsuarios]}>
      {children}
    </UsuariosContext.Provider>
  );
}

export function useUsuarios() {
  const context = useContext(UsuariosContext);

  if (!context) {
    throw new Error('useUsuarios debe utilizarse dentro de UsuariosProvider');
  }

  return context;
}