// Nuevo
import React, { useState, useEffect } from "react";

// Styles
import "../assets/css/App.css";

// Layout
import LayoutSession from "../layout/LayoutSession";

// Services
import listVentasService from "../services/listVentasService";
import listCompaniasService from "../services/listCompaniasService";
import generateFileVentasService from "../services/generateFileVentasService";

// Componentes
import Checkbox from "../components/Checkbox";

// External components
import {
  Box,
  Button,
  Container,
  TablePagination,
  FormControl,
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
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  MdOutlineTextSnippet,
} from "../consts";

// Notificaciones
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Currency
import CurrencyFormat from "react-currency-format";

// format date
import moment from "moment";

export default function ListVentas() {
  // Constantes
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);
  const [company, setCompany] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("DEFAULT");

  //Paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Variables
  let ventas = [];

  // Consulta de Compañía
  useEffect(() => {
    const res = async () => {
      const resp = await listCompaniasService();
      setCompany(resp.body);
    };
    res();
  }, []);

  // Consulta de ventas
  useEffect(() => {
    if (selectedCompany && selectedCompany !== "DEFAULT") {
      const res = async () => {
        const resp = await listVentasService(selectedCompany);
        setList(resp.body.ventas);
        return resp;
      };
      toast.dismiss();
      toast.promise(res, {
        pending: "Consultando Transacciones de Ventas.",
        success: {
          render(data) {
            let msg;
            if (data.data.msg) {
              msg = `Error: ` + data.data.msg;
            } else {
              msg = "Consulta Ventas exitosa.";
            }
            return msg;
          },
        },
        error: "Error: Consulta de Transacciones de Ventas No realizada.",
      });
    } else {
      if (selectedCompany === "DEFAULT") {
        setList([]);
      }
    }
  }, [selectedCompany]);

  // Submit Generar Archivo
  const hadleSubmit = (e) => {
    if (isCheck.length > 0) {
      e.preventDefault();
      const res = async () => {
        const resp = await generateFileVentasService(
          { ids: isCheck },
          selectedCompany
        );
        setList(resp);
        setIsCheckAll(false);
        setSelectedCompany("DEFAULT");
        return resp;
      };
      toast.dismiss();
      toast.promise(res, {
        pending: "Generando Archivo de Ventas.",
        success: {
          render(data) {
            let msg;
            if (data.data.msg) {
              msg = `Error: ` + data.data.msg;
            } else {
              msg = "Archivo de Ventas Generado Exitosamente.";
            }
            return msg;
          },
        },
        error: "Error: Archivo de Ventas No Generado.",
      });
    } else {
      e.preventDefault();
      toast.info("No ha seleccionado ninguna transacción de ventas.");
    }
  };

  // Seleccionar todas las transacciones
  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list.map((li) => li.id));

    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  // Seleccionar una transacción
  const handleClick = (e) => {
    const { id, checked } = e.target;

    setIsCheck([...isCheck, parseInt(id)]);

    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== parseInt(id)));
      if (isCheckAll) {
        setIsCheckAll(false);
      }
    }
  };

  // Al cambiar el valor del select de Companys
  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedCompany(value);
    setIsCheckAll(false);
    setIsCheck([]);
  };

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
    ventas = list
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((venta) => {
        return (
          <TableRow key={venta.id}>
            <TableCell component="th" scope="row" align="center">
              <Checkbox
                id={venta.id}
                name={venta.numero_comprobante}
                type="checkbox"
                handleClick={handleClick}
                isChecked={isCheck.includes(venta.id)}
              />
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {venta.numero_doc}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {venta.numero_control}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {venta.numero_comprobante}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {venta.TipoDocumento.tipo_doc}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {moment(venta.fecha_doc).format("DD-MM-YYYY")}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {venta.numero_rif}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {venta.nombre_cliente}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              <CurrencyFormat
                value={venta.base_imponible_tasa_general}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                displayType={"text"}
                prefix={""}
              />
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              <CurrencyFormat
                value={venta.monto_impuesto_tasa_general}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                displayType={"text"}
                prefix={""}
              />
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              <CurrencyFormat
                value={
                  venta.base_imponible_tasa_general +
                  venta.monto_impuesto_tasa_general
                }
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                displayType={"text"}
                prefix={""}
              />
            </TableCell>
          </TableRow>
        );
      });
  }

  return (
    <LayoutSession titleModule="Ventas">
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
            <Typography variant="subtitles">Transacciones de Ventas</Typography>
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
              <Grid
                container
                direction="row"
                justifyContent="flex-END"
                alignItems="flex-start"
              >
                {selectedCompany === "DEFAULT" ? (
                  <Tooltip followCursor title="Selecciona una compañia.">
                    <span>
                      <Button
                        type="submit"
                        disabled
                        variant="contained"
                        sx={{
                          px: 5,
                          borderRadius: "1rem",
                          color: "white.main",
                          textTransform: "none",
                        }}
                      >
                        Generar Archivo
                      </Button>
                    </span>
                  </Tooltip>
                ) : (
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
                    Generar Archivo
                  </Button>
                )}
              </Grid>
            </Stack>
          </Box>

          {/* Tabla */}
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Checkbox
                      color="primary"
                      type="checkbox"
                      name="selectAll"
                      id="selectAll"
                      handleClick={handleSelectAll}
                      isChecked={isCheckAll}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <b>N° Doc</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>N° Control</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>N° Comprobante</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Tipoc Doc.</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Fecha emisión</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Rif</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Cliente</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Subtotal</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Impuesto</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Total</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {ventas.length === 0 ? (
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
                        No hay resultado de transacciones de ventas.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  ventas
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {list.length > 0 ? (
            <TablePagination
              rowsPerPageOptions={[10, 50, 100, 500]}
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
        </Paper>
      </form>
    </LayoutSession>
  );
}
