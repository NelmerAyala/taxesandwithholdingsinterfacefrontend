// Nuevo
import React, { useState, useContext } from "react";
import Context from "../contexts/UserContext";
import { Link, useLocation } from "react-router-dom";

import useUser from "../hooks/useUser";

// Componentes
import MenuItemFlotante from "../components/MenuItemFlotante";
import MenuItemDropdown from "../components/MenuItemDropdown";
import Footer from "../components/Footer";

// Estilos
import LogoIntelix from "../assets/images/logo_intelix.png";
import IsotipoIntelix from "../assets/images/ISOTIPO - INTELIX-01.png";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

// External Components
import {
  Divider,
  Box,
  Grid,
  CssBaseline,
  List,
  Stack,
  Menu,
  IconButton,
  Tooltip,
  Settings,
  Logout,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
  MdPointOfSale,
  MdAddShoppingCart,
  MdInsertDriveFile,
  MdGroups,
  MdGridView,
  MdPersonPin,
  MdOutlineHome,
  MdManageAccounts,
  MdOutlineCorporateFare,
  MenuItem,
} from "../consts";
import PropTypes from "prop-types";
// Constantes
const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const LayoutSession = ({ children, titleModule }, props) => {
  const { user } = useContext(Context);
  //Constantes
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(true);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorElConfiguracion, setAnchorElConfiguracion] = useState(null);
  const openMenuConfiguracion = Boolean(anchorElConfiguracion);
  const handleClickConfiguracion = (event) => {
    setAnchorElConfiguracion(event.currentTarget);
  };
  const handleCloseConfiguracion = () => {
    setAnchorElConfiguracion(null);
  };

  const { logout } = useUser();

  const location = useLocation();

  var locationstr = location.pathname;
  //slice locacion de archivos/ & usuarios/
  var location_archivos_usuarios = locationstr.slice(0, 10);
  //slice locacion de companias/
  var location_companias = locationstr.slice(0, 11);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* <Header /> */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            backgroundColor: "white.main",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <Box
                component="img"
                sx={{
                  width: 40,
                }}
                alt="Logo Intelix"
                src={IsotipoIntelix}
              />
            </IconButton>

            <Grid container justifyContent="flex-end">
              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Tooltip title="Menu">
                    <IconButton
                      onClick={handleClick}
                      sx={{ ml: 1 }}
                      aria-controls={openMenu ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenu ? "true" : undefined}
                    >
                      <MdGridView size={35} />
                    </IconButton>
                  </Tooltip>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={openMenu}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        py: 2,
                        "& .MuiAvatar-root": {
                          width: 20,
                          height: 20,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                      <Grid container>
                        <MenuItemFlotante ruta="/" name="Inicio">
                          <ListItemIcon>
                            {"/" === location.pathname ? (
                              <MdOutlineHome
                                size="40"
                                style={{ color: "#00BFB3" }}
                              />
                            ) : (
                              <MdOutlineHome size="40" />
                            )}
                          </ListItemIcon>
                        </MenuItemFlotante>
                        <MenuItemFlotante ruta="/compras" name="Compras">
                          <ListItemIcon>
                            {"/compras" === location.pathname ? (
                              <MdAddShoppingCart
                                size="40"
                                style={{ color: "#00BFB3" }}
                              />
                            ) : (
                              <MdAddShoppingCart size="40" />
                            )}
                          </ListItemIcon>
                        </MenuItemFlotante>
                      </Grid>
                    </Stack>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={0}>
                      <Grid container>
                        <MenuItemFlotante ruta="/ventas" name="Ventas">
                          <ListItemIcon>
                            {"/ventas" === location.pathname ? (
                              <MdPointOfSale
                                size="40"
                                style={{ color: "#00BFB3" }}
                              />
                            ) : (
                              <MdPointOfSale size="40" />
                            )}
                          </ListItemIcon>
                        </MenuItemFlotante>
                        <MenuItemFlotante ruta="/archivos" name="Archivos">
                          <ListItemIcon>
                            {"/archivos" === location.pathname ||
                            "/archivos/" === location_archivos_usuarios ? (
                              <MdInsertDriveFile
                                size="40"
                                style={{ color: "#00BFB3" }}
                              />
                            ) : (
                              <MdInsertDriveFile size="40" />
                            )}
                          </ListItemIcon>
                        </MenuItemFlotante>
                      </Grid>
                    </Stack>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={0}>
                      <Grid container>
                        {user.es_administrador === true ? (
                          <>
                            <MenuItemFlotante ruta="/usuarios" name="Perfiles">
                              <ListItemIcon>
                                {"/usuarios" === location.pathname ||
                                "/usuarios/" === location_archivos_usuarios ? (
                                  <MdGroups
                                    size="40"
                                    style={{ color: "#00BFB3" }}
                                  />
                                ) : (
                                  <MdGroups size="40" />
                                )}
                              </ListItemIcon>
                            </MenuItemFlotante>
                          </>
                        ) : (
                          <></>
                        )}
                        {user.es_administrador === true ? (
                          <>
                            <MenuItemFlotante
                              ruta="/companias"
                              name="Companias"
                            >
                              <ListItemIcon>
                                {"/companias" === location.pathname ||
                                "/companias/" === location_companias ? (
                                  <MdOutlineCorporateFare
                                    size="40"
                                    style={{ color: "#00BFB3" }}
                                  />
                                ) : (
                                  <MdOutlineCorporateFare size="40" />
                                )}
                              </ListItemIcon>
                            </MenuItemFlotante>
                          </>
                        ) : (
                          <></>
                        )}
                      </Grid>
                    </Stack>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={0}>
                      <Grid container>
                        {user.es_superadministrador === true ? (
                          <>
                            <MenuItemFlotante
                              ruta="/Configuraciones"
                              name="Configuraciones"
                            >
                              <ListItemIcon>
                                {"/Configuraciones" === location.pathname ? (
                                  <MdManageAccounts
                                    size="40"
                                    style={{ color: "#00BFB3" }}
                                  />
                                ) : (
                                  <MdManageAccounts size="40" />
                                )}
                              </ListItemIcon>
                            </MenuItemFlotante>
                          </>
                        ) : (
                          <></>
                        )}
                      </Grid>
                    </Stack>
                  </Menu>

                  <Tooltip title="Configuraciones">
                    <IconButton
                      onClick={handleClickConfiguracion}
                      sx={{ ml: 1 }}
                      aria-controls={
                        openMenuConfiguracion
                          ? "account-menu-configuracion"
                          : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={openMenuConfiguracion ? "true" : undefined}
                    >
                      <MdPersonPin size={35} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorElConfiguracion}
                    id="account-menu-configuracion"
                    open={openMenuConfiguracion}
                    onClose={handleCloseConfiguracion}
                    onClick={handleCloseConfiguracion}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItemDropdown ruta="/perfil" name="Perfil">
                      <Settings size="35" />
                    </MenuItemDropdown>

                    <MenuItem className="nav-link" onClick={logout}>
                      <Box
                        sx={{
                          display: "inline-flex",
                        }}
                      >
                        <Logout sx={{ color: "error.main" }} size="35" />
                        Cerrar Sesión
                      </Box>
                    </MenuItem>
                  </Menu>
                </Box>
              </React.Fragment>
            </Grid>
          </Toolbar>
        </AppBar>

        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            top: "auto",
            bottom: 0,
            borderTop: 1,
            borderColor: "secondary.light",
            pt: 1,
            pl: 2,
            backgroundColor: "white.main",
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Footer />
        </AppBar>

        {/* SideBar */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <DrawerHeader
              sx={{
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                sx={{
                  width: 200,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                alt="Logo Intelix"
                src={LogoIntelix}
                // onClick={handleDrawerClose}
              />
            </DrawerHeader>
            {/* <Box sx={{ overflow: "auto" }}></Box> */}
            <List>
              {/* <ListItemMenu ruta="/perfil" name="Perfil">
              <Settings size="35" />
            </ListItemMenu> */}
              <Link to="/" style={{ textDecoration: "none", color: "#9D9D9C" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    borderBottom: 1,
                    borderColor: "secondary.light",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {"/" === location.pathname ? (
                      <MdOutlineHome size="25" style={{ color: "#00BFB3" }} />
                    ) : (
                      <MdOutlineHome size="25" />
                    )}
                  </ListItemIcon>
                  {"/" === location.pathname ? (
                    <ListItemText
                      primary="Inicio"
                      sx={{ opacity: open ? 1 : 0, color: "primary.main" }}
                    />
                  ) : (
                    <ListItemText
                      primary="Inicio"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  )}
                </ListItemButton>
              </Link>
              <Link
                to="/compras"
                style={{ textDecoration: "none", color: "#9D9D9C" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    borderBottom: 1,
                    borderColor: "secondary.light",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {"/compras" === location.pathname ? (
                      <MdAddShoppingCart
                        size="25"
                        style={{ color: "#00BFB3" }}
                      />
                    ) : (
                      <MdAddShoppingCart size="25" />
                    )}
                  </ListItemIcon>
                  {"/compras" === location.pathname ? (
                    <ListItemText
                      primary="Compras"
                      sx={{ opacity: open ? 1 : 0, color: "primary.main" }}
                    />
                  ) : (
                    <ListItemText
                      primary="Compras"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  )}
                </ListItemButton>
              </Link>
              <Link
                to="/ventas"
                style={{ textDecoration: "none", color: "#9D9D9C" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    borderBottom: 1,
                    borderColor: "secondary.light",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {"/ventas" === location.pathname ? (
                      <MdPointOfSale size="25" style={{ color: "#00BFB3" }} />
                    ) : (
                      <MdPointOfSale size="25" />
                    )}
                  </ListItemIcon>
                  {"/ventas" === location.pathname ? (
                    <ListItemText
                      primary="Ventas"
                      sx={{ opacity: open ? 1 : 0, color: "primary.main" }}
                    />
                  ) : (
                    <ListItemText
                      primary="Ventas"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  )}
                </ListItemButton>
              </Link>
              <Link
                to="/archivos"
                style={{ textDecoration: "none", color: "#9D9D9C" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    borderBottom: 1,
                    borderColor: "secondary.light",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {"/archivos" === location.pathname ||
                    "/archivos/" === location_archivos_usuarios ? (
                      <MdInsertDriveFile
                        size="25"
                        style={{ color: "#00BFB3" }}
                      />
                    ) : (
                      <MdInsertDriveFile size="25" />
                    )}
                  </ListItemIcon>
                  {"/archivos" === location.pathname ||
                  "/archivos/" === location_archivos_usuarios ? (
                    <ListItemText
                      primary="Archivos TXT"
                      sx={{ opacity: open ? 1 : 0, color: "primary.main" }}
                    />
                  ) : (
                    <ListItemText
                      primary="Archivos TXT"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  )}
                </ListItemButton>
              </Link>

              {user.es_administrador === true ? (
                <>
                  <Link
                    to="/usuarios"
                    style={{ textDecoration: "none", color: "#9D9D9C" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        borderBottom: 1,
                        borderColor: "secondary.light",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {"/usuarios" === location.pathname ||
                        "/usuarios/" === location_archivos_usuarios ? (
                          <MdGroups size="25" style={{ color: "#00BFB3" }} />
                        ) : (
                          <MdGroups size="25" />
                        )}
                      </ListItemIcon>
                      {"/usuarios" === location.pathname ||
                      "/usuarios/" === location_archivos_usuarios ? (
                        <ListItemText
                          primary="Perfiles"
                          sx={{ opacity: open ? 1 : 0, color: "primary.main" }}
                        />
                      ) : (
                        <ListItemText
                          primary="Perfiles"
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      )}
                    </ListItemButton>
                  </Link>
                </>
              ) : (
                <></>
              )}

              {user.es_administrador === true ? (
                <>
                  <Link
                    to="/companias"
                    style={{ textDecoration: "none", color: "#9D9D9C" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        borderBottom: 1,
                        borderColor: "secondary.light",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {"/companias" === location.pathname ||
                        "/companias/" === location_companias ? (
                          <MdOutlineCorporateFare
                            size="25"
                            style={{ color: "#00BFB3" }}
                          />
                        ) : (
                          <MdOutlineCorporateFare size="25" />
                        )}
                      </ListItemIcon>
                      {"/companias" === location.pathname ||
                      "/companias/" === location_companias ? (
                        <ListItemText
                          primary="Compañias"
                          sx={{ opacity: open ? 1 : 0, color: "primary.main" }}
                        />
                      ) : (
                        <ListItemText
                          primary="Compañias"
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      )}
                    </ListItemButton>
                  </Link>
                </>
              ) : (
                <></>
              )}

              {user.es_superadministrador === true ? (
                <>
                  <Link
                    to="/Configuraciones"
                    style={{ textDecoration: "none", color: "#9D9D9C" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        borderBottom: 1,
                        borderColor: "secondary.light",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {"/Configuraciones" === location.pathname ? (
                          <MdManageAccounts
                            size="25"
                            style={{ color: "#00BFB3" }}
                          />
                        ) : (
                          <MdManageAccounts size="25" />
                        )}
                      </ListItemIcon>
                      {"/Configuraciones" === location.pathname ? (
                        <ListItemText
                          primary="Configuraciones"
                          sx={{ opacity: open ? 1 : 0, color: "primary.main" }}
                        />
                      ) : (
                        <ListItemText
                          primary="Configuraciones"
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      )}
                    </ListItemButton>
                  </Link>
                </>
              ) : (
                <></>
              )}
            </List>
          </Drawer>
          <Drawer
            // variant="permanent"
            open={open}
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <DrawerHeader
              sx={{
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                sx={{
                  width: 200,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                alt="Logo Intelix"
                src={LogoIntelix}
                // onClick={handleDrawerClose}
              />
            </DrawerHeader>
            {/* <Box sx={{ overflow: "auto" }}></Box> */}
            <List>
              {/* <ListItemMenu ruta="/perfil" name="Perfil">
              <Settings size="35" />
            </ListItemMenu> */}
              <Link to="/" style={{ textDecoration: "none", color: "#9D9D9C" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    borderBottom: 1,
                    borderColor: "secondary.light",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {"/" === location.pathname ? (
                      <MdOutlineHome size="25" style={{ color: "#00BFB3" }} />
                    ) : (
                      <MdOutlineHome size="25" />
                    )}
                  </ListItemIcon>
                  {"/" === location.pathname ? (
                    <ListItemText
                      primary="Inicio"
                      sx={{ opacity: open ? 1 : 0, color: "primary.main" }}
                    />
                  ) : (
                    <ListItemText
                      primary="Inicio"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  )}
                </ListItemButton>
              </Link>
              <Link
                to="/compras"
                style={{ textDecoration: "none", color: "#9D9D9C" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    borderBottom: 1,
                    borderColor: "secondary.light",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {"/compras" === location.pathname ? (
                      <MdAddShoppingCart
                        size="25"
                        style={{ color: "#00BFB3" }}
                      />
                    ) : (
                      <MdAddShoppingCart size="25" />
                    )}
                  </ListItemIcon>
                  {"/compras" === location.pathname ? (
                    <ListItemText
                      primary="Compras"
                      sx={{ opacity: open ? 1 : 0, color: "primary.main" }}
                    />
                  ) : (
                    <ListItemText
                      primary="Compras"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  )}
                </ListItemButton>
              </Link>
              <Link
                to="/ventas"
                style={{ textDecoration: "none", color: "#9D9D9C" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    borderBottom: 1,
                    borderColor: "secondary.light",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {"/ventas" === location.pathname ? (
                      <MdPointOfSale size="25" style={{ color: "#00BFB3" }} />
                    ) : (
                      <MdPointOfSale size="25" />
                    )}
                  </ListItemIcon>
                  {"/ventas" === location.pathname ? (
                    <ListItemText
                      primary="Ventas"
                      sx={{ opacity: open ? 1 : 0, color: "primary.main" }}
                    />
                  ) : (
                    <ListItemText
                      primary="Ventas"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  )}
                </ListItemButton>
              </Link>
              <Link
                to="/archivos"
                style={{ textDecoration: "none", color: "#9D9D9C" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    borderBottom: 1,
                    borderColor: "secondary.light",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {"/archivos" === location.pathname ||
                    "/archivos/" === location_archivos_usuarios ? (
                      <MdInsertDriveFile
                        size="25"
                        style={{ color: "#00BFB3" }}
                      />
                    ) : (
                      <MdInsertDriveFile size="25" />
                    )}
                  </ListItemIcon>
                  {"/archivos" === location.pathname ||
                  "/archivos/" === location_archivos_usuarios ? (
                    <ListItemText
                      primary="Archivos TXT"
                      sx={{ opacity: open ? 1 : 0, color: "primary.main" }}
                    />
                  ) : (
                    <ListItemText
                      primary="Archivos TXT"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  )}
                </ListItemButton>
              </Link>

              {user.es_administrador === true ? (
                <>
                  <Link
                    to="/usuarios"
                    style={{ textDecoration: "none", color: "#9D9D9C" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        borderBottom: 1,
                        borderColor: "secondary.light",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {"/usuarios" === location.pathname ||
                        "/usuarios/" === location_archivos_usuarios ? (
                          <MdGroups size="25" style={{ color: "#00BFB3" }} />
                        ) : (
                          <MdGroups size="25" />
                        )}
                      </ListItemIcon>
                      {"/usuarios" === location.pathname ||
                      "/usuarios/" === location_archivos_usuarios ? (
                        <ListItemText
                          primary="Perfiles"
                          sx={{ opacity: open ? 1 : 0, color: "primary.main" }}
                        />
                      ) : (
                        <ListItemText
                          primary="Perfiles"
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      )}
                    </ListItemButton>
                  </Link>
                </>
              ) : (
                <></>
              )}

              {user.es_administrador === true ? (
                <>
                  <Link
                    to="/companias"
                    style={{ textDecoration: "none", color: "#9D9D9C" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        borderBottom: 1,
                        borderColor: "secondary.light",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {"/companias" === location.pathname ||
                        "/companias/" === location_companias ? (
                          <MdOutlineCorporateFare
                            size="25"
                            style={{ color: "#00BFB3" }}
                          />
                        ) : (
                          <MdOutlineCorporateFare size="25" />
                        )}
                      </ListItemIcon>
                      {"/companias" === location.pathname ||
                      "/companias/" === location_companias ? (
                        <ListItemText
                          primary="Compañias"
                          sx={{ opacity: open ? 1 : 0, color: "primary.main" }}
                        />
                      ) : (
                        <ListItemText
                          primary="Compañias"
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      )}
                    </ListItemButton>
                  </Link>
                </>
              ) : (
                <></>
              )}

              {user.es_superadministrador === true ? (
                <>
                  <Link
                    to="/Configuraciones"
                    style={{ textDecoration: "none", color: "#9D9D9C" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        borderBottom: 1,
                        borderColor: "secondary.light",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {"/Configuraciones" === location.pathname ? (
                          <MdManageAccounts
                            size="25"
                            style={{ color: "#00BFB3" }}
                          />
                        ) : (
                          <MdManageAccounts size="25" />
                        )}
                      </ListItemIcon>
                      {"/Configuraciones" === location.pathname ? (
                        <ListItemText
                          primary="Configuraciones"
                          sx={{ opacity: open ? 1 : 0, color: "primary.main" }}
                        />
                      ) : (
                        <ListItemText
                          primary="Configuraciones"
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      )}
                    </ListItemButton>
                  </Link>
                </>
              ) : (
                <></>
              )}
            </List>
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          {/* <DrawerHeader /> */}
          <Toolbar />
          <Box sx={{ overflow: "auto", backgroundColor: "secondary.main" }}>
            <Stack sx={{ mx: 5, my: 3, color: "white.main" }}>
              <Typography sx={{ color: "white.main" }} variant="titles">
                {titleModule}
              </Typography>
              <Divider variant="medium" />
            </Stack>
          </Box>
          <Box sx={{ m: 4, pb: 5 }}>{children}</Box>
        </Box>
      </Box>
    </>
  );
};

LayoutSession.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
export default LayoutSession;
