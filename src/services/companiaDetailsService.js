const ENDPOINT = process.env.REACT_APP_BASE_URL;

const companiaDetailsService = async (id) => {
  let token = window.sessionStorage.getItem("token");

  let listDetallesCompania = await fetch(`${ENDPOINT}/companias/${id}`, {
    method: "GET",
    headers: {
      "x-token": `${token}`,
      "Content-Type": "application/json",
    },
  });

  let detallesJson = await listDetallesCompania.json();

  return detallesJson;
};

export default companiaDetailsService;
