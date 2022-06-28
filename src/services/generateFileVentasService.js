const ENDPOINT = process.env.REACT_APP_BASE_URL;
const status_venta = "0";

const generateFileVentasService = async ({ ids }, selectedCompany) => {
    let token = window.sessionStorage.getItem("token");

    let generateFileVentas = await fetch(`${ENDPOINT}/ventas/generateTxt`, {
        method: "POST",
        headers: {
            "x-token": `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ids: ids,
            status_venta: status_venta,
            CompanyId: selectedCompany,
        }),
    });

    let ventasJson = await generateFileVentas.json();

    return ventasJson;
};

export default generateFileVentasService;
