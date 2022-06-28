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

// External Components
import {
  Divider,
  Box,
  Grid,
  CssBaseline,
  Toolbar,
  List,
  Stack,
  Menu,
  IconButton,
  Tooltip,
  Settings,
  Logout,
  ListItemIcon,
  MuiDrawer,
  MuiAppBar,
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

// Constantes
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const LayoutSession = ({ children, titleModule }) => {
  const { user } = useContext(Context);
  //Constantes
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
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
  // const [user, serUser] = useState([]);

  // useEffect(() => {
  //   const res = async () => {
  //     const resp = await userGet();
  //     serUser(resp);
  //   };
  //   res();
  // }, [userGet]);

  const location = useLocation();
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* <Header /> */}
        <AppBar
          position="fixed"
          open={open}
          elevation={0}
          sx={{ backgroundColor: "white.main" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
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

            <React.Fragment>
              <div style={{ width: "100%" }}>
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
                            {"/archivos" === location.pathname ? (
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
                                {"/usuarios" === location.pathname ? (
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
                                {"/companias" === location.pathname ? (
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
              </div>
            </React.Fragment>
          </Toolbar>
        </AppBar>

        <AppBar
          position="fixed"
          open={open}
          elevation={0}
          sx={{
            top: "auto",
            bottom: 0,
            borderTop: 1,
            borderColor: "secondary.light",
            pt: 1,
            pl: 2,
            backgroundColor: "white.main",
          }}
        >
          <Footer />
        </AppBar>

        {/* SideBar */}
        <Drawer variant="permanent" open={open}>
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
              onClick={handleDrawerClose}
            />
          </DrawerHeader>
          <Box sx={{ overflow: "auto" }}></Box>
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
                    <MdAddShoppingCart size="25" style={{ color: "#00BFB3" }} />
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
                  {"/archivos" === location.pathname ? (
                    <MdInsertDriveFile size="25" style={{ color: "#00BFB3" }} />
                  ) : (
                    <MdInsertDriveFile size="25" />
                  )}
                </ListItemIcon>
                {"/archivos" === location.pathname ? (
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
                      {"/usuarios" === location.pathname ? (
                        <MdGroups size="25" style={{ color: "#00BFB3" }} />
                      ) : (
                        <MdGroups size="25" />
                      )}
                    </ListItemIcon>
                    {"/usuarios" === location.pathname ? (
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
                      {"/companias" === location.pathname ? (
                        <MdOutlineCorporateFare
                          size="25"
                          style={{ color: "#00BFB3" }}
                        />
                      ) : (
                        <MdOutlineCorporateFare size="25" />
                      )}
                    </ListItemIcon>
                    {"/companias" === location.pathname ? (
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

        <Box component="main" sx={{ flexGrow: 1 }}>
          <DrawerHeader />
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

export default LayoutSession;
