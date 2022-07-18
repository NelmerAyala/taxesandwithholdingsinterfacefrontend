// Nuevo
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import Context from "../contexts/UserContext";

// Estilos
import "../assets/css/App.css";

// Layoout
import LayoutSession from "../layout/LayoutSession";

// Services
import listDetallesArchivoService from "../services/listDetallesArchivoService";
// import anularFileService from "../services/";
import anularTransaccionService from "../services/anularTransaccionService";

// Componentes
import Checkbox from "../components/Checkbox";

// Notifiaciones
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Formato montos
import CurrencyFormat from "react-currency-format";

// Formato Dias
import moment from "moment";

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
  Container,
  Grid,
  Divider,
  Typography,
  styled,
  Stack,
  Button,
  Tooltip,
  MdKeyboardBackspace,
  MdDeleteForever,
} from "../consts";

export default function DetailsArchivos() {
  // Constantes
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const { id } = useParams();
  const [archivos, setArchivos] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { compra, venta } = useContext(Context);
  // Navigate
  let navigate = useNavigate();

  // useEffect(() => {
  //   for (let archivo of archivos) {
  //     if (archivo.status === 2) {
  //       <Navigate to={"/archivos"} replace />;
  //     }
  //   }
  // }, [archivos]);

  useEffect(() => {
    if (redirect === true) navigate(`/archivos`);
  }, [redirect]);

  useEffect(() => {
    const res = async () => {
      const resp = await listDetallesArchivoService(id);
      setArchivos(resp.body.archivo_detalles);
    };
    res();
  }, [id]);

  // // //Submit anular
  // const hadleSubmit = (e) => {
  //   e.preventDefault();
  //   const res = async () => {
  //     const resp = await anularTransaccionService(id);
  //     setArchivos(resp.body.archivo_detalles);
  //   };
  //   toast.dismiss();
  //   toast.promise(res, {
  //     pending: "Anulando Archivo..",
  //     success: "Archivo Anulado de manera Exitosa!",
  //     error: "Error: Archivo NO Anulado.",
  //   });
  // };

  // Anular Seleccionado
  const hadleSubmit = (e) => {
    const { value } = e.target;
    const anulacion = value;
    if (isCheck.length > 0) {
      const res = async () => {
        return new Promise((resolve, reject) => {
          const respuesta = async () => {
            const resp = await anularTransaccionService(
              { ids: isCheck },
              id,
              anulacion
            );

            setIsCheckAll(false);
            if (resp.body) {
              if (!resp.body.archivo_detalles) {
                setRedirect(true);
              } else {
                setArchivos(resp.body.archivo_detalles);
              }
              resolve(resp);
            } else {
              reject(resp);
            }
          };
          respuesta();
        });
      };
      toast.dismiss();
      toast.promise(res, {
        pending:
          anulacion === "1"
            ? "Desvinculando Transacciones seleccionadas.."
            : "Eliminando Transacciones seleccionadas..",
        success: {
          render({ data }) {
            let msg;
            if (data.body.msg) {
              msg = data.body.msg;
            } else {
              msg =
                anulacion === "1"
                  ? "Transacciones seleccionadas desvinculada Exitosamente.!!"
                  : "Transacciones seleccionadas Eliminadas Exitosamente.!!";
            }
            return msg;
          },
        },
        error: {
          render({ data }) {
            let msg;
            if (data.errors.msg) {
              msg = data.errors.msg;
            } else {
              msg =
                anulacion === "1"
                  ? "Error: Transacciones seleccionadas NO desvinculada.!!"
                  : "Error: Transacciones seleccionadas NO Eliminadas.!!";
            }
            return msg;
          },
        },
      });
    } else {
      toast.info("No ha seleccionado ninguna transacción.");
    }
  };

  // Estructura del Item
  const Item = styled(Container)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

  // Seleccionar todas las transacciones
  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);

    if (archivos.length > 0) {
      archivos.map((archivo) => {
        if (archivo.Compras.length > 0) {
          setIsCheck(archivo.Compras.map((li) => li.id));
        } else if (archivo.Venta.length > 0) {
          setIsCheck(archivo.Venta.map((li) => li.id));
        }
        return <></>;
      });
    }

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

  return (
    <LayoutSession titleModule="Detalle de Archivo">
      {/* Notifiaciones */}
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
        <Stack direction={{ xs: "column", sm: "row" }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item sx={{ pt: 2, pl: 2 }}>
              <Typography variant="subtitles">
                Detalle del Archivo: <b>{id}</b>
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
                <Link to={`../archivos`}>
                  <MdKeyboardBackspace color="#75787B" size={35} />
                </Link>
              </span>
            </Tooltip>
          </Grid>
        </Stack>
        <Divider variant="middle " />
        <Box sx={{ p: 1 }}></Box>

        <form onSubmit={hadleSubmit}>
          {/* Menu de Informacion y Botones de Anulacion */}
          {archivos.length > 0 ? (
            archivos.map((archivo) => {
              return archivo.status === 2 ? (
                <Container key="1">
                  <Navigate to={"/archivos"} replace />
                </Container>
              ) : (
                <Box sx={{ flexGrow: 1 }} key={archivo.id}>
                  <Grid container item spacing={2}>
                    <Grid item xs={4}>
                      <Item>
                        <b>Codigo:</b> {archivo.id}
                      </Item>
                      <Item>
                        <b>Nombre archivo:</b> {archivo.id}
                        {archivo.nombre_archivo}
                      </Item>
                      <Item>
                        <b>Tipo archivo:</b>
                        {archivo.TipoArchivo.descripcion_tipo_archivo}
                      </Item>
                      <Item>
                        <b>Estado:</b>
                        {archivo.status === 1 ? "Generado" : "Anulado"}
                      </Item>
                    </Grid>

                    <Grid item xs={4}>
                      <Item>
                        <b>Fecha:</b>
                        {moment(archivo.fecha_archivo).format("DD-MM-YYYY")}
                      </Item>
                      <Item sx={{ display: "flex" }}>
                        <b>Usuario generador: </b>
                        <Typography
                          sx={{
                            textTransform: "uppercase",
                          }}
                        >
                          {archivo.UserCompany.User.username}
                        </Typography>
                      </Item>
                      <Item>
                        <b>Compañia:</b>
                        {archivo.UserCompany.Company.nombre_company}
                      </Item>
                    </Grid>
                    {archivo.TipoArchivo.tipo_archivo === compra ? (
                      <Grid item xs={4}>
                        {/* <Item>
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
                              Anular Archivo
                            </Button>
                          </Item> */}
                        <Item>
                          <Button
                            onClick={hadleSubmit}
                            value={1}
                            variant="contained"
                            color="warning"
                            sx={{
                              px: 5,
                              borderRadius: "1rem",
                              textTransform: "none",
                            }}
                          >
                            Desvincular Seleccionados
                          </Button>
                        </Item>
                        {/* <Item>
                            <Button
                              onClick={hadleSubmit}
                              value={2}
                              variant="contained"
                              color="warning"
                              sx={{
                                px: 5,
                                borderRadius: "1rem",
                                textTransform: "none",
                              }}
                            >
                              Eliminar Seleccionados
                          </Button>
                          </Item> */}
                      </Grid>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Box>
              );
            })
          ) : (
            <></>
          )}

          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table" size="small">
              <TableHead>
                {archivos.length > 0 ? (
                  !archivos ? (
                    <TableRow>
                      <TableCell colSpan={10}>Cargando...</TableCell>
                    </TableRow>
                  ) : (
                    archivos.map((archivo) => {
                      return archivo.TipoArchivoId === 1 &&
                        archivo.TipoArchivo.tipo_archivo === venta ? (
                        // Cabecera de Ventas
                        <TableRow key={archivo.id}>
                          {/* <TableCell align="center">
                            <Checkbox
                              color="primary"
                              type="checkbox"
                              name="selectAll"
                              id="selectAll"
                              handleClick={handleSelectAll}
                              isChecked={isCheckAll}
                            />
                          </TableCell> */}
                          <TableCell component="th" scope="row" align="center">
                            <b>Nº Doc.</b>
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            <b>Nº Control</b>
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            <b>Nº Comprobante</b>
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            <b>Tipo Doc.</b>
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            <b>Fecha Emisión</b>
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            <b>Rif</b>
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            <b>Cliente</b>
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            <b>Subtotal</b>
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            <b>Impuesto</b>
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            <b>Total</b>
                          </TableCell>
                        </TableRow>
                      ) : (
                        // Cabecera de Compras
                        <TableRow key={archivo.id}>
                          <TableCell align="center">
                            <Tooltip followCursor title="Seleccionar todos">
                              <span>
                                <Checkbox
                                  color="primary"
                                  type="checkbox"
                                  name="selectAll"
                                  id="selectAll"
                                  handleClick={handleSelectAll}
                                  isChecked={isCheckAll}
                                />
                              </span>
                            </Tooltip>
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            <b> Nº Doc.</b>
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            <b> Nº Control</b>
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            <b> Tipo Doc.</b>
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            <b> Fecha Emisión</b>
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            <b> Rif</b>
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            <b>Proveedor</b>
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            <b>Subtotal</b>
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            <b>Impuesto</b>
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            <b> Total</b>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )
                ) : (
                  <></>
                )}
              </TableHead>
              <TableBody>
                {archivos.length > 0 ? (
                  !archivos ? (
                    <TableRow>
                      <TableCell colSpan={10}>Cargando...</TableCell>
                    </TableRow>
                  ) : (
                    archivos.map((archivo) => {
                      return !archivo.Compras ? (
                        <TableRow>
                          <TableCell colSpan={10}>
                            Cargando Archivos de Compras
                          </TableCell>
                        </TableRow>
                      ) : (
                        archivo.Compras.map((compra) => {
                          return (
                            <TableRow key={compra.id}>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {compra.status_compra === 0 ? (
                                  <Tooltip followCursor title="Seleccionar">
                                    <span>
                                      <Checkbox
                                        id={compra.id}
                                        name={compra.numero_comprobante}
                                        type="checkbox"
                                        handleClick={handleClick}
                                        isChecked={isCheck.includes(compra.id)}
                                      />
                                    </span>
                                  </Tooltip>
                                ) : compra.status_compra === 2 ? (
                                  <Tooltip title="Documento Anulado en Softland">
                                    <span>
                                      <MdDeleteForever
                                        size={26}
                                        color="#E20613"
                                        name={"Eliminado"}
                                      />
                                    </span>
                                  </Tooltip>
                                ) : (
                                  "Estatus desconocido"
                                )}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {compra.numero_doc}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {compra.numero_control}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {archivo.TipoArchivo.descripcion_tipo_archivo}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {moment(compra.fecha_doc).format("DD-MM-YYYY")}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {compra.numero_rif}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {compra.nombre_proveedor}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
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
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
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
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
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
                        })
                      );
                    })
                  )
                ) : (
                  <></>
                )}
                {archivos.length > 0 ? (
                  !archivos ? (
                    <TableRow>
                      <TableCell colSpan={10}>Cargando... </TableCell>
                    </TableRow>
                  ) : (
                    archivos.map((archivo) => {
                      return !archivo.Venta ? (
                        <TableRow>
                          <TableCell colSpan={10}>
                            Cargando Archivos de Ventas
                          </TableCell>
                        </TableRow>
                      ) : (
                        archivo.Venta.map((venta) => {
                          return (
                            <TableRow key={venta.id}>
                              {/* <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {venta.status_venta === 0 ? (
                                  <Checkbox
                                    id={venta.id}
                                    name={venta.numero_comprobante}
                                    type="checkbox"
                                    handleClick={handleClick}
                                    isChecked={isCheck.includes(venta.id)}
                                  />
                                ) : venta.status_venta === 2 ? (
                                  <MdDeleteForever
                                    size={26}
                                    color="#E20613"
                                    name={"Eliminado"}
                                  />
                                ) : (
                                  "Estatus *" +
                                  venta.status_venta +
                                  "* desconocido."
                                )}
                              </TableCell> */}
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {venta.numero_doc}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {venta.numero_control}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {venta.numero_comprobante}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {archivo.TipoArchivo.descripcion_tipo_archivo}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {moment(venta.fecha_doc).format("DD-MM-YYYY")}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {venta.numero_rif}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {venta.nombre_cliente}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
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
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
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
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
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
                        })
                      );
                    })
                  )
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </form>
      </Paper>
    </LayoutSession>
  );
}
