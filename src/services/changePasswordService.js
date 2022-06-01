const ENDPOINT = 'http://localhost:8010/api/v1'

const changePasswordService = async ({password,passwordNew}) => {
    let token =window.sessionStorage.getItem('token');
    
    let resPasswordUpdate = await fetch(
        `${ENDPOINT}/users/profile/password`, 
        { 
            method: 'PUT',
            headers: {
                'x-token': `${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({password, passwordNew})
        }
    );

    let passwordUpdate = await resPasswordUpdate.json();
    return passwordUpdate;
    
}

export default changePasswordService;