const ENDPOINT = process.env.REACT_APP_BASE_URL;

const listDetalleUserService = async (id) => {
    let token = window.sessionStorage.getItem("token");

    let listDetallesUsuario = await fetch(`${ENDPOINT}/usuarios/${id}`, {
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
