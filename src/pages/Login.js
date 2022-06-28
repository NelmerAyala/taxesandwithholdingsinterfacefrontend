// Nuevo
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Hooks
import useUser from "../hooks/useUser";

// Estilos
import portadaLogin from "../assets/images/portada.jpg";
import LogoIntelix from "../assets/images/logo_intelix.png";
import "./Login.css";

// Notificaciones
import { ToastContainer } from "react-toastify";

// External Components
import {
  Button,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Divider,
  Container,
  IconButton,
  InputLabel,
  OutlinedInput,
  FormControl,
  Visibility,
  Tooltip,
  VisibilityOff,
  InputAdornment,
} from "../consts";

export default function Login() {
  // Constantes
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLogged, isLoggedLoading, hasLoginError } = useUser();
  const [shown, setShown] = React.useState(false);
  const switchShown = () => setShown(!shown);

  // Navigate
  let history = useNavigate();

  // Consulta Login
  useEffect(() => {
    if (isLogged) history("/");
  }, [isLogged, history]);

  //Submit User
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  // Mostrar/Ocultar contraseña
  const onChange = ({ currentTarget }) => setPassword(currentTarget.value);

  return (
    <>
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

      <Container component="main" maxWidth="md">
        <Typography
          align="center"
          sx={{ color: "secondary.main", pt: 10 }}
          variant="h4"
        >
          Gestión de Impuestos y Retenciones
        </Typography>
        <Divider sx={{ backgroundColor: "primary.main", height: "2px" }} />
        <Box
          sx={{
            pt: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              overflow: "hidden",
              borderRadius: "10px",
            }}
          >
            <Grid container component="main">
              <Grid
                item
                xs={5}
                sm={5}
                md={5}
                sx={{
                  backgroundImage: "url(" + portadaLogin + ")",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: (t) =>
                    t.palette.mode === "light"
                      ? t.palette.grey[50]
                      : t.palette.grey[900],
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <Grid
                item
                xs={7}
                sm={7}
                md={7}
                component={Paper}
                elevation={6}
                square
              >
                <Box
                  sx={{
                    // my: 15,
                    mx: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      width: 350,
                      maxHeight: { xs: 233, md: 167 },
                      maxWidth: { xs: 350, md: 250 },
                    }}
                    alt="Logo Intelix"
                    src={LogoIntelix}
                  />
                  <Typography
                    variant="h4"
                    sx={{
                      mt: 5,
                    }}
                  >
                    Inicio de sesión
                  </Typography>
                  {isLoggedLoading && (
                    <Box
                      sx={{
                        my: 15,
                      }}
                    >
                      <strong className="text-primary">
                        Verificando Credenciales...
                      </strong>
                    </Box>
                  )}
                  {!isLoggedLoading && (
                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      sx={{ mt: 1, pb: 3 }}
                    >
                      <TextField
                        size="small"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Usuario"
                        autoComplete="off"
                        autoFocus
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        inputProps={{ style: { textTransform: "uppercase" } }}
                      />
                      <FormControl
                        required
                        fullWidth
                        size="small"
                        margin="normal"
                      >
                        <InputLabel>Contraseña</InputLabel>
                        <OutlinedInput
                          label="Contraseña"
                          onChange={onChange}
                          type={shown ? "text" : "password"}
                          value={password}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton onClick={switchShown}>
                                {shown ? (
                                  <Tooltip title="Ocultar contraseña">
                                    <span>
                                      <VisibilityOff />
                                    </span>
                                  </Tooltip>
                                ) : (
                                  <Tooltip title="Mostrar contraseña">
                                    <span>
                                      <Visibility />
                                    </span>
                                  </Tooltip>
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                          mt: 3,
                          mb: 2,
                          borderRadius: "1rem",
                          color: "white.main",
                        }}
                      >
                        Ingresar
                      </Button>
                      {/* <Grid container sx={{ mt: 5 }}>
                      <Grid item xs>
                      </Grid>
                    </Grid> */}
                    </Box>
                  )}
                  {hasLoginError && (
                    <Box
                      sx={{
                        pb: 2,
                      }}
                    >
                      <Divider />
                      <strong className="text-primary">
                        Usuario o contraseña invalida
                      </strong>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
