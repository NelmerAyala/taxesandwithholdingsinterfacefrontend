import React from "react";

import InSessionMenu from "./InSessionMenu";
import useUser from "../hooks/useUser";
import "../assets/css/App.css";
import AppBar from "@mui/material/AppBar";

function Navigation() {
  const { isLogged } = useUser();

  return (
    <AppBar position="static">{isLogged ? <InSessionMenu /> : <></>}</AppBar>
  );
}

export default Navigation;
