import React from "react";
import { Link } from "react-router-dom";

import { Box, MenuItem, Typography, Grid } from "../consts";

const MenuItemFlotante = ({ ruta, name, children }) => {
  return (
    <Grid item xs={6}>
      <MenuItem>
        <Link className="nav-link-flotante" to={ruta}>
          <div style={{ width: "100%" }}>
            <Box sx={{ justifyContent: "center" }}>
              <Typography
                sx={{
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                {children}
              </Typography>
              <Typography
                sx={{
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                {name}
              </Typography>
            </Box>
          </div>
        </Link>
      </MenuItem>
    </Grid>
  );
};

export default MenuItemFlotante;
