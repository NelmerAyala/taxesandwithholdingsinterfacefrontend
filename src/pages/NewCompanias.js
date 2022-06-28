// Nuevo
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Estilos
import "../assets/css/App.css";

// Layout
import LayoutSession from "../layout/LayoutSession";

// Services
import companiaCreateService from "../services/companiaCreateService";

// Notificaciones
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// External components
import {
  Box,
  Container,
  Button,
  Paper,
  TextField,
  Grid,
  Divider,
  Typography,
  Stack,
  MdKeyboardBackspace,
} from "../consts";

export default function NuevoUsuario() {
  // Constantes
  const [nombre_company, setNombre_company] = useState([]);
  const [codigo_company, setCodigo_company] = useState([]);
  const [origen, setOrigen] = useState([]);
  const [ruta_archivo_compra, setRuta_archivo_compra] = useState([]);
  const [ruta_archivo_venta, setRuta_archivo_venta] = useState([]);

  // Navigate
  let navigate = useNavigate();

  // Submit Crear Usuario
  const hadleSubmit = (e) => {
    e.preventDefault();
    const res = async () => {
      const resp = await companiaCreateService(
        nombre_company,
        codigo_company,
        origen,
        ruta_archivo_compra,
        ruta_archivo_venta
      );
      // setUserCreado(resp);
      if (!resp.errors) {
        navigate(`/companias/`);
      }
      return resp;
    };
    toast.promise(res, {
      pending: "Registrando compañia..",
      success: {
        render(data) {
          let msg;
          if (data.data.errors) {
            msg = `Error: ` + data.data.errors[0].msg;
          } else if (data.data.error) {
            msg = `Error: ` + data.data.error;
          } else if (data.data.msg) {
            msg = data.data.msg;
          } else {
            msg = "Registro de compañia exitosa.";
          }
          return msg;
        },
      },
      error: "Error: Registro de compañia No Exitoso.",
    });
  };

  return (
    <LayoutSession titleModule="Compañias">
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
          <Stack direction={{ xs: "column", sm: "row" }}>
            {/* Titulo */}
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item sx={{ pt: 2, pl: 2 }}>
                <Typography variant="subtitles">Registro de Empresa</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Link to={`../companias`}>
                <MdKeyboardBackspace color="#75787B" size={35} />{" "}
              </Link>
            </Grid>
          </Stack>
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
                  Registrar Compañia
                </Button>
              </Grid>
            </Stack>
          </Box>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Stack sx={{ mx: 2 }}>
              <Box
                // sx={{ "& > :not(style)": { m: 2 } }}
                sx={{ flexGrow: 1, m: 2 }}
                noValidate
                autoComplete="off"
              >
                <Grid align="center">
                  <Typography variant="subtitles">
                    Informacion de la Compañia
                  </Typography>
                </Grid>
                <Divider />
                <Grid container spacing={{ xs: 1, md: 1 }} sx={{ pt: 1 }}>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Paper elevation={0}>
                      <TextField
                        fullWidth
                        label="Nombre de la Compañia"
                        variant="outlined"
                        onChange={(e) => setNombre_company(e.target.value)}
                        value={nombre_company}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Paper elevation={0}>
                      <TextField
                        fullWidth
                        label="Codigo de la Compañia"
                        variant="outlined"
                        onChange={(e) => setCodigo_company(e.target.value)}
                        value={codigo_company}
                        inputProps={{ maxLength: 3 }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Paper elevation={0}>
                      <TextField
                        fullWidth
                        label="Origen de la Compañia"
                        variant="outlined"
                        onChange={(e) => setOrigen(e.target.value)}
                        value={origen}
                        inputProps={{
                          style: { textTransform: "uppercase" },
                          maxLength: 10,
                        }}
                      />
                    </Paper>
                  </Grid>
                </Grid>

                <Grid align="center" item sx={{ mt: 4 }}>
                  <Typography variant="subtitles">Rutas de Archivos</Typography>
                </Grid>
                <Divider />
                <Grid container spacing={{ xs: 1, md: 1 }} sx={{ pt: 1 }}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper elevation={0}>
                      <TextField
                        fullWidth
                        label="Ruta de archivos de Compra"
                        variant="outlined"
                        onChange={(e) => setRuta_archivo_compra(e.target.value)}
                        value={ruta_archivo_compra}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper elevation={0}>
                      <TextField
                        fullWidth
                        label="Ruta de archivos de Venta"
                        variant="outlined"
                        onChange={(e) => setRuta_archivo_venta(e.target.value)}
                        value={ruta_archivo_venta}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Grid>
        </Paper>
      </form>
    </LayoutSession>
  );
}
