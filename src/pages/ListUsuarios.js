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
      const res = async () => {
        const resp = await listUsuariosService(selectedCompany);
        setList(resp);
        return resp;
      };
      toast.dismiss();
      toast.promise(res, {
        pending: "Consultando Usuarios.",
        success: {
          render(data) {
            let msg;
            if (data.data.msg) {
              msg = `Error: ` + data.data.msg;
            } else {
              msg = "Consulta de Usuarios exitosa.";
            }
            return msg;
          },
        },
        error: "Error: En consulta.",
      });
      setSelectedCompany("DEFAULT");
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
              <Link to={`./${users.id}`}>
                <MdOutlineModeEditOutline color="#75787B" size={25} />
              </Link>
            </TableCell>
          </TableRow>
        );
      });
  }

  return (
    <LayoutSession titleModule="Usuarios">
      {/* Notify */}
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
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "10px",
          pb: 5,
        }}
      >
        <Grid sx={{ pt: 2, pl: 2 }}>
          <Typography variant="subtitles">
            Administracion de Usuarios
          </Typography>
        </Grid>
        <Divider variant="middle " />

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

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  component="th"
                  className="text-center"
                  colSpan={1}
                  align="center"
                >
                  Nombre Completo
                </TableCell>
                <TableCell
                  component="th"
                  className="text-center"
                  colSpan={1}
                  align="center"
                >
                  Correo
                </TableCell>
                <TableCell
                  component="th"
                  className="text-center"
                  colSpan={1}
                  align="center"
                >
                  Empresa
                </TableCell>
                {/* <TableCell align="center">Compras</TableCell>
                                            <TableCell align="center">Ventas</TableCell>
                                            <TableCell align="center">Anular</TableCell>
                                            <TableCell align="center">Administrador</TableCell> */}
                <TableCell
                  component="th"
                  className="text-center"
                  colSpan={1}
                  align="center"
                >
                  Editar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listusuarios.length === 0 ? (
                <TableRow>
                  <TableCell
                    component="th"
                    className="text-center"
                    colSpan={10}
                    align="center"
                  >
                    <MdPersonSearch size={25} />
                    <Typography>No hay usuarios consultados</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                listusuarios
              )}
            </TableBody>
          </Table>
          {/* <TablePaginationComponent children={list} /> */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 100]}
            component="div"
            count={list.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </LayoutSession>
  );
}
