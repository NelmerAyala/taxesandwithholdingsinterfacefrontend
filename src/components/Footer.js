import React from "react";
import "../assets/css/App.css";

import { Box, Grid, Typography } from "../consts";

function Footer() {
  return (
    <Box>
      <Grid>
        <Typography sx={{ color: "secondary.light" }} variant="caption">
          Desarrollado por Intelix Synergy © 2022. Version 1.0
        </Typography>
      </Grid>
    </Box>
  );
}

export default Footer;
