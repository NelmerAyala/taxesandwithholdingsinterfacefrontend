import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import Index from "../components/Index";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import ListArchivos from "../pages/ListArchivos";
import DetailsArchivos from "../pages/DetailsArchivos";
import ListCompras from "../pages/ListCompras";
import ListVentas from "../pages/ListVentas";
import Perfil from "../pages/Perfil";
import NotFound from "../pages/NotFound";
import ListUsuarios from "../pages/ListUsuarios";
import NewUsuarios from "../pages/NewUsuarios";
import DetailsUsuario from "../pages/DetailsUsuario";
import Configuraciones from "../pages/Config";

import useUser from "../hooks/useUser";

export default function RoutesApp() {
  const { userGet } = useUser();
  const [user, serUser] = useState([]);

  useEffect(() => {
    const res = async () => {
      const resp = await userGet();
      serUser(resp);
    };
    res();
  }, [userGet]);

  return (
    <Routes>
      <Route exact={true} path="/" element={<PrivateRoute />}>
        <Route exact={true} path="/" element={<Index />} />
        <Route exact={true} path="/logout" element={<Logout />} />
        <Route exact={true} path="/archivos" element={<ListArchivos />} />
        <Route
          exact={true}
          path="/archivos/detalles/:id"
          element={<DetailsArchivos />}
        />
        <Route exact={true} path="/compras" element={<ListCompras />}></Route>
        <Route exact={true} path="/ventas" element={<ListVentas />}></Route>
        <Route exact={true} path="/perfil" element={<Perfil />}></Route>

        {user.es_administrador === true ? (
          <>
            <Route
              exact={true}
              path="/usuarios"
              element={<ListUsuarios />}
            ></Route>
          </>
        ) : (
          <></>
        )}

        {user.es_superadministrador === true ? (
          <>
            <Route
              exact={true}
              path="/config"
              element={<Configuraciones />}
            ></Route>
          </>
        ) : (
          <></>
        )}

        <Route
          exact={true}
          path="/usuarios/nuevo"
          element={<NewUsuarios />}
        ></Route>
      </Route>

      <Route
        exact={true}
        path="/usuarios/:id"
        element={<DetailsUsuario />}
      ></Route>

      <Route exact={true} path="/login" element={<Login />} isPrivate></Route>

      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}
