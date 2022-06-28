// Nuevo
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// Estilos
import "../assets/css/App.css";

// Hooks
import useUser from "../hooks/useUser";

// Layout
import LayoutSession from "../layout/LayoutSession";

// Service
import userDetailsService from "../services/userDetailsService";
import listCompaniasService from "../services/listCompaniasService";
import listPrivilegiosService from "../services/listPrivilegiosService";

// Notificaciones
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// External components
import {
  Box,
  Button,
  Paper,
  Grid,
  Divider,
  Typography,
  TextField,
  Container,
  Stack,
  MdKeyboardBackspace,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
} from "../consts";

export default function DetailsUser() {
  // Constants
  const { id } = useParams();
  const [email, setEmail] = useState([]);
  const [firstname, setFirstname] = useState([]);
  const [lastname, setLastname] = useState([]);
  const [username, setUsername] = useState([]);
  const [userCompanies, setUserCompanies] = useState([]);

  const [companias, setCompanias] = useState([]);
  const [privilegios, setPrivilegios] = useState([]);
  const [privilegiosSelected_1, setPrivilegiosSelected_1] = useState([]);
  const [privilegiosSelected_2, setPrivilegiosSelected_2] = useState([]);
  const [privilegiosSelected_3, setPrivilegiosSelected_3] = useState([]);
  const [privilegiosSelected_4, setPrivilegiosSelected_4] = useState([]);

  const [companiasPrivilegios, setCompaniasPrivilegios] = useState([]);

  const privilegiosObjeto = [];

  const { userUpdateAdmin } = useUser();

  // Consulta detalles del usuario
  useEffect(() => {
    const res = async () => {
      const res = await userDetailsService(id);
      res.body.email ? setEmail(res.body.email) : setEmail([]);
      res.body.lastname ? setFirstname(res.body.firstname) : setFirstname([]);
      res.body.lastname ? setLastname(res.body.lastname) : setLastname([]);
      res.body.username ? setUsername(res.body.username) : setUsername([]);
      res.body.UserCompanies
        ? setUserCompanies(res.body.UserCompanies)
        : setUserCompanies([]);
    };
    res();
  }, [id]);

  //Consulta Compañias
  useEffect(() => {
    for (let userCompany of userCompanies) {
      // for (const company in userCompany) {
      let privilegios = [];
      for (const UserCompanyPrivilegio of userCompany.UserCompanyPrivilegios) {
        privilegios.push(UserCompanyPrivilegio.PrivilegioId.toString());
      }

      if (userCompany.CompanyId === 1) {
        setPrivilegiosSelected_1(privilegios);
      }
      if (userCompany.CompanyId === 2) {
        setPrivilegiosSelected_2(privilegios);
      }
      if (userCompany.CompanyId === 3) {
        setPrivilegiosSelected_3(privilegios);
      }
      if (userCompany.CompanyId === 4) {
        setPrivilegiosSelected_4(privilegios);
      }
    }
  }, [userCompanies]);

  //Consulta Compañias
  useEffect(() => {
    const res = async () => {
      const resp = await listCompaniasService();
      setCompanias(resp.body);
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

  // Submit editar usuario
  const hadleSubmit = (e) => {
    e.preventDefault();
    const res = async () => {
      const res = await userUpdateAdmin(
        id,
        email,
        firstname,
        lastname,
        companiasPrivilegios
      );

      if (!res.errors) {
        res.body.email ? setEmail(res.body.email) : setEmail([]);
        res.body.lastname ? setFirstname(res.body.firstname) : setFirstname([]);
        res.body.lastname ? setLastname(res.body.lastname) : setLastname([]);
        res.body.username ? setUsername(res.body.username) : setUsername([]);
        res.body.UserCompanies
          ? setUserCompanies(res.body.UserCompanies)
          : setUserCompanies([]);
      }
      return res;
    };
    // res()
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

  return (
    <LayoutSession titleModule="Detalle de usuario ">
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
                    Perfil de <b>{username}</b>
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
                  Guardar
                </Button>
              </Grid>
            </Stack>
          </Box>

          {/* Formulario, datos personales */}
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Stack sx={{ mx: 2 }}>
              <Box
                // sx={{ "& > :not(style)": { m: 2 } }}
                sx={{ flexGrow: 1, m: 2 }}
                noValidate
                autoComplete="off"
              >
                <Grid align="center" item sx={{ mt: 1 }}>
                  <Typography variant="subtitles">Datos Personales</Typography>
                </Grid>
                <Divider />
                <Grid container spacing={{ xs: 1, md: 1 }} sx={{ pt: 1 }}>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Paper elevation={0}>
                      <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Nombre"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Paper elevation={0}>
                      <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Apellido"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Paper elevation={0}>
                      <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Paper>
                  </Grid>
                </Grid>

                <Grid align="center" item sx={{ mt: 4 }}>
                  <Typography variant="subtitles">
                    Privilegios por Compañías
                  </Typography>
                </Grid>
                <Divider />

                {companias.map((company, index) => (
                  <Grid
                    key={index}
                    container
                    spacing={{ xs: 1, md: 1 }}
                    sx={{ pt: 1 }}
                  >
                    {company.id === 1 ? (
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
                      </Grid>
                    ) : (
                      <></>
                    )}

                    {company.id === 2 ? (
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
                      </Grid>
                    ) : (
                      <></>
                    )}

                    {company.id === 3 ? (
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
                      </Grid>
                    ) : (
                      <></>
                    )}

                    {company.id === 4 ? (
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
                      </Grid>
                    ) : (
                      <></>
                    )}
                  </Grid>
                ))}

                {/* <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper elevation={0}>
                      <FormControl fullWidth>
                        <InputLabel>Privilegios Febeca</InputLabel>
                        <Select
                          name="selectPrivilegios_1"
                          defaultValue={privilegiosSelected_1}
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
                              value={privilegiosSelected_1}
                            />
                          }
                          renderValue={(selected) => (
                            <Box>
                              {selected.map((value) => (
                                <Chip
                                  key={value}
                                  label={privilegiosObjeto[value]}
                                  value={privilegiosSelected_1}
                                  defaultValue={privilegiosSelected_1}
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
                  </Grid> */}
              </Box>
            </Stack>
          </Grid>
        </Paper>
      </form>
    </LayoutSession>
  );
}
