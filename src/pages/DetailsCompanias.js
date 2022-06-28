// Nuevo
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// Estilos
import "../assets/css/App.css";

// Layout
import LayoutSession from "../layout/LayoutSession";

// Service
import companiaDetailsService from "../services/companiaDetailsService";
import companiaUpdateService from "../services/companiaUpdateService";

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
  const [nombre_company, setNombre_company] = useState([]);
  const [codigo_company, setCodigo_company] = useState([]);
  const [origen, setOrigen] = useState([]);
  const [ruta_archivo_compra, setRuta_archivo_compra] = useState([]);
  const [ruta_archivo_venta, setRuta_archivo_venta] = useState([]);

  // Consulta detalles del usuario
  useEffect(() => {
    const res = async () => {
      const res = await companiaDetailsService(id);
      setNombre_company(res.body.nombre_company);
      setCodigo_company(res.body.codigo_company);
      setOrigen(res.body.origen);
      // res.origen_company
      //   ? setOrigen_company(res.origen_company)
      //   : setOrigen_company([]);
      setRuta_archivo_compra(res.body.ruta_archivo_compra);
      setRuta_archivo_venta(res.body.ruta_archivo_venta);
      // console.log(res)
    };
    res();
  }, [id]);

  // Submit Actualizar Usuario
  const hadleSubmit = (e) => {
    e.preventDefault();
    const res = async () => {
      const res = await companiaUpdateService({
        id,
        codigo_company,
        origen,
        ruta_archivo_compra,
        ruta_archivo_venta,
      });
      if (
        res.codigo_company &&
        res.origen &&
        res.ruta_archivo_venta &&
        res.ruta_archivo_venta
      ) {
        setCodigo_company(res.codigo_company);
        setOrigen(res.origen);
        setRuta_archivo_compra(res.ruta_archivo_venta);
        setRuta_archivo_venta(res.ruta_archivo_venta);
      }
      return res;
    };
    toast.promise(res, {
      pending: "Guardando Empresa.",
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
    <LayoutSession titleModule="Detalle de compañia ">
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
          <Stack direction={{ xs: "column", sm: "row" }}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item sx={{ pt: 2, pl: 2 }}>
                <Typography variant="subtitles">
                  <b>{nombre_company}</b>
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Link to={`../companias`}>
                <MdKeyboardBackspace color="#75787B" size={35} />
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
                  Guardar cambios
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
                {/*  */}
                <Grid align="center" item sx={{ mt: 1 }}>
                  <Typography variant="subtitles">
                    Informacion General
                  </Typography>
                </Grid>
                <Divider />

                <Grid container spacing={{ xs: 1, md: 1 }} sx={{ pt: 1 }}>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Paper elevation={0}>
                      <TextField
                        fullWidth
                        required
                        // onChange={(e) => setNombre_company(e.target.value)}
                        id="outlined-required"
                        label="Nombre Compañia"
                        value={nombre_company}
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Paper elevation={0}>
                      <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Codigo de la Compañia"
                        onChange={(e) => setCodigo_company(e.target.value)}
                        value={codigo_company}
                        inputProps={{ maxLength: 3 }}
                        helperText="Maximo 3 caracteres"
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Paper elevation={0}>
                      <TextField
                        fullWidth
                        id="outlined-required"
                        label="Nombreclatura del TXT"
                        value={origen}
                        onChange={(e) => setOrigen(e.target.value)}
                        inputProps={{
                          style: { textTransform: "uppercase" },
                          maxLength: 10,
                        }}
                      />
                    </Paper>
                  </Grid>
                </Grid>

                <Grid align="center" item sx={{ mt: 4 }}>
                  <Typography variant="subtitles">Rutas de TXT</Typography>
                </Grid>
                <Grid container spacing={{ xs: 1, md: 1 }} sx={{ pt: 1 }}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper elevation={0}>
                      <TextField
                        fullWidth
                        required
                        onChange={(e) => setRuta_archivo_compra(e.target.value)}
                        id="outlined-required"
                        label="Ruta de Compra"
                        value={ruta_archivo_compra}
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper elevation={0}>
                      <TextField
                        fullWidth
                        required
                        onChange={(e) => setRuta_archivo_venta(e.target.value)}
                        id="outlined-required"
                        label="Ruta de Venta"
                        value={ruta_archivo_venta}
                      />
                    </Paper>
                  </Grid>
                </Grid>
                <Divider />
              </Box>
            </Stack>
          </Grid>
        </Paper>
      </form>
    </LayoutSession>
  );
}