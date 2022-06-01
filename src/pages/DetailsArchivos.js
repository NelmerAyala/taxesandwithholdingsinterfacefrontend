// Nuevo
import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";

// Estilos
import "../assets/css/App.css";

// Layoout
import LayoutSession from "../layout/LayoutSession";

// Services
import listDetallesArchivoService from "../services/listDetallesArchivoService";
import anularFileService from "../services/anularFileService";
import anularTransaccionService from "../services/anularTransaccionService";

// Componentes
import Checkbox from "../components/Checkbox";

// Notifiaciones
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  Button,
  MdKeyboardBackspace,
  MdDeleteForever,
} from "../consts";

export default function DetailsArchivos() {
  // Constantes
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const { id } = useParams();
  const [archivos, setArchivos] = useState([]);

  useEffect(() => {
    const res = async () => {
      const resp = await listDetallesArchivoService(id);
      setArchivos(resp);
    };
    res();
  }, [id]);

  // useEffect(() => {
  //   if (archivos) {
  //     setInterval(() => {
  //       navigate("/archivos");
  //     }, 5000);
  //   }
  // }, [archivos]);

  const hadleSubmit = (e) => {
    e.preventDefault();
    const res = async () => {
      const resp = await anularFileService(id);
      setArchivos(resp);
    };
    toast.dismiss();
    toast.promise(res, {
      pending: "Anulando Archivo.",
      success: "Archivo Anulado de manera Exitosa!",
      error: "Error: Archivo No Anulado.",
    });
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

  // Anular Seleccionado
  const hadleSelected = (e) => {
    const { value } = e.target;
    const anulacion = value;

    if (isCheck.length > 0) {
      const res = async () => {
        const resp = await anularTransaccionService(
          { ids: isCheck },
          id,
          anulacion
        );
        setArchivos(resp);

        setIsCheckAll(false);
        return resp;
      };
      toast.dismiss();
      toast.promise(res, {
        pending:
          anulacion === "1"
            ? "Anulando Transacciones seleccionadas."
            : "Eliminando Transacciones seleccionadas.",
        success: {
          render(data) {
            let msg;
            if (data.data.msg) {
              msg = `Error: ` + data.data.msg;
            } else {
              msg =
                anulacion === "1"
                  ? "Transacciones seleccionadas Anuladas Exitosamente."
                  : "Transacciones seleccionadas Eliminadas Exitosamente.";
            }
            return msg;
          },
        },
        error:
          anulacion === "1"
            ? "Error: Transacciones seleccionadas No Anuladas."
            : "Error: Transacciones seleccionadas No Eliminadas.",
      });
    } else {
      toast.info("No ha seleccionado ninguna transacción.");
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
        <Grid container spacing={6} sx={{ pt: 2, pl: 2 }}>
          <Grid item xs={12} sm={10}>
            <Typography variant="subtitles">Detalle de Archivo {id}</Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Link to={`../archivos`}>
              <MdKeyboardBackspace color="#75787B" size={35} />
            </Link>
          </Grid>
        </Grid>
        <Divider variant="middle " />
        <Box sx={{ p: 2 }}></Box>

        <form onSubmit={hadleSubmit}>
          {archivos.length > 0 ? (
            archivos.map((archivo) => {
              return archivo.status === 2 ? (
                <Container key="1">
                  <Navigate to={"/archivos"} replace />
                </Container>
              ) : (
                <Box sx={{ flexGrow: 1 }} key={archivo.id}>
                  <Grid container item spacing={3}>
                    <React.Fragment>
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
                          <Typography sx={{ textTransform: "uppercase" }}>
                            {archivo.UserCompany.User.username}
                          </Typography>
                        </Item>
                        <Item>
                          <b>Compañia:</b>
                          {archivo.UserCompany.Company.nombre_company}
                        </Item>
                      </Grid>
                      {archivo.TipoArchivo.tipo_archivo === "COM" ? (
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
                              onClick={hadleSelected}
                              value={1}
                              variant="contained"
                              sx={{
                                px: 5,
                                borderRadius: "1rem",
                                color: "white.main",
                                textTransform: "none",
                              }}
                            >
                              Anular Seleccionados
                            </Button>
                          </Item>
                          <Item>
                            <Button
                              onClick={hadleSelected}
                              value={2}
                              variant="contained"
                              sx={{
                                px: 5,
                                borderRadius: "1rem",
                                color: "white.main",
                                textTransform: "none",
                              }}
                            >
                              Eliminar Seleccionados
                            </Button>
                          </Item>
                        </Grid>
                      ) : (
                        <></>
                      )}
                    </React.Fragment>
                  </Grid>
                </Box>
              );
            })
          ) : (
            <></>
          )}
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                {archivos.length > 0 ? (
                  !archivos ? (
                    <TableRow>
                      <TableCell colSpan={9}>Cargando</TableCell>
                    </TableRow>
                  ) : (
                    archivos.map((archivo) => {
                      return archivo.TipoArchivoId === 1 ? (
                        <TableRow key={archivo.id}>
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
                          <TableCell component="th" scope="row" align="center">
                            Nº Doc.
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            Nº Control
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            Nº Comprobante
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            Tipo Doc.
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            Fecha Emisión
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            Rif
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            Cliente
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            Mto. Subtotal
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            Mto. Impuesto
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            Mto. Total
                          </TableCell>
                        </TableRow>
                      ) : (
                        <TableRow key={archivo.id}>
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
                          <TableCell component="th" scope="row" align="center">
                            Nº Doc.
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            Nº Control
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            Tipo Doc.
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            Fecha Emisión
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            Rif
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            Proveedor
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            Mto. Subtotal
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            Mto. Impuesto
                          </TableCell>
                          <TableCell component="th" scope="row" align="center">
                            Mto. Total
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
                      <TableCell colSpan={9}>Cargando</TableCell>
                    </TableRow>
                  ) : (
                    archivos.map((archivo) => {
                      return !archivo.Compras ? (
                        <TableRow>
                          <TableCell colSpan={8}>Cargando Compras</TableCell>
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
                                  <Checkbox
                                    id={compra.id}
                                    name={compra.numero_comprobante}
                                    type="checkbox"
                                    handleClick={handleClick}
                                    isChecked={isCheck.includes(compra.id)}
                                  />
                                ) : compra.status_compra === 2 ? (
                                  <MdDeleteForever
                                    size={26}
                                    color="#E20613"
                                    name={"Eliminado"}
                                  />
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
                                {compra.base_imponible_tasa_general}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {compra.monto_impuesto_tasa_general}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {compra.base_imponible_tasa_general +
                                  compra.monto_impuesto_tasa_general}
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
                      <TableCell colSpan={8}>Cargando</TableCell>
                    </TableRow>
                  ) : (
                    archivos.map((archivo) => {
                      return !archivo.Venta ? (
                        <TableRow>
                          <TableCell colSpan={9}></TableCell>
                        </TableRow>
                      ) : (
                        archivo.Venta.map((venta) => {
                          return (
                            <TableRow key={venta.id}>
                              <TableCell
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
                              </TableCell>
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
                                {venta.base_imponible_tasa_general}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {venta.monto_impuesto_tasa_general}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                align="center"
                              >
                                {venta.base_imponible_tasa_general +
                                  venta.monto_impuesto_tasa_general}
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
