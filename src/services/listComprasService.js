const ENDPOINT = process.env.REACT_APP_BASE_URL;

const listComprasService = async (CompanyId) => {
    let token = window.sessionStorage.getItem("token");

    let getCompras = await fetch(`${ENDPOINT}/compras/${CompanyId}`, {
        method: "GET",
        headers: {
            "x-token": `${token}`,
            "Content-Type": "application/json",
        },
    });

    let comprasJson = await getCompras.json();
    return comprasJson;
};

export default listComprasService;
