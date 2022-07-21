// Nuevo
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Services
import listUsuariosService from "../services/listUsuariosService";
import listCompaniasService from "../services/listCompaniasService";

// Notify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout
import LayoutSession from "../layout/LayoutSession";

// sort table
import TableOrder from "../components/TableOrder";
import TableSort from "../components/TableSort";

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
  Container,
  Divider,
  Typography,
  TablePagination,
  Stack,
  Button,
  MdOutlineModeEditOutline,
  MdOutlineAdd,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  MdPersonSearch,
  Tooltip,
} from "../consts";

export default function ListUsuarios() {
  // Constants
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [list, setList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("DEFAULT");

  //Paginas
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Consulta de usuarios
  useEffect(() => {
    if (selectedCompany && selectedCompany !== "DEFAULT") {
      const res = () => {
        return new Promise((resolve, reject) => {
          const respuesta = async () => {
            const resp = await listUsuariosService(selectedCompany);
            TableOrder();
            TableSort();
            if (resp.body) {
              setList(resp.body.users);
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
        pending: "Consultando Usuarios..",
        success: {
          render({ data }) {
            let msg = "Consulta de Usuarios Exitosa..!!";
            if (data.body.msg) {
              msg = data.body.msg;
            }
            return msg;
          },
        },
        error: {
          render({ data }) {
            let msg = "Error: Consulta de Usuarios NO Realizada.!!";
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

  // Handle cambiar pagina
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle cambiar fila por pagina
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Variables
  let listusuarios = [];

  // Comprobando si hubo error list.msg
  if (!list.msg) {
    listusuarios = list
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((users) => {
        return (
          <TableRow key={users.id}>
            <TableCell component="th" scope="row" align="center">
              {users.firstname} {users.lastname}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {users.email}
            </TableCell>
            <TableCell component="th" scope="row" align="center">
              {users.Companies.map((compania) => {
                return (
                  <Box key={compania.id}>
                    {compania.nombre_company} <br />
                  </Box>
                );
              })}
            </TableCell>
            <TableCell
              component="th"
              className="text-center"
              colSpan={1}
              align="center"
            >
              <Tooltip title="Editar Usuario">
                <span>
                  <Link to={`./${users.id}`}>
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
    <LayoutSession titleModule="Usuarios">
      {/* Notify */}
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
        {/*  Titulo */}
        <Grid sx={{ pt: 2, pl: 2 }}>
          <Typography variant="subtitles">
            Administracion de Usuarios
          </Typography>
        </Grid>
        <Divider variant="middle " />

        {/* Select Company */}
        <Grid container rowSpacing={1}>
          <Grid item xs={6}>
            <Stack direction="row" alignItems="center" sx={{ m: 2 }}>
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
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack
              sx={{ m: 2 }}
              justifyContent="flex-end"
              alignItems="flex-start"
              direction={{ xs: "column", sm: "row" }}
            >
              <Button
                sx={{
                  px: 5,
                  borderRadius: "1rem",
                  color: "white.main",
                  textTransform: "none",
                }}
                onClick={() => navigate("/usuarios/nuevo")}
                variant="contained"
                startIcon={<MdOutlineAdd />}
              >
                Nuevo Usuario
              </Button>
            </Stack>
          </Grid>
        </Grid>

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
                    <TableCell component="th" className="sort" align="center">
                      <Tooltip followCursor title="Ordenar">
                        <span>
                          <b>Nombre Completo</b>
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell component="th" align="center">
                      <b>Correo</b>
                    </TableCell>
                    <TableCell component="th" align="center">
                      <b>Empresa</b>
                    </TableCell>
                    <TableCell component="th" align="center">
                      <b>Editar</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listusuarios.length === 0 ? (
                    <TableRow>
                      <TableCell
                        sx={{ p: 2 }}
                        component="th"
                        colSpan={4}
                        align="center"
                      >
                        <MdPersonSearch size={35} />
                        <Typography>No hay usuarios consultados</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    listusuarios
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <TablePaginationComponent children={list} /> */}
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
