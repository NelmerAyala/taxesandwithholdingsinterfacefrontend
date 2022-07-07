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
  OutlinedInput,
  Visibility,
  VisibilityOff,
  Tooltip,
  IconButton,
  InputAdornment,
} from "../consts";

export default function Configuraciones() {
  // Constantes
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
  const [selectedAdministradores, setSelectedAdministradores] = useState([
    "DEFAULT",
  ]);

  // Consulta de Administradores
  useEffect(() => {
    const res = async () => {
      const resp = await listAdministradoresService();
      setAdministradores(resp.body);
    };
    res();
  }, []);

  // Al cambiar el valor del select de Companys
  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedAdministradores(value);
  };

  // Consultar Configuraciones
  useEffect(() => {
    const res = async () => {
      const res = await configuracionesService();
      setSelectedAdministradores(res.body.UserId);
      setSistemaOrigen(res.body.sistema_origen);
      setTipoArchivoCompras(res.body.tipo_archivo_compras);
      setTipoArchivoVentas(res.body.tipo_archivo_ventas);
      setCodigoPrivilegioAdmin(res.body.codigo_privilegio_admin);
      setCodigoPrivilegioCompras(res.body.codigo_privilegio_compras);
      setCodigoPrivilegioVentas(res.body.codigo_privilegio_ventas);
      setHostDb(res.body.host_db);
      setPortDb(res.body.port_db);
      setNameDb(res.body.name_db);
      setUsernameDb(res.body.username_db);
      setPasswordUsernameDb(res.body.password_username_db);
      setRutaPrincipalEndpoints(res.body.ruta_principal_endpoints);
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
        res.body.UserId &&
        res.body.sistema_origen &&
        res.body.tipo_archivo_compras &&
        res.body.tipo_archivo_ventas &&
        res.body.codigo_privilegio_admin &&
        res.body.codigo_privilegio_compras &&
        res.body.codigo_privilegio_ventas &&
        res.body.host_db &&
        res.body.port_db &&
        res.body.name_db &&
        res.body.username_db &&
        res.body.password_usernamedb &&
        res.body.ruta_principal_endpoints
      ) {
        setSelectedAdministradores(res.body.UserId);
        setSistemaOrigen(res.body.sistema_origen);
        setTipoArchivoCompras(res.body.tipo_archivo_compras);
        setTipoArchivoVentas(res.body.tipo_archivo_ventas);
        setCodigoPrivilegioAdmin(res.body.codigo_privilegio_admin);
        setCodigoPrivilegioCompras(res.body.codigo_privilegio_compras);
        setCodigoPrivilegioVentas(res.body.codigo_privilegio_ventas);
        setHostDb(res.body.host_db);
        setPortDb(res.body.port_db);
        setNameDb(res.body.name_db);
        setUsernameDb(res.body.username_db);
        setPasswordUsernameDb(res.body.password_username_db);
        setRutaPrincipalEndpoints(res.body.ruta_principal_endpoints);
      }
      return res;
    };
    toast.dismiss();
    toast.promise(res, {
      pending: "Guardando configuración..",
      success: {
        render({ data }) {
          let msg;
          if (data.errors) {
            msg = `Error: ` + data.errors.msg;
          } else {
            msg = "Configuración Guardada..!!";
          }
          return msg;
        },
      },
      error: "Error: Configuración NO Guardada..",
    });
  };

  //Mostrar-Ocultar Contraseña
  const [shown, setShown] = React.useState(false);
  const switchShown = () => setShown(!shown);
  // Mostrar/Ocultar contraseña
  const onChange = ({ currentTarget }) =>
    setPasswordUsernameDb(currentTarget.value);

  return (
    <LayoutSession titleModule="Configuraciones">
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
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              columns={12}
            >
              <Stack sx={{ m: 2 }}>
                <FormControl size="small">
                  <InputLabel id="labelSelectCompany">
                    Administrador para Procesos Automático
                  </InputLabel>
                  <Select
                    labelId="labelSelectAdministrador"
                    id="selectAdministrador"
                    defaultValue={"DEFAULT"}
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
          </Paper>

          {/* Segunda & Tercera Fila, Base de datos */}
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
                  <FormControl required fullWidth size="small">
                    <InputLabel>Clave usuario de Base de Datos</InputLabel>
                    <OutlinedInput
                      readOnly
                      label="Clave usuario de Base de Datos"
                      onChange={onChange}
                      type={shown ? "text" : "password"}
                      value={passwordUsernameDb}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={switchShown}>
                            {shown ? (
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
                    required
                    size="small"
                    label="Código Privilegio de Compras"
                    variant="outlined"
                    fullWidth
                    // onChange={(e) => setCodigoPrivilegioCompras(e.target.value)}
                    // inputProps={{ maxLength: 3 }}
                    value={codigoPrivilegioCompras}
                  />
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack sx={{ m: 2 }}>
                  <TextField
                    required
                    size="small"
                    label="Código Privilegio de Ventas"
                    variant="outlined"
                    fullWidth
                    // onChange={(e) => setCodigoPrivilegioVentas(e.target.value)}
                    // inputProps={{ maxLength: 3 }}
                    value={codigoPrivilegioVentas}
                  />
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack sx={{ m: 2 }}>
                  <TextField
                    required
                    size="small"
                    label="Código Privilegio de Administrador"
                    variant="outlined"
                    fullWidth
                    // onChange={(e) => setCodigoPrivilegioAdmin(e.target.value)}
                    // inputProps={{ maxLength: 3 }}
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
                    required
                    size="small"
                    label="Código Archivo de Compras"
                    variant="outlined"
                    fullWidth
                    // onChange={(e) => setTipoArchivoCompras(e.target.value)}
                    // inputProps={{ maxLength: 3 }}
                    value={tipoArchivoCompras}
                  />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack sx={{ m: 2 }}>
                  <TextField
                    required
                    size="small"
                    label="Código Archivo de Ventas"
                    variant="outlined"
                    fullWidth
                    // onChange={(e) => setTipoArchivoVentas(e.target.value)}
                    // inputProps={{ maxLength: 3 }}
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
