// Nuevo
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Estilos
import "../assets/css/App.css";

// Layout
import LayoutSession from "../layout/LayoutSession";

// Services
import listArchivosService from "../services/listArchivosService";
import listCompaniasService from "../services/listCompaniasService";

// External components
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Divider,
  Typography,
  MdOutlineTextSnippet,
  MdListAlt,
  MdContentCopy,
  TablePagination,
  TextField,
  Button,
  Container,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "../consts";

// Notificaciones
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// formato Fecha
import moment from "moment";

export default function ListArchivos() {
  // Constantes
  const [list, setList] = useState([]);
  const [company, setCompany] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("DEFAULT");

  //Paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const OpenDirectory = (e) => {
    let copyText = document.getElementById("path_archivo");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Alert the copied text */
    // alert("Copied the text: " + copyText.value);
    // alert("Copied the text: " + copyText.value);
  };

  // Variables
  let archivos = [];

  // Consulta de compras
  useEffect(() => {
    if (selectedCompany && selectedCompany !== "DEFAULT") {
      const res = async () => {
        const resp = await listArchivosService(selectedCompany);
        setList(resp);
        return resp;
      };
      toast.dismiss();
      toast.promise(res, {
        pending: "Consultando Archivos",
        success: {
          render(data) {
            let msg;
            if (data.data.msg) {
              msg = `Error: ` + data.data.msg;
            } else {
              msg = "Consulta Archivos exitosa.";
            }
            return msg;
          },
        },
        error: "Error: Consulta de Archivos No realizada.",
      });
    } else {
      if (selectedCompany === "DEFAULT") {
        setList([]);
      }
    }
  }, [selectedCompany]);

  // Consulta de Compañía
  useEffect(() => {
    const res = async () => {
      const resp = await listCompaniasService();
      setCompany(resp);
    };
    res();
  }, []);

  // Al cambiar el valor del select de Companys
  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedCompany(value);
  };

  // Comprobando si hubo error list.msg
  if (!list.msg) {
    archivos = list
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((archivo) => {
        return (
          <TableRow key={archivo.id}>
            <TableCell component="th" scope="row" align="center">
              {archivo.id}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {archivo.id}
              {archivo.nombre_archivo}
            </TableCell>
            <TableCell component="th" align="center">
              {archivo.TipoArchivo.descripcion_tipo_archivo}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {moment(archivo.fecha_archivo).format("DD-MM-YYYY")}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {archivo.UserCompany.User.username}
            </TableCell>

            <TableCell component="th" scope="row" align="center">
              {archivo.UserCompany.Company.nombre_company}
            </TableCell>
            {archivo.status === 1 ? (
              <TableCell component="th" scope="row" align="center">
                <span className="msjGenerado"> Generado </span>
              </TableCell>
            ) : (
              <TableCell
                component="th"
                scope="row"
                align="center"
                color="#F9A719"
              >
                Anulado
              </TableCell>
            )}

            {archivo.automatico === true ? (
              <TableCell component="th" scope="row" align="center">
                <span className="msjGenerado"> Automática </span>
              </TableCell>
            ) : (
              <TableCell
                component="th"
                scope="row"
                align="center"
                color="#F9A719"
              >
                Manual
              </TableCell>
            )}
            {archivo.status === 1 ? (
              <TableCell component="th" scope="row" align="center">
                <Link to={`./detalles/${archivo.id}`}>
                  <MdListAlt size={25} color="#00BFB3" />
                </Link>
              </TableCell>
            ) : (
              <TableCell component="th" scope="row" align="center">
                <MdListAlt size={25} color="#9D9D9C" />
              </TableCell>
            )}
            <TableCell scope="row" component="th" align="center">
              <Grid container spacing={0}>
                <Grid item xs={11}>
                  {archivo.TipoArchivo.tipo_archivo === "COM" ? (
                    <TextField
                      size="small"
                      id="path_archivo"
                      label="Ruta de archivo"
                      defaultValue={
                        archivo.UserCompany.Company.ruta_archivo_compra
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  ) : (
                    <TextField
                      size="small"
                      id="path_archivo"
                      label="Ruta de archivo"
                      defaultValue={
                        archivo.UserCompany.Company.ruta_archivo_venta
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={1}>
                  <Button onClick={OpenDirectory} defaultValue={archivo.id}>
                    <MdContentCopy size={25} color="#00BFB3" />
                  </Button>
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        );
      });
  }

  return (
    <LayoutSession titleModule="Archivos">
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
          <Typography variant="subtitles">Transacciones de Archivos</Typography>
        </Grid>
        <Divider variant="middle " />
        {/* <Box sx={{ p: 2 }}></Box> */}

        {/* Select Company */}
        <Box sx={{ p: 2 }}>
          <Stack direction={{ xs: "column", sm: "row" }}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControl size="small">
                <InputLabel id="labelSelectCompany">Compañias</InputLabel>
                <Select
                  labelId="labelSelectCompany"
                  id="selectCompany"
                  defaultValue={"DEFAULT"}
                  value={selectedCompany}
                  onChange={handleChange}
                  label="Compañias"
                >
                  <MenuItem value="DEFAULT">
                    <em> Seleccione Compañía ...</em>
                  </MenuItem>
                  {company.map((comp, index) => {
                    return index === 0 ? (
                      <MenuItem key={comp.id} value={comp.id}>
                        {comp.nombre_company}
                      </MenuItem>
                    ) : (
                      <MenuItem key={comp.id} value={comp.id}>
                        {comp.nombre_company}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Stack>
        </Box>

        {/* Tabla */}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Codigo</TableCell>
                <TableCell align="center">Nombre archivo</TableCell>
                <TableCell align="center">Tipo Archivo</TableCell>
                <TableCell align="center">Fecha</TableCell>
                <TableCell align="center">Usuario</TableCell>
                <TableCell align="center">Compañia</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Creación</TableCell>
                <TableCell align="center">Detalles</TableCell>
                <TableCell align="center">Ruta Doc.</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {archivos.length === 0 ? (
                <TableRow>
                  <TableCell
                    component="th"
                    className="text-center"
                    colSpan={10}
                    align="center"
                  >
                    <MdOutlineTextSnippet size={25} />
                    <Typography>
                      No hay resultado de transacciones de archivos.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                archivos
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <TablePaginationComponent children={archivos} /> */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 50, 100]}
          component="div"
          count={list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </LayoutSession>
  );
}
