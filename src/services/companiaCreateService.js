const ENDPOINT = process.env.REACT_APP_BASE_URL;

const companiaCreateService = async (
  nombre_company,
  codigo_company,
  origen,
  ruta_archivo_compra,
  ruta_archivo_venta
) => {
  let token = window.sessionStorage.getItem("token");

  let resCompaniaCreate = await fetch(`${ENDPOINT}/companias/`, {
    method: "POST",
    headers: {
      "x-token": `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre_company,
      codigo_company,
      origen,
      ruta_archivo_compra,
      ruta_archivo_venta,
    }),
  });

  let companiaCreateJson = await resCompaniaCreate.json();
  return companiaCreateJson;
};

export default companiaCreateService;
