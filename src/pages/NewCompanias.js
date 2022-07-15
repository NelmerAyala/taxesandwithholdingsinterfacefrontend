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
  Tooltip,
} from "../consts";

import FmdBadOutlinedIcon from "@mui/icons-material/FmdBadOutlined";
import { styled } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";

const TooltipSugerencia = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#80cbc4",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#80cbc4",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 13,
  },
}));

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
    const res = () => {
      return new Promise((resolve, reject) => {
        const respuesta = async () => {
          const resp = await companiaCreateService(
            nombre_company,
            codigo_company,
            origen,
            ruta_archivo_compra,
            ruta_archivo_venta
          );
          if (!resp.errors) {
            resolve(resp);
            navigate(`/companias`);
          } else {
            reject(resp);
          }
        };
        respuesta();
      });
    };
    toast.dismiss();
    toast.promise(res, {
      pending: "Registrando compañia..",
      success: {
        render({ data }) {
          let msg;
          if (data.body) {
            msg = data.body.msg;
          } else {
            msg = "Registro de compañia exitosa..!!";
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
            msg = "Error: Registro de compañia NO Exitoso.";
          }
          return msg;
        },
      },
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
                <Typography variant="subtitles">
                  Registro de Compañia
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
                  <Link to={`../companias`}>
                    <MdKeyboardBackspace color="#75787B" size={35} />
                  </Link>
                </span>
              </Tooltip>
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
              <Box sx={{ flexGrow: 1, m: 2 }} noValidate autoComplete="off">
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
                        required
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
                        required
                        fullWidth
                        label="Codigo de la Compañia"
                        variant="outlined"
                        onChange={(e) => setCodigo_company(e.target.value)}
                        value={codigo_company}
                        inputProps={{
                          maxLength: 3,
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                        }}
                        helperText="1 a 3 números max."
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Paper elevation={0}>
                      <TextField
                        required
                        fullWidth
                        label="Origen de la Compañia"
                        variant="outlined"
                        onChange={(e) =>
                          setOrigen(e.target.value.toUpperCase())
                        }
                        value={origen}
                        inputProps={{ maxLength: 10 }}
                        helperText="1 a 10 caracteres max."
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
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <TextField
                          required
                          fullWidth
                          label="Ruta de archivos de Compra"
                          variant="outlined"
                          onChange={(e) =>
                            setRuta_archivo_compra(e.target.value)
                          }
                          value={ruta_archivo_compra}
                        />
                        <TooltipSugerencia title="Sugerencia: Carpeta/Compras/Nombre de la Empresa ">
                          <FmdBadOutlinedIcon
                            sx={{
                              color: "#ffc107",
                              mr: 1,
                              my: 2,
                            }}
                          />
                        </TooltipSugerencia>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper elevation={0}>
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <TextField
                          required
                          fullWidth
                          label="Ruta de archivos de Venta"
                          variant="outlined"
                          onChange={(e) =>
                            setRuta_archivo_venta(e.target.value)
                          }
                          value={ruta_archivo_venta}
                        />
                        <TooltipSugerencia title="Sugerencia: Carpeta/Ventas/Nombre de la Empresa ">
                          <FmdBadOutlinedIcon
                            sx={{
                              color: "#ffc107",
                              mr: 1,
                              my: 2,
                            }}
                          />
                        </TooltipSugerencia>
                      </Box>
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
