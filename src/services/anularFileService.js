const ENDPOINT = 'http://localhost:8010/api/v1'
const status_transaccion = '1'

const anularFileService = async (id) => {
    let token = window.sessionStorage.getItem('token');

    let anularFile = await fetch(
        `${ENDPOINT}/archivos/anular/${id}`, 
        { 
            method: 'PUT',
            headers: {
                'x-token': `${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'id': id, 'status_transaccion': status_transaccion})
        }
    );

    let archivosJson = await anularFile.json();
    
    return archivosJson;
}

export default anularFileService;