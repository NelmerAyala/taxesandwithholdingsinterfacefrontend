const ENDPOINT = "http://localhost:8010/api/v1";

const anularTransaccionService = async ({ ids }, id, status_transaccion) => {
    let token = window.sessionStorage.getItem("token");

    let anularEliminarTransaccion = await fetch(`${ENDPOINT}/archivos/detalles/anular/${id}`, {
        method: "PUT",
        headers: {
            "x-token": `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ids: ids,
            status_transaccion: status_transaccion
        }),
    });

    let transaccionesJson = await anularEliminarTransaccion.json();

    return transaccionesJson;
};

export default anularTransaccionService;
