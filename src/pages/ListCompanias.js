// Nuevo
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Services
import listCompaniasService from "../services/listCompaniasService";

// Layout
import LayoutSession from "../layout/LayoutSession";
import LinearProgress from "@mui/material/LinearProgress";

// sort table
import TableOrder from "../components/TableOrder";
import TableSort from "../components/TableSort";

// External components
import {
  Paper,
  Box,
  Grid,
  Divider,
  Typography,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MdOutlineAdd,
  Stack,
  Button,
  MdOutlineModeEditOutline,
  TablePagination,
} from "../consts";

export default function Configuraciones() {
  // Constantes
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  //Paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Consulta de Compañía
  useEffect(() => {
    const res = async () => {
      const resp = await listCompaniasService();
      setList(resp.body.companias);
    };
    TableOrder();
    TableSort();
    res();
  }, []);

  // Variables
  let listcompany = [];

  // Handle cambiar pagina
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle cambiar fila por pagina
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Comprobando si hubo error list.msg
  if (!list.msg) {
    listcompany = list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((companias) => {
      return (
        <TableRow key={companias.id}>
          <TableCell component="th" scope="row" align="center">
            <Typography>
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
          <Box sx={{ p: 1 }} />

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
                  Registrar Compañia
                </Button>
              </Grid>
            </Stack>
          </Box>
          {/* Tabla */}
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box gridColumn="span 12">
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table
                  sx={{ minWidth: 700 }}
                  stickyHeader
                  aria-label="sticky table"
                  size="small"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell component="th" align="center" className="sort">
                        <Tooltip followCursor title="Ordenar">
                          <span>
                            <b>Compañia</b>
                          </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell component="th" className="sort" align="center">
                        <Tooltip followCursor title="Ordenar">
                          <span>
                            <b>Nomenclatura del TXT</b>
                          </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell component="th" className="sort" align="center">
                        <Tooltip followCursor title="Ordenar">
                          <span>
                            <b>Codigo</b>
                          </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell component="th" align="center">
                        <b>Ruta de Archivos Compra</b>
                      </TableCell>
                      <TableCell component="th" align="center">
                        <b>Ruta de Archivos Venta</b>
                      </TableCell>
                      <TableCell component="th" align="center">
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
                          colSpan={6}
                          align="center"
                        >
                          <Box sx={{ m: 3, pt: 2 }}>
                            <Typography>Cargando Compañias ... </Typography>
                            <Box sx={{ p: 2 }} />
                            <LinearProgress />
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                        listcompany
                      )}
                  </TableBody>
                </Table>
              </TableContainer>
              {list.length > 0 ? (
                <TablePagination
                  rowsPerPageOptions={[
                    10,
                    50,
                    100,
                    500,
                    { value: -1, label: "All" },
                  ]}
                  component="div"
                  count={list.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              ) : (
                  <></>
                )}
            </Box>
          </Box>
        </Paper>
      </form>
    </LayoutSession>
  );
}
