import { createContext, useContext, useState } from "react";

const AtivadorContext = createContext();

export function AtivadorProvider({ children }) {
  const [mostrarSac, setmostrarSac] = useState(false);
  const [mostrarAdm, setMostrarAdm] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarCards, setmostrarCards] = useState(true);

  return (
    <AtivadorContext.Provider
      value={{
        mostrarSac,
        setmostrarSac,
        mostrarAdm,
        setMostrarAdm,
        usuarios,
        setUsuarios,
        mostrarCards,
        setmostrarCards,
      }}
    >
      {children}
    </AtivadorContext.Provider>
  );
}

export function useAtivador() {
  return useContext(AtivadorContext);
}
