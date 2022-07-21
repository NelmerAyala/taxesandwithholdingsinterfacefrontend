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
  Tooltip,
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
  const [privilegiosSelected, setPrivilegiosSelected] = useState([]);

  const [companiasPrivilegios, setCompaniasPrivilegios] = useState([]);

  // const privilegiosObjeto = [];

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

  // Submit editar usuario
  const hadleSubmit = (e) => {
    e.preventDefault();
    const res = () => {
      return new Promise((resolve, reject) => {
        const respuesta = async () => {
          const res = await userUpdateAdmin(
            id,
            email,
            firstname,
            lastname,
            companiasPrivilegios
          );
          if (res.body) {
            if (
              res.email &&
              res.firstname &&
              res.lastname &&
              res.companiasPrivilegios
            ) {
              setEmail(res.email);
              setFirstname(res.firstname);
              setLastname(res.lastname);
              setUsername(res.username);
              setUserCompanies(res.UserCompanies);
            }
            resolve(res);
          } else {
            setEmail(email);
            setFirstname(firstname);
            setLastname(lastname);
            setUsername(username);
            setUserCompanies([]);
            reject(res);
          }
          return res;
        };
        respuesta();
      });
    };
    toast.dismiss();
    toast.promise(res, {
      pending: "Guardando actualizacion de usuario..",
      success: {
        render({ data }) {
          let msg = "Actualización de Usuario Exitosa..!!";
          if (data.body.msg) {
            msg = data.body.msg;
          }
          return msg;
        },
      },
      error: {
        render({ data }) {
          let msg = "Error: En la actualizacion de usuario.";
          if (data.errors.msg) {
            msg = `Error: ` + data.errors.msg;
          }
          return msg;
        },
      },
    });
  };

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

  //Seleccionando por defecto los privilegios que ya tiene el usuario asociados
  useEffect(() => {
    let privilegiosArray = [];
    for (let userCompany of userCompanies) {
      for (const UserCompanyPrivilegio of userCompany.UserCompanyPrivilegios) {
        for (let ObjetoCompleto of companiasPrivilegiosData) {
          if (
            ObjetoCompleto.idCompania === userCompany.CompanyId &&
            ObjetoCompleto.idPrivilegio === UserCompanyPrivilegio.PrivilegioId
          ) {
            privilegiosArray.push(ObjetoCompleto.id.toString());
          }
        }
      }
    }
    setPrivilegiosSelected(privilegiosArray);
  }, [userCompanies]);

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
