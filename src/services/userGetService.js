const ENDPOINT = process.env.REACT_APP_BASE_URL;

const userGetService = async () => {
    let token = window.sessionStorage.getItem("token");

    let userGet = await fetch(`${ENDPOINT}/usuarios/perfil`, {
        method: "GET",
        headers: {
            "x-token": `${token}`,
            "Content-Type": "application/json",
        },
    });

    let user = await userGet.json();
    return user;
};

export default userGetService;
