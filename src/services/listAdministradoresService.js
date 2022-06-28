const ENDPOINT = process.env.REACT_APP_BASE_URL;

const listAdministradoresService = async () => {
    let token = window.sessionStorage.getItem("token");

    let getAdministradores = await fetch(
        `${ENDPOINT}/usuarios/administradores/all`,
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
