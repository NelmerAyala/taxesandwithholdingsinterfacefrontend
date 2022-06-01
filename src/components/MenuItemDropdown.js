import React from "react";
import { Link } from "react-router-dom";

import { Box, MenuItem, ListItemIcon } from "../consts";

const MenuItemDropdown = ({ ruta, name, children }) => {
  return (
    <Link className="nav-link" to={ruta}>
      <MenuItem>
        <Box
          sx={{
            display: "inline-flex",
          }}
        >
          <ListItemIcon>{children}</ListItemIcon>
          {name}
        </Box>
      </MenuItem>
    </Link>
  );
};

export default MenuItemDropdown;
