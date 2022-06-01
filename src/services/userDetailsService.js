const ENDPOINT = "http://localhost:8010/api/v1";

const listDetalleUserService = async (id) => {
  let token = window.sessionStorage.getItem("token");

  let listDetallesUsuario = await fetch(`${ENDPOINT}/users/${id}`, {
    method: "GET",
    headers: {
      "x-token": `${token}`,
      "Content-Type": "application/json",
    },
  });

  let detallesJson = await listDetallesUsuario.json();

  return detallesJson;
};

export default listDetalleUserService;
