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
} from "../consts";

export default function DetailsUser() {
  // Constants
  const { id } = useParams();
  const [email, setEmail] = useState([]);
  const [firstname, setFirstname] = useState([]);
  const [lastname, setLastname] = useState([]);
  const [username, setUsername] = useState([]);
  const [usercompany, setUsercompany] = useState([]);

  const [companies, setCompanys] = useState([]);
  const companias = [];

  const [privilegios, setPrivilegios] = useState([]);
  const privilegies = [];

  const { userUpdateAdmin } = useUser();

  // Consulta detalles del usuario
  useEffect(() => {
    const res = async () => {
      const res = await userDetailsService(id);
      setEmail(res.email);
      setFirstname(res.firstname);
      setLastname(res.lastname);
      setUsername(res.username);
      setUsercompany(res.UserCompanies);
      console.log(res);
    };
    res();
  }, [id]);

  //Consulta Compañias
  useEffect(() => {
    const res = async () => {
      const resp = await listCompaniasService();
      setCompanys(resp);
    };
    res();
  }, []);

  //Consulta Privilegios
  useEffect(() => {
    const res = async () => {
      const resp = await listPrivilegiosService();
      setPrivilegios(resp);
    };
    res();
  }, []);

  // Submit editar usuario
  const hadleSubmit = (e) => {
    e.preventDefault();
    const res = async () => {
      const res = await userUpdateAdmin(id, email, firstname, lastname);
      if (res.email && res.firstname && res.lastname) {
        setEmail(res.email);
        setFirstname(res.firstname);
        setLastname(res.lastname);
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

  companies.map((company) => {
    companias[company.id] = company.nombre_company;
    return "";
  });

  privilegios.map((privilegio) => {
    privilegies[privilegio.id] = privilegio.nombre_privilegio;
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

      <Paper
        elevation={3}
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "10px",
          pb: 5,
        }}
      >
        <Grid item xs={12} sm={12} md={10} lg={10} sx={{ mt: 2 }}>
          <Stack sx={{ mx: 2 }}>
            {/* Titulo */}
            <Grid container spacing={6}>
              <Grid item xs={12} sm={10}>
                <Typography variant="h6">
                  Perfil de <b>{username}</b>
                </Typography>
              </Grid>

              <Grid item xs={12} sm={2}>
                <Link to={`../usuarios`}>
                  <MdKeyboardBackspace color="#75787B" size={35} />{" "}
                </Link>
              </Grid>
            </Grid>
            <Divider />

            {/* Formulario, datos personales */}
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
                        required
                        id="outlined-required"
                        label="Nombre"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={12} md={2} lg={3}>
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

                  <Grid item xs={12} sm={12} md={5} lg={4}>
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
            <Divider />

            {/* Formulario, compañia y privilegio */}
            <form>
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
                  {usercompany.map((usercomp) => {
                    return (
                      <Box key={usercomp.id}>
                        <TextField
                          sx={{ m: 1 }}
                          label="Empresa"
                          value={usercomp.Company.nombre_company}
                        />
                        {/* {usercomp.UserCompanyPrivilegios.map((usercp) => {
                      return (
                        <Box key={usercp.id}>
                          <Box>
                            <Typography> Compras </Typography>
                            {usercp.Privilegio.codigo_privilegio === "COM" ? (
                              <Checkbox
                                id={usercp.Privilegio.id}
                                checked={checked}
                                onChange={handleChange}
                              />
                            ) : (
                              <Checkbox
                                id={usercp.Privilegio.id}
                                checked={false}
                                onChange={handleChange}
                              />
                            )}
                          </Box>
                          <Box>
                            <Typography> Ventas </Typography>
                            {usercp.Privilegio.codigo_privilegio === "VEN" ? (
                              <Checkbox
                                id={usercp.Privilegio.id}
                                checked={checked}
                                onChange={handleChange}
                              />
                            ) : (
                              <Checkbox
                                id={usercp.Privilegio.id}
                                checked={false}
                                onChange={handleChange}
                              />
                            )}
                          </Box>
                          <Box>
                            <Typography> anular </Typography>
                            {usercp.Privilegio.codigo_privilegio === "ANU" ? (
                              <Checkbox
                                id={usercp.Privilegio.id}
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            ) : (
                              <Checkbox
                                id={usercp.Privilegio.id}
                                checked={false}
                                onChange={handleChange}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            )}
                          </Box>
                          <Box>
                            <Typography> ADM </Typography>
                            {usercp.Privilegio.codigo_privilegio === "ADM" ? (
                              <Checkbox
                                id={usercp.Privilegio.id}
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            ) : (
                              <Checkbox
                                id={usercp.Privilegio.id}
                                checked={false}
                                onChange={handleChange}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            )}
                          </Box>
                        </Box>
                      );
                    })} */}
                      </Box>
                    );
                  })}
                </Grid>
              </Box>
            </form>
          </Stack>
        </Grid>
      </Paper>
    </LayoutSession>
  );
}
