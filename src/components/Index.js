import React, { useState, useEffect } from "react";

import useUser from "../hooks/useUser";
import LayoutSession from "../layout/LayoutSession";

import { Box, Typography, Paper } from "../consts";

function Index() {
  const { userGet } = useUser();
  const [user, serUser] = useState([]);

  useEffect(() => {
    const res = async () => {
      const resp = await userGet();
      serUser(resp.user);
    };
    res();
  }, [userGet]);

  return (
    <LayoutSession titleModule="Inicio">
      <Box
        sx={{
          display: "block",
          mt: 2,
          ml: 6,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 3,
          }}
        >
          <Typography sx={{ color: "primary.main", pb: 2 }} variant="h4">
            Hola, {user.firstname} {user.lastname}
          </Typography>
          <Typography sx={{ color: "secondary.main" }}>
            Bienvenido a <b>Gestión de Impuestos y Retenciones</b>, aplicación
            diseñada para - Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Donec aliquet, augue eget efficitur placerat, velit sem
            ultrices eros, quis scelerisque augue augue non odio.
          </Typography>
        </Paper>
      </Box>
    </LayoutSession>
  );
}

export default Index;
