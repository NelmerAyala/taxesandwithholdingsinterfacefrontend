const ENDPOINT = "http://localhost:8010/api/v1";

const listPrivilegiosService = async () => {
  let token = window.sessionStorage.getItem("token");

  let getPrivilegios = await fetch(`${ENDPOINT}/privilegios`, {
    method: "GET",
    headers: {
      "x-token": `${token}`,
      "Content-Type": "application/json",
    },
  });

  let PrivilegiosJson = await getPrivilegios.json();
  return PrivilegiosJson;
};

export default listPrivilegiosService;
