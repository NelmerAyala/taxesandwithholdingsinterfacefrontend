const ENDPOINT = 'http://localhost:8010/api/v1'


const userGetService = async () => {
    let token = window.sessionStorage.getItem('token');

    let userGet = await fetch(
        `${ENDPOINT}/users/profile`,
        {
            method: 'GET',
            headers: {
                'x-token': `${token}`,
                'Content-Type': 'application/json'
            }
        }
    );

    let user = await userGet.json();
    return user;
}

export default userGetService;