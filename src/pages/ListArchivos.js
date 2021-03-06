// Nuevo
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../contexts/UserContext";

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
  Tooltip,
  Snackbar,
  MuiAlert,
} from "../consts";

// Notificaciones
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// formato Fecha
import moment from "moment";

// sort table
import TableOrder from "../components/TableOrder";
import TableSort from "../components/TableSort";

export default function ListArchivos() {
  const { compra } = useContext(Context);
  // Constantes
  const [list, setList] = useState([]);
  const [company, setCompany] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("DEFAULT");

  //Paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = React.useState(false);

  // Handle cambiar pagina
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle cambiar fila por pagina
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Url Directorio
  const OpenDirectory = (e) => {
    let copyText = document.getElementById("path_archivo_" + e.target.value);
    setOpen(true);
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
    /* Alert the copied text */
    // alert("Copied the text: " + copyText.value);
    // alert("Copied the text: " + copyText.value);
  };

  // Alert
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={4} ref={ref} variant="standard" {...props} />;
  });

  // Variables
  let archivos = [];

  // Consulta de archivos
  useEffect(() => {
    if (selectedCompany && selectedCompany !== "DEFAULT") {
      const res = () => {
        return new Promise((resolve, reject) => {
          const respuesta = async () => {
            const resp = await listArchivosService(selectedCompany);
            if (resp.body) {
              setList(resp.body.archivos);
              resolve(resp);
            } else {
              setList([]);
              reject(resp);
            }
          };
          respuesta();
        });
      };
      toast.dismiss();
      toast.promise(res, {
        pending: "Consultando Archivos..",
        success: {
          render({ data }) {
            let msg = "Consulta Archivos exitosa..!!";
            if (data.body.msg) {
              msg = data.body.msg;
            }
            return msg;
          },
        },
        error: {
          render({ data }) {
            let msg = "Error: Consulta de Archivos NO Realizada.!!";
            if (data.errors.msg) {
              msg = `Error: ` + data.errors.msg;
            }
            return msg;
          },
        },
      });
    } else {
      if (selectedCompany === "DEFAULT") {
        setList([]);
      }
      TableOrder();
      TableSort();
    }
  }, [selectedCompany]);

  // Consulta de Compañía
  useEffect(() => {
    const res = async () => {
      const resp = await listCompaniasService();
      setCompany(resp.body.companias);
    };
    res();
  }, []);

  // Al cambiar el valor del select de Companys
  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedCompany(value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Comprobando si hubo error list.msg
  if (!list.msg) {
    archivos = list
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((archivo) => {
        return (
          <TableRow key={archivo.id}>
            <TableCell component="th" scope="row" align="center">
              <b>{archivo.id}</b>
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {archivo.id}
              {archivo.nombre_archivo}
            </TableCell>
            <TableCell component="th" align="center">
              {archivo.TipoArchivo.tipo_archivo}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {moment(archivo.fecha_archivo).format("YYYY-MM-DD")}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {archivo.UserCompany.User.username}
            </TableCell>

            <TableCell component="th" scope="row" align="center">
              {archivo.UserCompany.Company.nombre_company}
            </TableCell>
            {archivo.status === 1 ? (
              <TableCell component="th" scope="row" align="center">
                <Typography color="#00BFB3" variant="h7">
                  Generado
                </Typography>
              </TableCell>
            ) : (
              <TableCell component="th" scope="row" align="center">
                <Typography variant="h7" color="#F9A719">
                  Anulado
                </Typography>
              </TableCell>
            )}

            {archivo.automatico === true ? (
              <TableCell component="th" scope="row" align="center">
                <span className="msjGenerado"> Automática </span>
              </TableCell>
            ) : (
              <TableCell component="th" scope="row" align="center">
                Manual
              </TableCell>
            )}
            {archivo.status === 1 ? (
              <TableCell component="th" scope="row" align="center">
                <Link to={`./detalles/${archivo.id}`}>
                  <Tooltip title="Abrir Archivo">
                    <span>
                      <MdListAlt size={25} color="#00BFB3" />
                    </span>
                  </Tooltip>
                </Link>
              </TableCell>
            ) : (
              <TableCell component="th" scope="row" align="center">
                <Tooltip followCursor title="Archivo Anulado.">
                  <span>
                    <MdListAlt size={25} color="#9D9D9C" />
                  </span>
                </Tooltip>
              </TableCell>
            )}
            <TableCell scope="row" component="th" align="center">
              <Grid container spacing={0}>
                <Grid item xs={10}>
                  {archivo.TipoArchivo.tipo_archivo === compra ? (
                    <TextField
                      size="small"
                      id={"path_archivo_" + archivo.id}
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
                      id={"path_archivo_" + archivo.id}
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
                  <Tooltip followCursor title="Copiar Direccion">
                    <span>
                      {/* <Button onClick={OpenDirectory} defaultValue={archivo.id}> */}
                      <Button
                        onClick={(e) =>
                          OpenDirectory({
                            target: {
                              value: archivo.id,
                            },
                          })
                        }
                        defaultValue={archivo.id}
                      >
                        <MdContentCopy size={25} color="#00BFB3" />
                      </Button>
                    </span>
                  </Tooltip>

                  <Snackbar
                    open={open}
                    autoHideDuration={1500}
                    onClose={handleClose}
                  >
                    <Alert severity="info">¡Direccion Copiada!</Alert>
                  </Snackbar>
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
          <Typography variant="subtitles">Lista de Archivos</Typography>
        </Grid>
        <Divider variant="middle " />

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
                    <TableCell component="th" align="center" className="order">
                      <Tooltip followCursor title="Ordenar">
                        <span>
                          <b>Codigo</b>
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell component="th" align="center">
                      <b>Nombre archivo</b>
                    </TableCell>
                    <TableCell component="th" align="center" className="sort">
                      <Tooltip followCursor title="Ordenar">
                        <span>
                          <b>Tipo archivo</b>
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell component="th" align="center" className="sort">
                      <Tooltip followCursor title="Ordenar">
                        <span>
                          <b>Fecha</b>
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell component="th" align="center" className="sort">
                      <Tooltip followCursor title="Ordenar">
                        <span>
                          <b>Usuario</b>
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell component="th" align="center">
                      <b>Compañia</b>
                    </TableCell>
                    <TableCell component="th" align="center" className="sort">
                      <Tooltip followCursor title="Ordenar">
                        <span>
                          <b>Estado</b>
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell component="th" align="center" className="sort">
                      <Tooltip followCursor title="Ordenar">
                        <span>
                          <b>Creación</b>
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell component="th" align="center">
                      <b>Detalle</b>
                    </TableCell>
                    <TableCell component="th" align="center">
                      <b>Ruta Doc.</b>
                    </TableCell>
                    <TableCell component="th" align="center"></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {archivos.length === 0 ? (
                    <TableRow>
                      <TableCell
                        sx={{ p: 2 }}
                        component="th"
                        className="text-center"
                        colSpan={11}
                        align="center"
                      >
                        <MdOutlineTextSnippet size={35} />
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

            {list.length > 0 ? (
              <TablePagination
                rowsPerPageOptions={[
                  10,
                  50,
                  100,
                  500,
                  { value: -1, label: "Todas" },
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
    </LayoutSession>
  );
}
