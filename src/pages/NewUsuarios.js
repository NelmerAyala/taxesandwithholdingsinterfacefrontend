// Nuevo
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Estilos
import "../assets/css/App.css";

// Layout
import LayoutSession from "../layout/LayoutSession";

// Services
import userCreateService from "../services/userCreateService";
import listCompaniasService from "../services/listCompaniasService";
import listPrivilegiosService from "../services/listPrivilegiosService";

// Notificaciones
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// External components
import {
  Box,
  Container,
  Button,
  FormControl,
  Paper,
  TextField,
  Grid,
  Divider,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  OutlinedInput,
  Stack,
  Tooltip,
  MdKeyboardBackspace,
  Visibility,
  VisibilityOff,
  IconButton,
  InputAdornment,
} from "../consts";

export default function NuevoUsuario() {
  // Constantes
  const [username, setUsername] = useState([]);
  const [firstname, setFirstname] = useState([]);
  const [lastname, setLastname] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [emailConfirmed, setEmailConfirmed] = useState([]);
  const [passwordConfirmed, setPasswordConfirmed] = useState([]);
  const [companias, setCompanias] = useState([]);
  const [privilegios, setPrivilegios] = useState([]);

  const [privilegiosSelected, setPrivilegiosSelected] = useState([]);
  const [companiasPrivilegios, setCompaniasPrivilegios] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmed, setShowPasswordConfirmed] = useState(false);

  // Navigate
  let navigate = useNavigate();

  //Consulta Compañias
  useEffect(() => {
    const res = async () => {
      const resp = await listCompaniasService();
      setCompanias(resp.body.companias);
    };
    res();
  }, []);

  //Consulta Privilegios
  useEffect(() => {
    const res = async () => {
      const resp = await listPrivilegiosService();
      setPrivilegios(resp.body);
    };
    res();
  }, []);

  //Seleccionando Privilegios para el Usuario
  useEffect(() => {
    let companiasPrivilegiosArray = [];
    let selectedCompaniaActual = [];

    for (let compania of companias) {
      for (let objetoSelected of privilegiosSelected) {
        let objetoSelectedCompleto =
          companiasPrivilegiosData[objetoSelected - 1];
        if (objetoSelectedCompleto.idCompania === compania.id) {
          selectedCompaniaActual.push(objetoSelectedCompleto.idPrivilegio);
        }
      }

      companiasPrivilegiosArray.push({
        id: compania.id,
        privilegios: selectedCompaniaActual,
      });
      selectedCompaniaActual = [];
    }

    setCompaniasPrivilegios(companiasPrivilegiosArray);
  }, [privilegiosSelected, companias]);

  // Submit Crear Usuario
  const hadleSubmit = (e) => {
    e.preventDefault();
    const res = () => {
      return new Promise((resolve, reject) => {
        const respuesta = async () => {
          if (password === passwordConfirmed && email === emailConfirmed) {
            const resp = await userCreateService(
              username,
              firstname,
              lastname,
              email,
              password,
              companiasPrivilegios
            );
            if (!resp.errors) {
              resolve(resp);
              navigate(`/usuarios/${resp.body.user.id}`);
            } else {
              reject(resp);
            }
          } else {
            let msg;
            if (email !== emailConfirmed) {
              reject({
                errors: {
                  msg: "Las correos electrónicos NO son iguales, verifique!",
                },
              });
            } else if (password !== passwordConfirmed) {
              reject({
                errors: { msg: "Las contraseñas NO son iguales, verifique!" },
              });
            } else {
              reject({ errors: { msg: "¡Verifica tus datos!" } });
            }
            return msg;
          }
        };
        respuesta();
      });
    };
    toast.dismiss();
    toast.promise(res, {
      pending: "Creando usuario..",
      success: {
        render({ data }) {
          let msg;
          if (data.body) {
            msg = data.body.msg;
          } else {
            msg = "Creación de usuario exitosa.";
          }
          return msg;
        },
      },
      error: {
        render({ data }) {
          let msg;
          if (data.errors.msg) {
            msg = `Error: ` + data.errors.msg;
          } else if (data.errors.errors) {
            msg = `Error: ` + data.errors.errors[0].msg;
          } else {
            msg = "Error: Configuración de usuario No Exitosa.";
          }
          return msg;
        },
      },
    });
  };

  //Mostrar-Ocultar Contraseña
  const handleChange = () => setShowPassword(!showPassword);
  const handleChange1 = () => setShowPasswordConfirmed(!showPasswordConfirmed);
  const onChange = ({ currentTarget }) => setPassword(currentTarget.value);
  const onChangeNew = ({ currentTarget }) =>
    setPasswordConfirmed(currentTarget.value);

  // Al cambiar seleccionados
  const handleChangePrivilege = (e) => {
    setPrivilegiosSelected(e.target.value);
  };

  // Creando array con todos los privilegios para cada una de las compañias
  let companiasPrivilegiosData = [];
  let idObjeto = 1;
  for (let compania of companias) {
    for (let privilegio of privilegios) {
      companiasPrivilegiosData.push({
        id: idObjeto,
        idCompania: compania.id,
        compania: compania.nombre_company,
        idPrivilegio: privilegio.id,
        privilegio: privilegio.nombre_privilegio,
      });
      idObjeto = idObjeto + 1;
    }
  }

  // Creando Array con opciones para el select (compañia - privilegio)
  let companiasPrivilegiosOptions = [];
  for (let companiaPrivilegio of companiasPrivilegiosData) {
    companiasPrivilegiosOptions[companiaPrivilegio.id] =
      companiaPrivilegio.compania + " - " + companiaPrivilegio.privilegio;
  }

  return (
    <LayoutSession titleModule="Usuarios">
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

      {/* Formulario */}
      <form onSubmit={hadleSubmit}>
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            overflow: "hidden",
            borderRadius: "10px",
            pb: 5,
          }}
        >
          <Box>
            <Stack direction={{ xs: "column", sm: "row" }}>
              {/* Titulo */}
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item sx={{ pt: 2, pl: 2 }}>
                  <Typography variant="subtitles">
                    Registro de Usuario
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Tooltip followCursor title="Regresar">
                  <span>
                    <Link to={`../usuarios`}>
                      <MdKeyboardBackspace color="#75787B" size={35} />
                    </Link>
                  </span>
                </Tooltip>
              </Grid>
            </Stack>
          </Box>
          <Divider variant="middle " />

          {/* Button */}
          <Box sx={{ p: 2 }}>
            <Stack direction={{ xs: "column", sm: "row" }}>
              <Grid
                container
                direction="row"
                justifyContent="flex-END"
                alignItems="flex-start"
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    px: 5,
                    borderRadius: "1rem",
                    color: "white.main",
                    textTransform: "none",
                  }}
                >
                  Crear Usuario
                </Button>
              </Grid>
            </Stack>
          </Box>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Stack sx={{ mx: 2 }}>
              <Box sx={{ flexGrow: 1, m: 2 }} noValidate autoComplete="off">
                <Grid align="center" item sx={{ mt: 1 }}>
                  <Typography variant="subtitles">Datos Personales</Typography>
                </Grid>
                <Divider />
                <Grid container spacing={{ xs: 1, md: 1 }} sx={{ pt: 1 }}>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Paper elevation={0}>
                      <TextField
                        required
                        fullWidth
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        label="Nombre de usuario"
                        variant="outlined"
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Paper elevation={0}>
                      <TextField
                        required
                        fullWidth
                        onChange={(e) => setFirstname(e.target.value)}
                        value={firstname}
                        label="Nombres"
                        variant="outlined"
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Paper elevation={0}>
                      <TextField
                        required
                        fullWidth
                        onChange={(e) => setLastname(e.target.value)}
                        value={lastname}
                        label="Apellidos"
                        variant="outlined"
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
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
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper elevation={0}>
                      <TextField
                        fullWidth
                        onChange={(e) => setEmailConfirmed(e.target.value)}
                        type="email"
                        value={emailConfirmed}
                        label="Confirmar Correo electronico"
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper elevation={0}>
                      <FormControl required fullWidth>
                        <InputLabel>Contraseña</InputLabel>
                        <OutlinedInput
                          label="Contraseña"
                          onChange={onChange}
                          type={showPassword ? "text" : "password"}
                          value={password}
                          variant="outlined"
                          autoComplete="false"
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

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper elevation={0}>
                      <FormControl required fullWidth>
                        <InputLabel>Confirmar Contraseña </InputLabel>
                        <OutlinedInput
                          label="Confirmar Contraseña"
                          onChange={onChangeNew}
                          type={showPasswordConfirmed ? "text" : "password"}
                          value={passwordConfirmed}
                          variant="outlined"
                          autoComplete="false"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton onClick={handleChange1}>
                                {showPasswordConfirmed ? (
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
                </Grid>

                <Grid align="center" item sx={{ mt: 4 }}>
                  <Typography variant="subtitles">Privilegios</Typography>
                </Grid>
                <Divider />

                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Paper elevation={0}>
                    <FormControl fullWidth>
                      <InputLabel>Privilegios</InputLabel>
                      <Select
                        name={"selectPrivilegios_1"}
                        multiple
                        value={privilegiosSelected}
                        onChange={(e) =>
                          handleChangePrivilege({
                            target: {
                              value: e.target.value,
                            },
                          })
                        }
                        input={
                          <OutlinedInput
                            id={"select-multiple-privilegios"}
                            label={"Privilegios"}
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip
                                key={value}
                                label={companiasPrivilegiosOptions[value]}
                              />
                            ))}
                          </Box>
                        )}
                      >
                        {Object.keys(companiasPrivilegiosOptions).map((id) => (
                          <MenuItem key={id} value={id}>
                            {companiasPrivilegiosOptions[id]}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Paper>
                </Grid>
              </Box>
            </Stack>
          </Grid>
        </Paper>
      </form>
    </LayoutSession>
  );
}
