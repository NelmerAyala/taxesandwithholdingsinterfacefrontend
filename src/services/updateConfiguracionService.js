const ENDPOINT = process.env.REACT_APP_BASE_URL;

const updateConfiguracionService = async (
  user,
  tipoArchivoCcompras,
  tipoArchivoVentas,
  codigoPrivilegioAdmin,
  codigoPrivilegioCompras,
  codigoPrivilegioVentas,
  hostDb,
  portDb,
  nameDb,
  usernameDb,
  passwordUsernameDb,
  rutaPrincipalEndpoints
) => {
  let token = window.sessionStorage.getItem("token");

  let updateConfiguraciones = await fetch(
    `${ENDPOINT}/configuraciones/actualizar`,
    {
      method: "PUT",
      headers: {
        "x-token": `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserId: user,
        tipo_archivo_compras: tipoArchivoCcompras,
        tipo_archivo_ventas: tipoArchivoVentas,
        codigo_privilegio_admin: codigoPrivilegioAdmin,
        codigo_privilegio_compras: codigoPrivilegioCompras,
        codigo_privilegio_ventas: codigoPrivilegioVentas,
        host_db: hostDb,
        port_db: portDb,
        name_db: nameDb,
        username_db: usernameDb,
        password_username_db: passwordUsernameDb,
        ruta_principal_endpoints: rutaPrincipalEndpoints,
      }),
    }
  );

  let configuracionesJson = await updateConfiguraciones.json();

  return configuracionesJson;
};

export default updateConfiguracionService;
