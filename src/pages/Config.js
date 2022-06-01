// Nuevo
import React, { useState, useEffect } from "react";

// Services

// Layout
import LayoutSession from "../layout/LayoutSession";
import configuracionesService from "../services/configuracionesService";
import updateConfiguracionService from "../services/updateConfiguracionService";
import listAdministradoresService from "../services/listAdministradoresService";

// Notificaciones
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// External components
import {
  Paper,
  Box,
  Container,
  Grid,
  Divider,
  Typography,
  Stack,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "../consts";

export default function Configuraciones() {
  // Constantes
  // const [user, setUser] = useState([]);
  const [sistemaOrigen, setSistemaOrigen] = useState([]);
  const [tipoArchivoCompras, setTipoArchivoCompras] = useState([]);
  const [tipoArchivoVentas, setTipoArchivoVentas] = useState([]);
  const [codigoPrivilegioAdmin, setCodigoPrivilegioAdmin] = useState([]);
  const [codigoPrivilegioCompras, setCodigoPrivilegioCompras] = useState([]);
  const [codigoPrivilegioVentas, setCodigoPrivilegioVentas] = useState([]);
  const [hostDb, setHostDb] = useState([]);
  const [portDb, setPortDb] = useState([]);
  const [nameDb, setNameDb] = useState([]);
  const [usernameDb, setUsernameDb] = useState([]);
  const [passwordUsernameDb, setPasswordUsernameDb] = useState([]);
  const [rutaPrincipalEndpoints, setRutaPrincipalEndpoints] = useState([]);

  const [administradores, setAdministradores] = useState([]);
  const [selectedAdministradores, setSelectedAdministradores] = useState([]);

  // Consulta de Administradores
  useEffect(() => {
    const res = async () => {
      const resp = await listAdministradoresService();
      setAdministradores(resp);
    };
    res();
  }, []);

  // Al cambiar el valor del select de Companys
  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedAdministradores(value);
  };

  // Submit Salvar Configuraciones
  useEffect(() => {
    const res = async () => {
      const res = await configuracionesService();
      setSelectedAdministradores(res.UserId);
      setSistemaOrigen(res.sistema_origen);
      setTipoArchivoCompras(res.tipo_archivo_compras);
      setTipoArchivoVentas(res.tipo_archivo_ventas);
      setCodigoPrivilegioAdmin(res.codigo_privilegio_admin);
      setCodigoPrivilegioCompras(res.codigo_privilegio_compras);
      setCodigoPrivilegioVentas(res.codigo_privilegio_ventas);
      setHostDb(res.host_db);
      setPortDb(res.port_db);
      setNameDb(res.name_db);
      setUsernameDb(res.username_db);
      setPasswordUsernameDb(res.password_username_db);
      setRutaPrincipalEndpoints(res.ruta_principal_endpoints);
    };
    res();
  }, []);

  // Submit Actualizar Usuario
  const hadleSubmit = (e) => {
    e.preventDefault();
    const res = async () => {
      const res = await updateConfiguracionService(
        selectedAdministradores,
        sistemaOrigen,
        tipoArchivoCompras,
        tipoArchivoVentas,
        codigoPrivilegioAdmin,
        codigoPrivilegioCompras,
        codigoPrivilegioVentas,
        hostDb,
        portDb,
        nameDb,
        usernameDb,
        passwordUsernameDb,
        rutaPrincipalEndpoints
      );
      if (
        res.UserId &&
        res.sistema_origen &&
        res.tipo_archivo_compras &&
        res.tipo_archivo_ventas &&
        res.codigo_privilegio_admin &&
        res.codigo_privilegio_compras &&
        res.codigo_privilegio_ventas &&
        res.host_db &&
        res.port_db &&
        res.name_db &&
        res.username_db &&
        res.password_usernamedb &&
        res.ruta_principal_endpoints
      ) {
        setSelectedAdministradores(res.UserId);
        setSistemaOrigen(res.sistema_origen);
        setTipoArchivoCompras(res.tipo_archivo_compras);
        setTipoArchivoVentas(res.tipo_archivo_ventas);
        setCodigoPrivilegioAdmin(res.codigo_privilegio_admin);
        setCodigoPrivilegioCompras(res.codigo_privilegio_compras);
        setCodigoPrivilegioVentas(res.codigo_privilegio_ventas);
        setHostDb(res.host_db);
        setPortDb(res.port_db);
        setNameDb(res.name_db);
        setUsernameDb(res.username_db);
        setPasswordUsernameDb(res.password_username_db);
        setRutaPrincipalEndpoints(res.ruta_principal_endpoints);
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
            msg = "Configuración exitosa.";
          }
          return msg;
        },
      },
      error: "Error: Configuración No exitosa.",
    });
  };

  return (
    <LayoutSession titleModule="Configuraciones">
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
          {/* Titulo */}
          <Grid item sx={{ pt: 2, pl: 2 }}>
            <Typography variant="subtitles">
              Administracion Generales
            </Typography>
          </Grid>
          <Divider variant="middle " />

          {/*  Boton */}
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

          {/* Primera Fila , Caracteristicas*/}
          <Paper
            elevation={1}
            sx={{
              overflow: "hidden",
              borderRadius: "10px",
              pb: 1,
              mx: 5,
            }}
          >
            <Grid align="center" item sx={{ mt: 1 }}>
              <Typography variant="subtitles">Características</Typography>
            </Grid>
            <Divider />
            <Grid container columns={12}>
              <Grid item xs={6}>
                <Stack sx={{ m: 2 }}>
                  <TextField
                    size="small"
                    label="Nomenclatura para Nombre de Archivos"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setSistemaOrigen(e.target.value)}
                    value={sistemaOrigen}
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack sx={{ m: 2 }}>
                  {/* <TextField
                  label="Administrador para Procesos Automático"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                /> */}

                  <FormControl size="small">
                    <InputLabel id="labelSelectCompany">
                      Administrador para Procesos Automático
                    </InputLabel>
                    <Select
                      labelId="labelSelectAdministrador"
                      id="selectAdministrador"
                      value={selectedAdministradores}
                      onChange={handleChange}
                      label="Administrador para Procesos Automático"
                    >
                      <MenuItem value="DEFAULT">
                        <em> Seleccione un Administrador ...</em>
                      </MenuItem>
                      {administradores.map((admin, index) => {
                        return index === 0 ? (
                          <MenuItem key={admin.id} value={admin.id}>
                            {admin.username} - {admin.firstname}
                            {admin.lastname}
                          </MenuItem>
                        ) : (
                          <MenuItem key={admin.id} value={admin.id}>
                            {admin.username} - {admin.firstname}
                            {admin.lastname}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
            </Grid>
          </Paper>

          {/* Segunda y Tercera Fila, Base de datos */}
          <Paper
            elevation={3}
            sx={{
              overflow: "hidden",
              borderRadius: "10px",
              pb: 1,
              m: 5,
            }}
          >
            <Grid align="center" item sx={{ mt: 1 }}>
              <Typography variant="subtitles">Base de Datos</Typography>
            </Grid>
            <Divider />
            <Grid container columns={12}>
              <Grid item xs={4}>
                <Stack sx={{ m: 2 }}>
                  <TextField
                    size="small"
                    label="Nombre de Base de Datos"
                    variant="outlined"
                    fullWidth
                    // onChange={(e) => setNameDb(e.target.value)}
                    value={nameDb}
                  />
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack sx={{ m: 2 }}>
                  <TextField
                    size="small"
                    label="Usuario de Base de Datos"
                    variant="outlined"
                    fullWidth
                    // onChange={(e) => setUsernameDb(e.target.value)}
                    value={usernameDb}
                  />
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack sx={{ m: 2 }}>
                  <TextField
                    size="small"
                    label="Clave usuario de Base de Datos"
                    variant="outlined"
                    fullWidth
                    // onChange={(e) => setPasswordUsernameDb(e.target.value)}
                    value={passwordUsernameDb}
                    type="password"
                  />
                </Stack>
              </Grid>
            </Grid>
            <Grid container columns={12}>
              <Grid item xs={4}>
                <Stack sx={{ m: 2 }}>
                  <TextField
                    size="small"
                    label="Host de Base de Datos"
                    variant="outlined"
                    fullWidth
                    // onChange={(e) => setHostDb(e.target.value)}
                    value={hostDb}
                  />
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack sx={{ m: 2 }}>
                  <TextField
                    size="small"
                    label="Puerto de Base de Datos"
                    variant="outlined"
                    fullWidth
                    // onChange={(e) => setPortDb(e.target.value)}
                    value={portDb}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Paper>

          {/* Cuarta Fila, Codigo de Privilegios */}
          <Paper
            elevation={3}
            sx={{
              overflow: "hidden",
              borderRadius: "10px",
              pb: 1,
              m: 5,
            }}
          >
            <Grid align="center" item sx={{ mt: 1 }}>
              <Typography variant="subtitles">
                Códigos de Privilegios
              </Typography>
            </Grid>
            <Divider />
            <Grid container columns={12}>
              <Grid item xs={4}>
                <Stack sx={{ m: 2 }}>
                  <TextField
                    size="small"
                    label="Código Privilegio de Compras"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setCodigoPrivilegioCompras(e.target.value)}
                    value={codigoPrivilegioCompras}
                  />
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack sx={{ m: 2 }}>
                  <TextField
                    size="small"
                    label="Código Privilegio de Ventas"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setCodigoPrivilegioVentas(e.target.value)}
                    value={codigoPrivilegioVentas}
                  />
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack sx={{ m: 2 }}>
                  <TextField
                    size="small"
                    label="Código Privilegio de Administrador"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setCodigoPrivilegioAdmin(e.target.value)}
                    value={codigoPrivilegioAdmin}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Paper>

          {/* Quinta Fila, Tipos de Archivos */}
          <Paper
            elevation={3}
            sx={{
              overflow: "hidden",
              borderRadius: "10px",
              pb: 1,
              m: 5,
            }}
          >
            <Grid align="center" item sx={{ mt: 1 }}>
              <Typography variant="subtitles">
                Codigos de Tipos de Archivos
              </Typography>
            </Grid>
            <Divider />
            <Grid container columns={12}>
              <Grid item xs={6}>
                <Stack sx={{ m: 2 }}>
                  <TextField
                    size="small"
                    label="Código Archivo de Compras"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setTipoArchivoCompras(e.target.value)}
                    value={tipoArchivoCompras}
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack sx={{ m: 2 }}>
                  <TextField
                    size="small"
                    label="Código Archivo de Ventas"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setTipoArchivoVentas(e.target.value)}
                    value={tipoArchivoVentas}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Paper>
      </form>
    </LayoutSession>
  );
}
