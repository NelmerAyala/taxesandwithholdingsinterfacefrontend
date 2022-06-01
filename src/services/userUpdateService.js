const ENDPOINT = 'http://localhost:8010/api/v1'

const userUpdateService = async ({email, firstname, lastname}) => {
    let token =window.sessionStorage.getItem('token');
    
    let resUserUpdate = await fetch(
        `${ENDPOINT}/users/profile`, 
        { 
            method: 'PUT',
            headers: {
                'x-token': `${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, firstname, lastname})
        }
    );

    let userUpdatedJson = await resUserUpdate.json();
    return userUpdatedJson;

}

export default userUpdateService;