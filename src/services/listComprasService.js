const ENDPOINT = "http://localhost:8010/api/v1";

const listComprasService = async (CompanyId) => {
  let token = window.sessionStorage.getItem("token");

  let getCompras = await fetch(`${ENDPOINT}/compras/${CompanyId}`, {
    method: "GET",
    headers: {
      "x-token": `${token}`,
      "Content-Type": "application/json",
    },
  });

  let comprasJson = await getCompras.json();
  return comprasJson;
};

export default listComprasService;
