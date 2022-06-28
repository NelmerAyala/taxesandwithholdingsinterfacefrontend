const ENDPOINT = process.env.REACT_APP_BASE_URL;

const listVentasService = async (CompanyId) => {
    let token = window.sessionStorage.getItem("token");

    let getVentas = await fetch(`${ENDPOINT}/ventas/${CompanyId}`, {
        method: "GET",
        headers: {
            "x-token": `${token}`,
            "Content-Type": "application/json",
        },
    });

    let ventasJson = await getVentas.json();

    return ventasJson;
};

export default listVentasService;
