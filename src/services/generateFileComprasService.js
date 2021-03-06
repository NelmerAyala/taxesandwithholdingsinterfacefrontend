const ENDPOINT = process.env.REACT_APP_BASE_URL;

const status_compra = "0";

const generateFileComprasService = async ({ ids }, selectedCompany) => {
    let token = window.sessionStorage.getItem("token");

    let generateFileCompras = await fetch(`${ENDPOINT}/compras/generartxt`, {
        method: "POST",
        headers: {
            "x-token": `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ids: ids,
            status_compra: status_compra,
            CompanyId: selectedCompany,
        }),
    });

    let comprasJson = await generateFileCompras.json();

    return comprasJson;
};

export default generateFileComprasService;
