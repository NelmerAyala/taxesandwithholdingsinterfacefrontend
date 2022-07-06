// Nuevo
import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Context
import Context from "../contexts/UserContext";

// Services
import loginService from "../services/loginService";
import userUpdateService from "../services/userUpdateService";
import userUpdateAdminService from "../services/userUpdateAdminService";
import userGetService from "../services/userGetService";

// Notificaciones
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function useUser() {
  //Constantes
  const { jwt, setJWT } = useContext(Context);
  const [user, setUser] = useState();
  const [username, setUsername] = useState();
  const [estatus, setEstatus] = useState({ loading: false, error: false });

  // Navigate
  let navigate = useNavigate();

  // Login
  const login = useCallback(
    ({ username, password }) => {
      setEstatus({ loading: true, error: false });

      //   const res = async () => {
      //     const resp = await loginService({ username, password });
      //     if (resp.body.token) {
      //       window.sessionStorage.setItem("token", resp.body.token);
      //       setEstatus({ loading: false, error: false });
      //       setJWT(resp.body.token);
      //     } else {
      //       window.sessionStorage.removeItem("token");
      //       setEstatus({ loading: false, error: true });
      //     }
      //     return resp;
      //   };

      const res = () => {
        return new Promise((resolve, reject) => {
          const respuesta = async () => {
            const resp = await loginService({ username, password });
            if (resp.body) {
              window.sessionStorage.setItem("token", resp.body.token);
              setEstatus({ loading: false, error: false });
              setJWT(resp.body.token);
              resolve(resp);
            } else {
              window.sessionStorage.removeItem("token");
              setEstatus({ loading: false, error: true });
              reject(resp);
            }
          };
          respuesta();
        });
      };

      toast.dismiss();
      toast.promise(res, {
        pending: "Iniciando Sesión.",
        success: {
          render({ data }) {
            let msg = "Inicio de sesión exitoso.!!";
            if (data.body.msg) {
              msg = data.body.msg;
            }
            return msg;
          },
        },
        error: {
          render({ data }) {
            let msg = "Error: Inicio de sesión No exitoso.!!";
            if (data.errors.msg) {
              msg = data.errors.msg;
            }
            return msg;
          },
        },
      });
    },
    [setJWT]
  );

  // Logout
  const logout = useCallback(() => {
    window.sessionStorage.removeItem("token");
    setJWT(null);
    navigate("/login");
  }, [setJWT, navigate]);

  // Consultar usuario
  const userGet = useCallback(() => {
    const res = userGetService();
    return res;
  }, []);

  // Update usuario
  const userUpdate = useCallback((email, firstname, lastname) => {
    const res = userUpdateService({ email, firstname, lastname });
    return res;
  }, []);

  // Update usuario siendo ADM
  const userUpdateAdmin = useCallback(
    (id, email, firstname, lastname, companys, privilegio) => {
      const res = userUpdateAdminService({
        id,
        email,
        firstname,
        lastname,
        companys,
      });
      return res;
    },
    []
  );

  return {
    isLogged: Boolean(jwt),
    isLoggedLoading: estatus.loading,
    hasLoginError: estatus.error,
    login,
    logout,
    userGet,
    user,
    username,
    userUpdate,
    userUpdateAdmin,
    setUser,
    setUsername,
  };
}
