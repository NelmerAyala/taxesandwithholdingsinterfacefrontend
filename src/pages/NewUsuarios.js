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

  const [privilegiosSelected_1, setPrivilegiosSelected_1] = useState([]);
  const [privilegiosSelected_2, setPrivilegiosSelected_2] = useState([]);
  const [privilegiosSelected_3, setPrivilegiosSelected_3] = useState([]);
  const [privilegiosSelected_4, setPrivilegiosSelected_4] = useState([]);

  const [companiasPrivilegios, setCompaniasPrivilegios] = useState([]);

  const privilegiosObjeto = [];

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

  //Asignando Privilegios por compañías
  useEffect(() => {
    setCompaniasPrivilegios([
      {
        id: 1,
        privilegios: privilegiosSelected_1,
      },
      {
        id: 2,
        privilegios: privilegiosSelected_2,
      },
      {
        id: 3,
        privilegios: privilegiosSelected_3,
      },
      {
        id: 4,
        privilegios: privilegiosSelected_4,
      },
    ]);
  }, [
    privilegiosSelected_1,
    privilegiosSelected_2,
    privilegiosSelected_3,
    privilegiosSelected_4,
  ]);

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

  // Select Chip
  const handleChangePrivilege = (e) => {
    // let company = e.target.company;
    // let privilegios = e.target.value;

    if (e.target.company === 1) {
      setPrivilegiosSelected_1(e.target.value);
    }
    if (e.target.company === 2) {
      setPrivilegiosSelected_2(e.target.value);
    }
    if (e.target.company === 3) {
      setPrivilegiosSelected_3(e.target.value);
    }
    if (e.target.company === 4) {
      setPrivilegiosSelected_4(e.target.value);
    }
  };

  privilegios.map((privilegio) => {
    privilegiosObjeto[privilegio.id] = privilegio.nombre_privilegio;
    return "";
  });

  //Mostrar-Ocultar Contraseña
  const handleChange = () => setShowPassword(!showPassword);
  const handleChange1 = () => setShowPasswordConfirmed(!showPasswordConfirmed);
  const onChange = ({ currentTarget }) => setPassword(currentTarget.value);
  const onChangeNew = ({ currentTarget }) =>
    setPasswordConfirmed(currentTarget.value);

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
                <Link to={`../usuarios`}>
                  <MdKeyboardBackspace color="#75787B" size={35} />{" "}
                </Link>
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
                  <Typography variant="subtitles">
                    Privilegios por Compañías
                  </Typography>
                </Grid>
                <Divider />

                <Grid container spacing={{ xs: 1, md: 1 }} sx={{ pt: 1 }}>
                  {companias.map((company, index) => (
                    // <div>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      {company.id === 1 ? (
                        // <Grid
                        //     item
                        //     xs={12}
                        //     sm={12}
                        //     md={6}
                        //     lg={6}
                        // >
                        <Paper elevation={0}>
                          <FormControl fullWidth>
                            <InputLabel>Privilegios Febeca</InputLabel>
                            <Select
                              name="selectPrivilegios_1"
                              multiple
                              value={privilegiosSelected_1}
                              onChange={(e) =>
                                handleChangePrivilege({
                                  target: {
                                    company: company.id,
                                    value: e.target.value,
                                  },
                                })
                              }
                              input={
                                <OutlinedInput
                                  id="select-multiple-privilegios-1"
                                  label={"Privilegios Febeca"}
                                />
                              }
                              renderValue={(selected) => (
                                <Box>
                                  {selected.map((value) => (
                                    <Chip
                                      key={value}
                                      label={privilegiosObjeto[value]}
                                    />
                                  ))}
                                </Box>
                              )}
                            >
                              {Object.keys(privilegiosObjeto).map((id) => (
                                <MenuItem key={id} value={id}>
                                  {privilegiosObjeto[id]}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Paper>
                      ) : (
                        // </Grid>
                        <></>
                      )}

                      {company.id === 2 ? (
                        // <Grid
                        //     item
                        //     xs={12}
                        //     sm={12}
                        //     md={6}
                        //     lg={6}
                        // >
                        <Paper elevation={0}>
                          <FormControl fullWidth>
                            <InputLabel>Privilegios Mayor Beval</InputLabel>
                            <Select
                              name="selectPrivilegios_2"
                              multiple
                              value={privilegiosSelected_2}
                              onChange={(e) =>
                                handleChangePrivilege({
                                  target: {
                                    company: company.id,
                                    value: e.target.value,
                                  },
                                })
                              }
                              input={
                                <OutlinedInput
                                  id="select-multiple-privilegios-2"
                                  label={"Privilegios Mayor Beval"}
                                />
                              }
                              renderValue={(selected) => (
                                <Box>
                                  {selected.map((value) => (
                                    <Chip
                                      key={value}
                                      label={privilegiosObjeto[value]}
                                    />
                                  ))}
                                </Box>
                              )}
                            >
                              {Object.keys(privilegiosObjeto).map((id) => (
                                <MenuItem key={id} value={id}>
                                  {privilegiosObjeto[id]}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Paper>
                      ) : (
                        // </Grid>
                        <></>
                      )}

                      {company.id === 3 ? (
                        // <Grid
                        //     item
                        //     xs={12}
                        //     sm={12}
                        //     md={6}
                        //     lg={6}
                        // >
                        <Paper elevation={0}>
                          <FormControl fullWidth>
                            <InputLabel>Privilegios Sillaca</InputLabel>
                            <Select
                              name="selectPrivilegios_3"
                              multiple
                              value={privilegiosSelected_3}
                              onChange={(e) =>
                                handleChangePrivilege({
                                  target: {
                                    company: company.id,
                                    value: e.target.value,
                                  },
                                })
                              }
                              input={
                                <OutlinedInput
                                  id="select-multiple-privilegios-3"
                                  label={"Privilegios Sillaca"}
                                />
                              }
                              renderValue={(selected) => (
                                <Box>
                                  {selected.map((value) => (
                                    <Chip
                                      key={value}
                                      label={privilegiosObjeto[value]}
                                    />
                                  ))}
                                </Box>
                              )}
                            >
                              {Object.keys(privilegiosObjeto).map((id) => (
                                <MenuItem key={id} value={id}>
                                  {privilegiosObjeto[id]}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Paper>
                      ) : (
                        // </Grid>
                        <></>
                      )}

                      {company.id === 4 ? (
                        // <Grid
                        //     item
                        //     xs={12}
                        //     sm={12}
                        //     md={6}
                        //     lg={6}
                        // >
                        <Paper elevation={0}>
                          <FormControl fullWidth>
                            <InputLabel>Privilegios Prisma</InputLabel>
                            <Select
                              name="selectPrivilegios_4"
                              multiple
                              value={privilegiosSelected_4}
                              onChange={(e) =>
                                handleChangePrivilege({
                                  target: {
                                    company: company.id,
                                    value: e.target.value,
                                  },
                                })
                              }
                              input={
                                <OutlinedInput
                                  id="select-multiple-privilegios-4"
                                  label={"Privilegios Prisma"}
                                />
                              }
                              renderValue={(selected) => (
                                <Box>
                                  {selected.map((value) => (
                                    <Chip
                                      key={value}
                                      label={privilegiosObjeto[value]}
                                    />
                                  ))}
                                </Box>
                              )}
                            >
                              {Object.keys(privilegiosObjeto).map((id) => (
                                <MenuItem key={id} value={id}>
                                  {privilegiosObjeto[id]}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Paper>
                      ) : (
                        // </Grid>
                        <></>
                      )}
                      {/* </div> */}
                    </Grid>
                  ))}
                </Grid>
                {/* {companias.map((company, index) => (
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Paper elevation={0}>
                        <FormControl fullWidth>
                          <InputLabel>
                            Privilegios {company.nombre_company} {index}
                          </InputLabel>
                          <Select
                            name="selectPrivilegios_1"
                            multiple
                            value={privilegiosSelected}
                            onChange={(e) =>
                              handleChangePrivilege({
                                target: {
                                  company: companias[0].id,
                                  value: e.target.value,
                                },
                              })
                            }
                            input={
                              <OutlinedInput
                                id="select-multiple-privilegios-1"
                                label={"Privilegios Febeca"}
                              />
                            }
                            renderValue={(selected) => (
                              <Box>
                                {selected.map((value) => (
                                  <Chip
                                    key={value}
                                    label={privilegiosObjeto[value]}
                                  />
                                ))}
                              </Box>
                            )}
                          >
                            {Object.keys(privilegiosObjeto).map((id) => (
                              <MenuItem key={id} value={id}>
                                {privilegiosObjeto[id]}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Paper>
                    </Grid>
                  ))} */}

                {/* <Divider /> */}
                {/* </Grid> */}
              </Box>
            </Stack>
          </Grid>
        </Paper>
      </form>
    </LayoutSession>
  );
}
