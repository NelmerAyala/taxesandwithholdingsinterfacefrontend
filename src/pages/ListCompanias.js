// Nuevo
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// Services
import listCompaniasService from "../services/listCompaniasService";

// Layout
import LayoutSession from "../layout/LayoutSession";
import LinearProgress from "@mui/material/LinearProgress";

// External components
import {
  Paper,
  Box,
  Grid,
  Divider,
  Typography,
  // Stack,
  // Button,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  // MdOutlineAdd,
  MdOutlineModeEditOutline,
  MdSync,
} from "../consts";

export default function Configuraciones() {
  // Constantes
  // const navigate = useNavigate();
  const [list, setList] = useState([]);

  // Consulta de Compañía
  useEffect(() => {
    const res = async () => {
      const resp = await listCompaniasService();
      setList(resp.body.companias);
    };
    res();
  }, []);

  // Variables
  let listcompany = [];

  // Comprobando si hubo error list.msg
  if (!list.msg) {
    listcompany = list.map((companias) => {
      return (
        <TableRow key={companias.id}>
          <TableCell component="th" scope="row" align="center">
            <Typography sx={{ textTransform: "uppercase" }}>
              <b>{companias.nombre_company}</b>
            </Typography>
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            {companias.origen}
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            {companias.codigo_company}
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            {companias.ruta_archivo_compra}
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            {companias.ruta_archivo_venta}
          </TableCell>
          <TableCell
            component="th"
            className="text-center"
            colSpan={1}
            align="center"
          >
            <Tooltip title="Editar Compañia">
              <span>
                <Link to={`./${companias.id}`}>
                  <MdOutlineModeEditOutline color="#75787B" size={25} />
                </Link>
              </span>
            </Tooltip>
          </TableCell>
        </TableRow>
      );
    });
  }

  return (
    <LayoutSession titleModule="Compañias">
      {/* Formulario */}
      <form>
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
              Administracion de Compañias
            </Typography>
          </Grid>
          <Divider variant="middle " />

          <Box sx={{ p: 2 }} />
          {/*  Boton */}
          {/* <Box sx={{ p: 2 }}>
            <Stack direction={{ xs: "column", sm: "row" }}>
              <Grid
                container
                direction="row"
                justifyContent="flex-END"
                alignItems="flex-start"
              >
                <Button
                  sx={{
                    px: 5,
                    borderRadius: "1rem",
                    color: "white.main",
                    textTransform: "none",
                  }}
                  onClick={() => navigate("/companias/nueva")}
                  variant="contained"
                  startIcon={<MdOutlineAdd />}
                >
                  Nuevo Compañia
                </Button>
              </Grid>
            </Stack>
          </Box> */}
          {/* Tabla */}
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    component="th"
                    className="text-center"
                    align="center"
                  >
                    <b>Compañia</b>
                  </TableCell>
                  <TableCell
                    component="th"
                    className="text-center"
                    align="center"
                  >
                    <b>Origen</b>
                  </TableCell>
                  <TableCell
                    component="th"
                    className="text-center"
                    align="center"
                  >
                    <b>Codigo</b>
                  </TableCell>
                  <TableCell
                    component="th"
                    className="text-center"
                    align="center"
                  >
                    <b>Ruta de Archivos Compra</b>
                  </TableCell>
                  <TableCell
                    component="th"
                    className="text-center"
                    align="center"
                  >
                    <b>Ruta de Archivos Venta</b>
                  </TableCell>
                  <TableCell
                    component="th"
                    className="text-center"
                    align="center"
                  >
                    <b>Editar</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listcompany.length === 0 ? (
                  <TableRow>
                    <TableCell
                      sx={{ p: 2 }}
                      component="th"
                      className="text-center"
                      colSpan={6}
                      align="center"
                    >
                      <MdSync size={35} />
                      <br />
                      <LinearProgress />
                      <Typography>Cargando Compañias ... </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  listcompany
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </form>
    </LayoutSession>
  );
}
