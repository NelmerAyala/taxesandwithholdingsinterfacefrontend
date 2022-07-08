// Nuevo
import React, { useState, useEffect } from "react";

// Hooks
import useUser from "../hooks/useUser";

// Layout
import LayoutSession from "../layout/LayoutSession";

// Importar Imagenes
import retenciones from "../assets/images/Tax-Transparent.png";

import {
  Paper,
  Divider,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "../consts";

function Index() {
  const { userGet } = useUser();
  const [body, setBody] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const descriptionElementRef = React.useRef(null);

  // Abrir Scroll
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  // Cerrar Scroll
  const handleClose = () => {
    setOpen(false);
  };

  // Consulta User en sesion
  useEffect(() => {
    const res = async () => {
      const resp = await userGet();
      setBody(resp.body.user);
    };
    res();
  }, [userGet]);

  return (
    <LayoutSession titleModule="Inicio">
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "10px",
        }}
      >
        <Card>
          <CardMedia
            component="img"
            height="150"
            alt="Retencion_Impuesto"
            src={retenciones}
          />
          <Divider />
          <CardContent>
            <Typography sx={{ color: "primary.main", pb: 2 }} variant="h4">
              Bienvenido, {body.firstname} {body.lastname}
            </Typography>
            <Typography sx={{ color: "secondary.main" }}>
              <b>Acerca de Gestión de Impuestos y Retenciones</b>
            </Typography>
            <CardActions>
              <Grid
                container
                direction="row"
                justifyContent="flex-END"
                alignItems="flex-start"
              >
                <Button
                  sx={{
                    m: 1,
                    color: "secondary.main",
                    borderRadius: "1rem",
                  }}
                  onClick={handleClickOpen("paper")}
                  size="small"
                >
                  Leer mas...
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  scroll={scroll}
                  aria-labelledby="scroll-dialog-title"
                  aria-describedby="scroll-dialog-description"
                >
                  <DialogTitle id="scroll-dialog-title">
                    Gestión de Impuestos y Retenciones
                  </DialogTitle>
                  <DialogContent dividers={scroll === "paper"}>
                    <DialogContentText
                      id="scroll-dialog-description"
                      ref={descriptionElementRef}
                      tabIndex={-1}
                    >
                      Aplicación diseñada para la gestión de transacciones de
                      compras y ventas que sirve de insumo para la generación de
                      retenciones en el Sistema Galac.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Compartir</Button>
                    <Button onClick={handleClose}>Cerrar</Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </CardActions>
          </CardContent>
        </Card>
        {/* <Typography sx={{ color: "primary.main", pb: 2 }} variant="h4">
            Bienvenido, {user.firstname} {user.lastname}
          </Typography>
          <Typography sx={{ color: "secondary.main" }}>
            Bienvenido a <b>Gestión de Impuestos y Retenciones</b>, aplicación
            diseñada para - Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Donec aliquet, augue eget efficitur placerat, velit sem
            ultrices eros, quis scelerisque augue augue non odio.
          </Typography> */}
      </Paper>
    </LayoutSession>
  );
}

export default Index;
