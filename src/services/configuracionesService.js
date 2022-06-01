const ENDPOINT = "http://localhost:8010/api/v1";

const configuracionesService = async () => {
  let token = window.sessionStorage.getItem("token");

  let getConfiguraciones = await fetch(`${ENDPOINT}/configuracion`, {
    method: "GET",
    headers: {
      "x-token": `${token}`,
      "Content-Type": "application/json",
    },
  });

  let configuracionesJson = await getConfiguraciones.json();
  return configuracionesJson;
};

export default configuracionesService;
