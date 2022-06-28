const ENDPOINT = process.env.REACT_APP_BASE_URL;

const listArchivosService = async (CompanyId) => {
    let token = window.sessionStorage.getItem("token");

    let getArchivos = await fetch(`${ENDPOINT}/archivos/${CompanyId}`, {
        method: "GET",
        headers: {
            "x-token": `${token}`,
            "Content-Type": "application/json",
        },
    });

    let archivosJson = await getArchivos.json();

    return archivosJson;
};

export default listArchivosService;
