// Nuevo
import React, { useState, useEffect } from "react";

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
  const [selectedAdministradores, setSelectedAdministradores] =
    useState("DEFAULT");

  // Consulta de Administradores
  useEffect(() => {
    const res = async () => {
      const resp = await listAdministradoresService();
      setAdministradores(resp.body);

      const res = await configuracionesService();
      setSelectedAdministradores(res.body.UserId);
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

  // Al cambiar el valor del select de Companys
  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedAdministradores(value);
  };

  // Submit Actualizar Usuario
  const hadleSubmit = (e) => {
    e.preventDefault();
    const res = async () => {
      return new Promise((resolve, reject) => {
        const respuesta = async () => {
          const res = await updateConfiguracionService(
            selectedAdministradores,
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
          if (res.body.configuracion) {
            const { configuracion } = res.body;
            setSelectedAdministradores(configuracion.UserId);
            setTipoArchivoCompras(configuracion.tipo_archivo_compras);
            setTipoArchivoVentas(configuracion.tipo_archivo_ventas);
            setCodigoPrivilegioAdmin(configuracion.codigo_privilegio_admin);
            setCodigoPrivilegioCompras(configuracion.codigo_privilegio_compras);
            setCodigoPrivilegioVentas(configuracion.codigo_privilegio_ventas);
            setHostDb(configuracion.host_db);
            setPortDb(configuracion.port_db);
            setNameDb(configuracion.name_db);
            setUsernameDb(configuracion.username_db);
            setPasswordUsernameDb(configuracion.password_username_db);
            setRutaPrincipalEndpoints(configuracion.ruta_principal_endpoints);
            resolve(res);
          } else {
            reject(res);
          }
        };
        respuesta();
      });
    };
    toast.dismiss();
    toast.promise(res, {
      pending: "Guardando configuraci??n..",
      success: {
        render({ data }) {
          let msg = "Configuraci??n Guardada..!!";
          if (data.body) {
            msg = data.body.msg;
          }
          return msg;
        },
      },
      error: {
        render({ data }) {
          let msg = "Error: Configuraci??n NO Guardada...!!";
          if (data.errors) {
            msg = data.errors.msg;
          }
          return msg;
        },
      },
    });
  };

  //Mostrar-Ocultar Contrase??a
  const [shown, setShown] = React.useState(false);
  const switchShown = () => setShown(!shown);
  // Mostrar/Ocultar contrase??a
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
              <Typography variant="subtitles">Caracter??sticas</Typography>
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
                    Administrador para Procesos Autom??tico
                  </InputLabel>
                  <Select
                    labelId="labelSelectAdministrador"
                    id="selectAdministrador"
                    defaultValue={"DEFAULT"}
                    value={selectedAdministradores}
                    onChange={handleChange}
                    label="Administrador para Procesos Autom??tico"
                  >
                    <MenuItem value="DEFAULT">
                      <em> Seleccione un Administrador ...</em>
                    </MenuItem>
                    {administradores.map((admin, index) => {
                      return index === 0 ? (
                        <MenuItem key={admin.id} value={admin.id}>
                          {admin.username} - {admin.firstname} {admin.lastname}
                        </MenuItem>
                      ) : (
                        <MenuItem key={admin.id} value={admin.id}>
                          {admin.username} - {admin.firstname} {admin.lastname}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Stack>

              <Grid item xs={4}>
                <Stack sx={{ m: 2 }}>
                  <TextField
                    size="small"
                    label="Ruta de endpoints"
                    variant="outlined"
                    fullWidth
                    value={rutaPrincipalEndpoints}
                  />
                </Stack>
              </Grid>
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
                      autoComplete="false"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={switchShown}>
                            {shown ? (
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
                C??digos de Privilegios
              </Typography>
            </Grid>
            <Divider />
            <Grid container columns={12}>
              <Grid item xs={4}>
                <Stack sx={{ m: 2 }}>
                  <TextField
                    required
                    size="small"
                    label="C??digo Privilegio de Compras"
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
                    label="C??digo Privilegio de Ventas"
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
                    label="C??digo Privilegio de Administrador"
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
                    label="C??digo Archivo de Compras"
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
                    label="C??digo Archivo de Ventas"
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
