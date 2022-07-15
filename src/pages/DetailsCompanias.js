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

export default function DetailsUser() {
  // Constants
  const { id } = useParams();
  const [nombre_company, setNombre_company] = useState([]);
  const [codigo_company, setCodigo_company] = useState([]);
  const [origen, setOrigen] = useState([]);
  const [ruta_archivo_compra, setRuta_archivo_compra] = useState([]);
  const [ruta_archivo_venta, setRuta_archivo_venta] = useState([]);

  // Consulta detalles compañia
  useEffect(() => {
    const res = async () => {
      const res = await companiaDetailsService(id);
      setNombre_company(res.body.nombre_company);
      setCodigo_company(res.body.codigo_company);
      setOrigen(res.body.origen);
      setRuta_archivo_compra(res.body.ruta_archivo_compra);
      setRuta_archivo_venta(res.body.ruta_archivo_venta);
    };
    res();
  }, [id]);

  // Submit Actualizar Compañia
  const hadleSubmit = (e) => {
    e.preventDefault();
    const res = () => {
      return new Promise((resolve, reject) => {
        const respuesta = async () => {
          const resp = await companiaUpdateService({
            id,
            codigo_company,
            origen,
            ruta_archivo_compra,
            ruta_archivo_venta,
          });
          if (resp.body) {
            if (
              resp.codigo_company &&
              resp.origen &&
              resp.ruta_archivo_venta &&
              resp.ruta_archivo_venta
            ) {
              setCodigo_company(resp.codigo_company);
              setOrigen(resp.origen);
              setRuta_archivo_compra(resp.ruta_archivo_venta);
              setRuta_archivo_venta(resp.ruta_archivo_venta);
            }
            resolve(resp);
          } else {
            setCodigo_company(codigo_company);
            setOrigen(origen);
            setRuta_archivo_compra(ruta_archivo_venta);
            setRuta_archivo_venta(ruta_archivo_venta);
            reject(resp);
          }
          // return res;
        };
        respuesta();
      });
    };
    toast.dismiss();
    toast.promise(res, {
      pending: "Guardando actualizacion de Compañia..",
      success: {
        render({ data }) {
          let msg;
          if (data.body.msg) {
            msg = data.body.msg;
          } else {
            msg = "Actualizacion de compañia Exitosa..!!";
          }
          return msg;
        },
      },
      error: {
        render({ data }) {
          let msg;
          if (data.errors.msg) {
            msg = `Error: ` + data.errors.msg;
          } else {
            msg = "Error: En la actualizacion de la compañia.";
          }
          return msg;
        },
      },
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
                <Typography
                  sx={{ textTransform: "uppercase" }}
                  variant="subtitles"
                >
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
                      <Tooltip followCursor title="Solo Lectura">
                        <span>
                          <TextField
                            fullWidth
                            // required
                            // onChange={(e) => setNombre_company(e.target.value)}
                            id="outlined-required"
                            label="Nombre Compañia"
                            value={nombre_company}
                            inputProps={{
                              style: { textTransform: "uppercase" },
                            }}
                          />
                        </span>
                      </Tooltip>
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
                        id="outlined-required"
                        label="Nombreclatura del TXT"
                        value={origen}
                        onChange={(e) =>
                          setOrigen(e.target.value.toUpperCase())
                        }
                        inputProps={{ maxLength: 10 }}
                        helperText="1 a 10 caracteres max."
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
                      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <TextField
                          fullWidth
                          required
                          onChange={(e) =>
                            setRuta_archivo_compra(e.target.value)
                          }
                          id="outlined-required"
                          label="Ruta de Compra"
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
                          fullWidth
                          required
                          onChange={(e) =>
                            setRuta_archivo_venta(e.target.value)
                          }
                          id="outlined-required"
                          label="Ruta de Venta"
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
