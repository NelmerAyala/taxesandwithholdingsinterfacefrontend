const ENDPOINT = 'http://localhost:8010/api/v1'

const listDetallesArchivoService = async (id) => {
    let token = window.sessionStorage.getItem('token');
    
    let listDetallesArchivo = await fetch(
        `${ENDPOINT}/archivos/detalles/${id}`, 
        { 
            method: 'GET',
            headers: {
                'x-token': `${token}`,
                'Content-Type': 'application/json'
            },
        }
    );

    let detallesJson = await listDetallesArchivo.json();
    
    return detallesJson;
}

export default listDetallesArchivoService;