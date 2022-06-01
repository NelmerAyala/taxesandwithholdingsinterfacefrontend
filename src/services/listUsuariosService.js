const ENDPOINT = "http://localhost:8010/api/v1";

const listUsuariosService = async (CompanyId) => {
  let token = window.sessionStorage.getItem("token");

  let getUsers = await fetch(`${ENDPOINT}/users/company/${CompanyId}`, {
    method: "GET",
    headers: {
      "x-token": `${token}`,
      "Content-Type": "application/json",
    },
  });

  let usuariosJson = await getUsers.json();

  return usuariosJson;
};

export default listUsuariosService;
