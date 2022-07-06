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
  IconButton,
  InputLabel,
  OutlinedInput,
  FormControl,
  Visibility,
  VisibilityOff,
  Tooltip,
  InputAdornment,
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

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordNewConfirmed, setShowPasswordNewConfirmed] =
    useState(false);

  // Consulta de Usuario
  useEffect(() => {
    const res = async () => {
      const res = await userGet();
      setEmail(res.body.user.email);
      setFirstname(res.body.user.firstname);
      setLastname(res.body.user.lastname);
      setUsername(res.body.user.username);
    };
    res();
  }, [userGet]);

  // Submit Actualizar Usuario
  const hadleSubmit = (e) => {
    e.preventDefault();
    const res = () => {
      return new Promise((resolve, reject) => {
        const respuesta = async () => {
          const resp = await userUpdate(email, firstname, lastname);
          if (resp.body) {
            if (resp.firstname && resp.lastname && resp.email) {
              setEmail(resp.email);
              setFirstname(resp.firstname);
              setLastname(resp.lastname);
            }
            resolve(resp);
          } else {
            setEmail(email);
            setFirstname(firstname);
            setLastname(lastname);
            reject(resp);
          }
          return res;
        };
        respuesta();
      });
    };
    toast.dismiss();
    toast.promise(res, {
      pending: "Guardando actualizacion de perfil..",
      success: {
        render({ data }) {
          let msg;
          if (data.body.msg) {
            msg = data.body.msg;
          } else {
            msg = "Actualizacion de perfil exitosa.!!";
          }
          return msg;
        },
      },
      error: {
        render({ data }) {
          let msg;
          if (data.errors.msg) {
            msg = `Error: ` + data.errors.msg;
          } else {
            msg = "Error: En la actualizacion del perfil.";
          }
          return msg;
        },
      },
    });
  };

  // Submit Actualizar Contraseña
  const hadleSubmitPassword = (e) => {
    e.preventDefault();
    const res = () => {
      return new Promise((resolve, reject) => {
        const respuesta = async () => {
          const resp = await changePasswordService({
            password,
            passwordNew,
          });
          if (resp.body) {
            resolve(resp);
            return resp;
          } else {
            reject(resp);
          }
          return resp;
        };
        respuesta();
      });
    };
    toast.dismiss();
    toast.promise(res, {
      pending: "Guardando actualizacion de contraseña..",
      success: {
        render({ data }) {
          let msg;
          if (data.body.msg) {
            msg = data.body.msg;
          } else {
            msg = "Actualizacion de contraseña Exitoso.!!";
            setPassword("");
            setPasswordNew("");
            setPasswordNewConfirmed("");
          }
          return msg;
        },
      },
      error: {
        render({ data }) {
          let msg;
          if (data.errors.msg) {
            msg = `Error: ` + data.errors.msg;
            // } else if (data.error.msg) {
            //     msg = `Error: ` + data.error.msg;
            // }
          } else {
            msg = "Error: En la actualizacion de contraseña.";
          }
          return msg;
        },
      },
    });
  };

  //Mostrar-Ocultar Contraseña
  const handleChange = () => setShowPassword(!showPassword);
  const handleChange1 = () => setShowPasswordNew(!showPasswordNew);
  const handleChange2 = () =>
    setShowPasswordNewConfirmed(!showPasswordNewConfirmed);

  const onChange = ({ currentTarget }) => setPassword(currentTarget.value);
  const onChangeNew = ({ currentTarget }) =>
    setPasswordNew(currentTarget.value);
  const onChangeNewConfirmed = ({ currentTarget }) =>
    setPasswordNewConfirmed(currentTarget.value);

  return (
    <>
      <LayoutSession titleModule="Perfil">
        {/* Notificaciones */}
        <Container>
          <ToastContainer
            position="top-right"
            autoClose={3000}
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
              sx={{
                mt: 2,
                borderRight: 1,
                borderColor: "secondary.light",
              }}
              display={{
                xs: "none",
                sm: "none",
                md: "block",
                lg: "block",
              }}
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
                    maxWidth: {
                      xs: 100,
                      sm: 100,
                      md: 100,
                      lg: 140,
                    },
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
                            required
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
                            required
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
                            required
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
                          <FormControl required fullWidth>
                            <InputLabel>Contraseña Actual</InputLabel>
                            <OutlinedInput
                              label="Contraseña Actual"
                              onChange={onChange}
                              type={showPassword ? "text" : "password"}
                              value={password}
                              variant="outlined"
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton onClick={handleChange}>
                                    {showPassword ? (
                                      <Tooltip title="Ocultar contraseña">
                                        <span>
                                          <VisibilityOff />
                                        </span>
                                      </Tooltip>
                                    ) : (
                                      <Tooltip title="Mostrar contraseña">
                                        <span>
                                          <Visibility />
                                        </span>
                                      </Tooltip>
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </Paper>
                      </Grid>

                      <Grid item xs={12} sm={12} md={3} lg={3}>
                        <Paper elevation={0}>
                          <FormControl required fullWidth>
                            <InputLabel>Contraseña Nueva</InputLabel>
                            <OutlinedInput
                              label="Contraseña Nueva"
                              onChange={onChangeNew}
                              type={showPasswordNew ? "text" : "password"}
                              value={passwordNew}
                              variant="outlined"
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton onClick={handleChange1}>
                                    {showPasswordNew ? (
                                      <Tooltip title="Ocultar contraseña">
                                        <span>
                                          <VisibilityOff />
                                        </span>
                                      </Tooltip>
                                    ) : (
                                      <Tooltip title="Mostrar contraseña">
                                        <span>
                                          <Visibility />
                                        </span>
                                      </Tooltip>
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </Paper>
                      </Grid>

                      <Grid item xs={12} sm={12} md={3} lg={3}>
                        <Paper elevation={0}>
                          <FormControl required fullWidth>
                            <InputLabel>Confirmar Contraseña Nueva</InputLabel>
                            <OutlinedInput
                              label="Confirmar Contraseña Nueva"
                              onChange={onChangeNewConfirmed}
                              type={
                                showPasswordNewConfirmed ? "text" : "password"
                              }
                              value={passwordNewConfirmed}
                              variant="outlined"
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton onClick={handleChange2}>
                                    {showPasswordNewConfirmed ? (
                                      <Tooltip title="Ocultar contraseña">
                                        <span>
                                          <VisibilityOff />
                                        </span>
                                      </Tooltip>
                                    ) : (
                                      <Tooltip title="Mostrar contraseña">
                                        <span>
                                          <Visibility />
                                        </span>
                                      </Tooltip>
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </Paper>
                      </Grid>

                      <Grid item xs={12} sm={12} md={3} lg={2}>
                        <Paper elevation={0} align="center">
                          {passwordNew === passwordNewConfirmed ? (
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
                          ) : (
                            <Tooltip
                              followCursor
                              title="Verifica las contraseñas"
                            >
                              <span>
                                <Button
                                  type="submit"
                                  align="center"
                                  variant="contained"
                                  disabled
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
                              </span>
                            </Tooltip>
                          )}
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
