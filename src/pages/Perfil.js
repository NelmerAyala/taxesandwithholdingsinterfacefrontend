// Nuevo
import React, { useEffect, useState } from "react";

// Hooks
import useUser from "../hooks/useUser";

// Estilos
import "./Perfil.css";
import imageIsotipoIntelix from "../assets/images/ISOTIPO - INTELIX-01.png";

//Services
import changePasswordService from "../services/changePasswordService";

// Layout
import LayoutSession from "../layout/LayoutSession";

// Notificaciones
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// External components
import {
  Box,
  Container,
  Button,
  Paper,
  Grid,
  Divider,
  Typography,
  TextField,
  Stack,
} from "../consts";

export default function Perfil() {
  // Constantes
  const [email, setEmail] = useState([]);
  const [firstname, setFirstname] = useState([]);
  const [lastname, setLastname] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [passwordNew, setPasswordNew] = useState([]);
  const [passwordNewConfirmed, setPasswordNewConfirmed] = useState([]);
  const { userGet, userUpdate } = useUser();

  // Consulta de Usuario
  useEffect(() => {
    const res = async () => {
      const res = await userGet();
      setEmail(res.user.email);
      setFirstname(res.user.firstname);
      setLastname(res.user.lastname);
      setUsername(res.user.username);
    };
    res();
  }, [userGet]);

  // Submit Actualizar Usuario
  const hadleSubmit = (e) => {
    e.preventDefault();
    const res = async () => {
      const res = await userUpdate(email, firstname, lastname);
      if (res.firstname && res.lastname && res.email) {
        setEmail(res.email);
        setFirstname(res.firstname);
        setLastname(res.lastname);
      }
      return res;
    };
    toast.promise(res, {
      pending: "Guardando configuración.",
      success: {
        render(data) {
          let msg;
          if (data.data.errors) {
            msg = `Error: ` + data.data.errors[0].msg;
          } else {
            msg = "Configuración de usuario exitosa.";
          }
          return msg;
        },
      },
      error: "Error: Configuración de usuario No exitosa.",
    });
  };

  // Submit Actualizar Contraseña
  const hadleSubmitPassword = (e) => {
    e.preventDefault();
    const res = async () => {
      if (passwordNew === passwordNewConfirmed) {
        const resp = await changePasswordService({ password, passwordNew });
        return resp;
      } else {
        return { error: "Las claves No son iguales, verifique!" };
      }
    };
    toast.promise(res, {
      pending: "Guardando clave nueva.",
      success: {
        render(data) {
          let msg;
          if (data.data.errors) {
            msg = `Error: ` + data.data.errors[0].msg;
          } else if (data.data.error) {
            msg = `Error: ` + data.data.error;
          } else if (data.data.msg) {
            msg = `Error: ` + data.data.msg;
          } else {
            msg = "Cambio de clave exitoso.";
            setPassword("");
            setPasswordNew("");
            setPasswordNewConfirmed("");
          }
          return msg;
        },
      },
      error: "Error: Cambio de clave No exitoso.",
    });
  };

  return (
    <>
      <LayoutSession titleModule="Perfil">
        {/* Notificaciones */}
        <Container>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Container>
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            overflow: "hidden",
            borderRadius: "10px",
            pb: 5,
          }}
        >
          <Grid container columns={12}>
            {/* Lado Izquierdo */}
            <Grid
              item
              xs={2}
              sm={2}
              md={2}
              lg={2}
              sx={{ mt: 2, borderRight: 1, borderColor: "secondary.light" }}
              display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
            >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  component="img"
                  fullWidth
                  className="rounded-circle avatarPerfil"
                  alt="avatar"
                  src={imageIsotipoIntelix}
                  sx={{
                    maxWidth: { xs: 100, sm: 100, md: 100, lg: 140 },
                  }}
                />
              </Stack>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h6">
                  <b>{username}</b>
                </Typography>
              </Stack>
            </Grid>

            {/* Lado Derecho */}
            <Grid item xs={12} sm={12} md={10} lg={10} sx={{ mt: 2 }}>
              <Stack sx={{ mx: 2 }}>
                {/* Titulo */}
                <Grid align="center">
                  <Typography variant="subtitles">
                    Informacion del usuario
                  </Typography>
                </Grid>
                <Divider />

                {/* Formulario, Datos personales */}
                <form onSubmit={hadleSubmit}>
                  <Box
                    // sx={{ "& > :not(style)": { m: 2 } }}
                    sx={{ flexGrow: 1, m: 2 }}
                    noValidate
                    autoComplete="off"
                  >
                    <Grid
                      container
                      spacing={{ xs: 1, md: 1 }}
                      // columns={{ xs: 4, sm: 12, md: 12 }}
                    >
                      <Grid item xs={12} sm={12} md={2} lg={3}>
                        <Paper elevation={0}>
                          <TextField
                            fullWidth
                            onChange={(e) => setFirstname(e.target.value)}
                            value={firstname}
                            label="Nombre"
                            variant="outlined"
                          />
                        </Paper>
                      </Grid>

                      <Grid item xs={12} sm={12} md={2} lg={3}>
                        <Paper elevation={0}>
                          <TextField
                            fullWidth
                            onChange={(e) => setLastname(e.target.value)}
                            value={lastname}
                            label="Apellido"
                            variant="outlined"
                          />
                        </Paper>
                      </Grid>

                      <Grid item xs={12} sm={12} md={5} lg={4}>
                        <Paper elevation={0}>
                          <TextField
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            value={email}
                            label="Correo electronico"
                          />
                        </Paper>
                      </Grid>

                      <Grid item xs={12} sm={12} md={3} lg={2}>
                        <Paper elevation={0} align="center">
                          <Button
                            type="submit"
                            align="center"
                            variant="contained"
                            sx={{
                              px: 5,
                              mt: 1,
                              mb: 1,
                              borderRadius: "1rem",
                              color: "white.main",
                              textTransform: "none",
                            }}
                          >
                            Guardar
                          </Button>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                </form>

                {/* Formulario, Cambio de contraseña */}
                <form onSubmit={hadleSubmitPassword}>
                  <Grid align="center" item sx={{ mt: 2 }}>
                    <Typography variant="subtitles">Cambio de clave</Typography>
                  </Grid>
                  <Divider />

                  <Box
                    // sx={{ "& > :not(style)": { m: 2 } }}
                    sx={{ flexGrow: 1, m: 2 }}
                    noValidate
                    autoComplete="off"
                  >
                    <Grid
                      container
                      spacing={{ xs: 1, md: 1 }}
                      // columns={{ xs: 4, sm: 12, md: 12 }}
                    >
                      <Grid item xs={12} sm={12} md={3} lg={4}>
                        <Paper elevation={0}>
                          <TextField
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            label="Contraseña Actual"
                            name="password"
                            type="password"
                            variant="outlined"
                            autoComplete="false"
                            required
                          />
                        </Paper>
                      </Grid>

                      <Grid item xs={12} sm={12} md={3} lg={3}>
                        <Paper elevation={0}>
                          <TextField
                            fullWidth
                            onChange={(e) => setPasswordNew(e.target.value)}
                            value={passwordNew}
                            label="Contraseña nueva"
                            name="passwordNew"
                            type="password"
                            variant="outlined"
                            autoComplete="false"
                            required
                          />
                        </Paper>
                      </Grid>

                      <Grid item xs={12} sm={12} md={3} lg={3}>
                        <Paper elevation={0}>
                          <TextField
                            fullWidth
                            onChange={(e) =>
                              setPasswordNewConfirmed(e.target.value)
                            }
                            value={passwordNewConfirmed}
                            label="Confirmar contraseña nueva"
                            name="passwordNewConfirmed"
                            type="password"
                            variant="outlined"
                            autoComplete="false"
                            required
                          />
                        </Paper>
                      </Grid>

                      <Grid item xs={12} sm={12} md={3} lg={2}>
                        <Paper elevation={0} align="center">
                          <Button
                            type="submit"
                            align="center"
                            variant="contained"
                            sx={{
                              px: 5,
                              mt: 1,
                              mb: 1,
                              borderRadius: "1rem",
                              color: "white.main",
                              textTransform: "none",
                            }}
                          >
                            Guardar
                          </Button>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                </form>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </LayoutSession>
    </>
  );
}
