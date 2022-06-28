const ENDPOINT = process.env.REACT_APP_BASE_URL;

const userUpdateService = async ({ email, firstname, lastname }) => {
    let token = window.sessionStorage.getItem("token");

    let resUserUpdate = await fetch(`${ENDPOINT}/usuarios/perfil`, {
        method: "PUT",
        headers: {
            "x-token": `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, firstname, lastname }),
    });

    let userUpdatedJson = await resUserUpdate.json();
    return userUpdatedJson;
};

export default userUpdateService;
