import React from "react";
import { Link } from "react-router-dom";

import { Box, MenuItem, Typography, Grid } from "../consts";

const MenuItemFlotante = ({ ruta, name, children }) => {
  return (
    <Grid item xs={6}>
      <Link className="nav-link-flotante" to={ruta}>
        <MenuItem>
          <Box style={{ width: "100%" }} sx={{ mx: 2 }}>
            <Box sx={{ justifyContent: "center" }}>
              <Box
                sx={{
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                {children}
              </Box>
              <Typography
                sx={{
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                {name}
              </Typography>
            </Box>
          </Box>
        </MenuItem>
      </Link>
    </Grid>
  );
};

export default MenuItemFlotante;
