const ENDPOINT = "http://localhost:8010/api/v1";

const listAdministradoresService = async () => {
  let token = window.sessionStorage.getItem("token");

  let getAdministradores = await fetch(
    `${ENDPOINT}/users/administradores/all`,
    {
      method: "GET",
      headers: {
        "x-token": `${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  let administradoresJson = await getAdministradores.json();
  return administradoresJson;
};

export default listAdministradoresService;
