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
  MdKeyboardBackspace,
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
  const [privilegio, setPrivilegio] = useState([]);

  const [userCreado, setUserCreado] = useState([]);

  const [privilegiosSelected_1, setPrivilegiosSelected_1] = useState([]);
  const [privilegiosSelected_2, setPrivilegiosSelected_2] = useState([]);
  const [privilegiosSelected_3, setPrivilegiosSelected_3] = useState([]);
  const [privilegiosSelected_4, setPrivilegiosSelected_4] = useState([]);
  const [dictCompaniasPrivilegios, setDictCompaniasPrivilegios] = useState([]);
  // const [objeto, setObjeto] = useState([]);
  // const [privilegiosSelected, setPrivilegiosSelected] = useState({
  //   id: "",
  //   privilegios: [],
  // });

  const privilegies = [];

  // Navigate
  let navigate = useNavigate();

  //Consulta Compañias
  useEffect(() => {
    const res = async () => {
      const resp = await listCompaniasService();
      setCompanias(resp);
    };
    res();
  }, []);

  //Consulta Privilegios
  useEffect(() => {
    const res = async () => {
      const resp = await listPrivilegiosService();
      setPrivilegio(resp);
    };
    res();
  }, []);

  // Submit Crear Usuario
  const hadleSubmit = (e) => {
    e.preventDefault();
    const res = async () => {
      if (password === passwordConfirmed && email === emailConfirmed) {
        const resp = await userCreateService(
          username,
          firstname,
          lastname,
          email,
          password,
          dictCompaniasPrivilegios
        );
        setUserCreado(resp);
        console.log(resp);
        if (!resp.errors) {
          navigate(`/usuarios/${resp.user.user.id}`);
        }
        return resp;
      } else {
        if (email !== emailConfirmed) {
          return {
            error: "Las correos electrónicos No son iguales, verifique!",
          };
        } else if (password !== passwordConfirmed) {
          return { error: "Las contraseñas No son iguales, verifique!" };
        } else {
          return { msg: "¡Verifica tus datos!" };
        }
      }
    };
    toast.promise(res, {
      pending: "Creando usuario..",
      success: {
        render(data) {
          let msg;
          console.log(data);
          if (data.data.errors) {
            msg = `Error: ` + data.data.errors[0].msg;
          } else if (data.data.error) {
            msg = `Error: ` + data.data.error;
          } else if (data.data.msg) {
            msg = data.data.msg;
          } else {
            msg = "Creación de usuario exitosa.";
          }
          return msg;
        },
      },
      error: "Error: Configuración de usuario No Exitosa.",
    });
  };

  // Select Chip
  const handleChangePrivilege = (event) => {
    let company = event.target.company;
    let privilegios = event.target.value;

    if (company === 1) {
      setPrivilegiosSelected_1(privilegios);
    }
    if (company === 2) {
      setPrivilegiosSelected_2(privilegios);
    }
    if (company === 3) {
      setPrivilegiosSelected_3(privilegios);
    }
    if (company === 4) {
      setPrivilegiosSelected_4(privilegios);
    }

    let objeto = [];
    if (privilegiosSelected_1.length > 0) {
      objeto.push({
        id: 1,
        privilegios: privilegiosSelected_1,
      });
    }

    if (privilegiosSelected_2.length > 0) {
      objeto.push({
        id: 2,
        privilegios: privilegiosSelected_2,
      });
    }
    if (privilegiosSelected_3.length > 0) {
      objeto.push({
        id: 3,
        privilegios: privilegiosSelected_3,
      });
    }

    if (privilegiosSelected_4.length > 0) {
      objeto.push({
        id: 4,
        privilegios: privilegiosSelected_4,
      });
    }

    setDictCompaniasPrivilegios({
      companys: objeto,
    });
  };

  console.log(dictCompaniasPrivilegios);

  privilegio.map((privi) => {
    privilegies[privi.id] = privi.nombre_privilegio;
    return "";
  });

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
          <Box sx={{}}>
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

          <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 2 }}>
            <Stack sx={{ mx: 2 }}>
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
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Paper elevation={0}>
                      <TextField
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
                      <TextField
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        label="Contraseña"
                        required
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper elevation={0}>
                      <TextField
                        fullWidth
                        onChange={(e) => setPasswordConfirmed(e.target.value)}
                        type="password"
                        label="Confirmar contraseña"
                        required
                      />
                    </Paper>
                  </Grid>

                  {/* <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper elevation={0}>
                      <FormControl fullWidth>
                        <InputLabel id="select-label">Empresas</InputLabel>
                        <Select
                          value={companysSelected}
                          // defaultValue={"DEFAULT"}
                          label="Empresas"
                          onChange={handleChangeEmp}
                          fullWidth
                        >
                          {Object.keys(companias).map((id) => (
                            <MenuItem key={id} value={id}>
                              {companias[id]}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Paper>
                  </Grid> */}
                  {/* {console.log(companias)} */}
                  {/* {companias.map((company, index) => ( */}

                  <Grid item xs={12} sm={12} md={6} lg={6}>
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
                                <Chip key={value} label={privilegies[value]} />
                              ))}
                            </Box>
                          )}
                        >
                          {Object.keys(privilegies).map((id) => (
                            <MenuItem key={id} value={id}>
                              {privilegies[id]}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
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
                                company: companias[1].id,
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
                                <Chip key={value} label={privilegies[value]} />
                              ))}
                            </Box>
                          )}
                        >
                          {Object.keys(privilegies).map((id) => (
                            <MenuItem key={id} value={id}>
                              {privilegies[id]}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
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
                                company: companias[2].id,
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
                                <Chip key={value} label={privilegies[value]} />
                              ))}
                            </Box>
                          )}
                        >
                          {Object.keys(privilegies).map((id) => (
                            <MenuItem key={id} value={id}>
                              {privilegies[id]}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
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
                                company: companias[3].id,
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
                                <Chip key={value} label={privilegies[value]} />
                              ))}
                            </Box>
                          )}
                        >
                          {Object.keys(privilegies).map((id) => (
                            <MenuItem key={id} value={id}>
                              {privilegies[id]}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Paper>
                  </Grid>
                  {/* ))} */}
                </Grid>
              </Box>
            </Stack>
          </Grid>
        </Paper>
      </form>
    </LayoutSession>
  );
}
