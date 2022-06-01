// Nuevo
import React, { useState, useEffect } from "react";

// Estilos
import "../assets/css/App.css";

// Layout
import LayoutSession from "../layout/LayoutSession";

// Services
import listComprasService from "../services/listComprasService";
import listCompaniasService from "../services/listCompaniasService";
import generateFileComprasService from "../services/generateFileComprasService";

// Componentes
import Checkbox from "../components/Checkbox";

// External components
import {
  Box,
  TablePagination,
  Container,
  Button,
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
  MdOutlineTextSnippet,
} from "../consts";

// Notificaciones
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Currency
import CurrencyFormat from "react-currency-format";

// format date
import moment from "moment";

export default function ListCompras() {
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
  let compras = [];

  // Consulta de Compañía
  useEffect(() => {
    const res = async () => {
      const resp = await listCompaniasService();
      setCompany(resp);
    };
    res();
  }, []);

  // Consulta de compras
  useEffect(() => {
    if (selectedCompany && selectedCompany !== "DEFAULT") {
      const res = async () => {
        const resp = await listComprasService(selectedCompany);
        setList(resp);
        return resp;
      };
      toast.dismiss();
      toast.promise(res, {
        pending: "Consultando Transacciones de Compras.",
        success: {
          render(data) {
            let msg;
            if (data.data.msg) {
              msg = `Error: ` + data.data.msg;
            } else {
              msg = "Consulta Compras exitosa.";
            }
            return msg;
          },
        },
        error: "Error: Consulta de Transacciones de Compras No realizada.",
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
        const resp = await generateFileComprasService(
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
        pending: "Generando Archivo de Compras.",
        success: {
          render(data) {
            let msg;
            if (data.data.msg) {
              msg = `Error: ` + data.data.msg;
            } else {
              msg = "Archivo de Compras Generado Exitosamente.";
            }
            return msg;
          },
        },
        error: "Error: Archivo de Compras No Generado.",
      });
    } else {
      e.preventDefault();
      toast.info("No ha seleccionado ninguna transacción de compras.");
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
    compras = list
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((compra) => {
        return (
          <TableRow key={compra.id}>
            <TableCell component="th" scope="row" align="center">
              <Checkbox
                id={compra.id}
                name={compra.numero_rif}
                type="checkbox"
                handleClick={handleClick}
                isChecked={isCheck.includes(compra.id)}
              />
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {compra.numero_doc}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {compra.numero_control}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {compra.TipoDocumento.tipo_doc}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {moment(compra.fecha_doc).format("DD-MM-YYYY")}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {compra.numero_rif}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {compra.nombre_proveedor}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              <CurrencyFormat
                value={compra.base_imponible_tasa_general}
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
                value={compra.monto_impuesto_tasa_general}
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
                  compra.base_imponible_tasa_general +
                  compra.monto_impuesto_tasa_general
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
    <LayoutSession titleModule="Compras">
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
            <Typography variant="subtitles">
              Transacciones de Compras
            </Typography>
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
                  <TableCell align="center">N° Doc</TableCell>
                  <TableCell align="center">N° Control</TableCell>
                  <TableCell align="center">Tipoc Doc.</TableCell>
                  <TableCell align="center">Fecha emisión</TableCell>
                  <TableCell align="center">Rif</TableCell>
                  <TableCell align="center">Proveedor</TableCell>
                  <TableCell align="center">Subtotal</TableCell>
                  <TableCell align="center">Impuesto</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {compras.length === 0 ? (
                  <TableRow>
                    <TableCell
                      component="th"
                      className="text-center"
                      colSpan={10}
                      align="center"
                    >
                      <MdOutlineTextSnippet size={25} />
                      <Typography>
                        No hay resultado de transacciones de compras.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  compras
                )}
              </TableBody>
            </Table>
          </TableContainer>

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
      </form>
    </LayoutSession>
  );
}
