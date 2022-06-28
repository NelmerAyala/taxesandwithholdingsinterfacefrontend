const ENDPOINT = process.env.REACT_APP_BASE_URL;

const configuracionesService = async () => {
    let token = window.sessionStorage.getItem("token");

    let getConfiguraciones = await fetch(`${ENDPOINT}/configuraciones`, {
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
