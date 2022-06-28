import React, { useState, useEffect } from "react";

import useUser from "../hooks/useUser";

import configuracionesService from "../services/configuracionesService";

const Context = React.createContext({});

export function UserContextProvider({ children }) {
  const token = window.sessionStorage.getItem("token");
  const { userGet } = useUser();
  const [user, setUser] = useState([]);
  const [compra, setCompra] = useState([]);
  const [venta, setVenta] = useState([]);

  useEffect(() => {
    const res = async () => {
      const resp = await userGet();
      const res = await configuracionesService();
      setCompra(res.tipo_archivo_compras);
      setVenta(res.tipo_archivo_ventas);
      setUser(resp);
    };
    if (token) {
      res();
    }
  }, [userGet, token]);

  const [jwt, setJWT] = useState(() => token);

  return (
    <Context.Provider value={{ jwt, setJWT, user, compra, venta }}>
      {children}
    </Context.Provider>
  );
}
export default Context;
