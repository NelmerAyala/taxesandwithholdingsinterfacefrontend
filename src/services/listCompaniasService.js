const ENDPOINT = 'http://localhost:8010/api/v1'


const listCompaniasService = async () => {
    let token = window.sessionStorage.getItem('token');
    
    let getCompanias = await fetch(
        `${ENDPOINT}/companias`, 
        {
            method: 'GET',
            headers: {
                'x-token': `${token}`,
                'Content-Type': 'application/json'
            }
        }
    );
    
    let companiasJson = await getCompanias.json();
    return companiasJson;

}

export default listCompaniasService;