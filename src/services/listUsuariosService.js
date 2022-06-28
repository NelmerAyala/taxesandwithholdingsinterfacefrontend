const ENDPOINT = process.env.REACT_APP_BASE_URL;

const listUsuariosService = async (CompanyId) => {
    let token = window.sessionStorage.getItem("token");

    let getUsers = await fetch(`${ENDPOINT}/usuarios/compania/${CompanyId}`, {
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
