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
          let msg = "Actualizacion de Perfil Exitosa.!!";
          if (data.body.msg) {
            msg = data.body.msg;
          }
          return msg;
        },
      },
      error: {
        render({ data }) {
          let msg = "Error: En la actualizacion del perfil.!!";
          if (data.errors.msg) {
            msg = `Error: ` + data.errors.msg;
          }
          return msg;
        },
      },
    });
  };

  // Submit Actualizar Contrase??a
  const hadleSubmitPassword = (e) => {
    e.preventDefault();
    const res = () => {
      return new Promise((resolve, reject) => {
        const respuesta = async () => {
          if (passwordNew === passwordNewConfirmed) {
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
          } else {
            reject({
              errors: {
                msg: "Las contrase??as NO son iguales, ??Verifique!",
              },
            });
          }
        };
        respuesta();
      });
    };
    toast.dismiss();
    toast.promise(res, {
      pending: "Guardando actualizacion de contrase??a..",
      success: {
        render({ data }) {
          let msg = "Actualizacion de contrase??a exitoso.!!";
          if (data.body.msg) {
            msg = data.body.msg;
            setPassword("");
            setPasswordNew("");
            setPasswordNewConfirmed("");
          }
          return msg;
        },
      },
      error: {
        render({ data }) {
          let msg = "Error: En la actualizacion de contrase??a.!!";
          if (data.errors.msg) {
            msg = `Error: ` + data.errors.msg;
          }
          return msg;
        },
      },
    });
  };

  //Mostrar-Ocultar Contrase??a
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

                {/* Formulario, Cambio de contrase??a */}
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
                            <InputLabel>Contrase??a Actual</InputLabel>
                            <OutlinedInput
                              label="Contrase??a Actual"
                              onChange={onChange}
                              type={showPassword ? "text" : "password"}
                              value={password}
                              variant="outlined"
                              autoComplete="false"
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton onClick={handleChange}>
                                    {showPassword ? (
                                      <Tooltip title="Ocultar contrase??a">
                                        <span>
                                          <VisibilityOff />
                                        </span>
                                      </Tooltip>
                                    ) : (
                                      <Tooltip title="Mostrar contrase??a">
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
                            <InputLabel>Contrase??a Nueva</InputLabel>
                            <OutlinedInput
                              label="Contrase??a Nueva"
                              onChange={onChangeNew}
                              type={showPasswordNew ? "text" : "password"}
                              value={passwordNew}
                              variant="outlined"
                              autoComplete="false"
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton onClick={handleChange1}>
                                    {showPasswordNew ? (
                                      <Tooltip title="Ocultar contrase??a">
                                        <span>
                                          <VisibilityOff />
                                        </span>
                                      </Tooltip>
                                    ) : (
                                      <Tooltip title="Mostrar contrase??a">
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
                            <InputLabel>Confirmar Contrase??a</InputLabel>
                            <OutlinedInput
                              label="Confirmar Contrase??a"
                              onChange={onChangeNewConfirmed}
                              type={
                                showPasswordNewConfirmed ? "text" : "password"
                              }
                              value={passwordNewConfirmed}
                              variant="outlined"
                              autoComplete="false"
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton onClick={handleChange2}>
                                    {showPasswordNewConfirmed ? (
                                      <Tooltip title="Ocultar contrase??a">
                                        <span>
                                          <VisibilityOff />
                                        </span>
                                      </Tooltip>
                                    ) : (
                                      <Tooltip title="Mostrar contrase??a">
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
