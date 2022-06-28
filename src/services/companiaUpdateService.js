const ENDPOINT = process.env.REACT_APP_BASE_URL;

const companiaUpdateService = async ({
  id,
  codigo_company,
  origen,
  ruta_archivo_compra,
  ruta_archivo_venta,
}) => {
  let token = window.sessionStorage.getItem("token");

  let resCompaniaUpdate = await fetch(`${ENDPOINT}/companias/${id}`, {
    method: "PUT",
    headers: {
      "x-token": `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      codigo_company,
      origen,
      ruta_archivo_compra,
      ruta_archivo_venta,
    }),
  });

  let companiaUpdateJson = await resCompaniaUpdate.json();
  return companiaUpdateJson;
};

export default companiaUpdateService;
