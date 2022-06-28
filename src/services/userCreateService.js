const ENDPOINT = process.env.REACT_APP_BASE_URL;

const userCreateService = async (
    username,
    firstname,
    lastname,
    email,
    password,
    companys
) => {
    let token = window.sessionStorage.getItem("token");

    let resUserCreate = await fetch(`${ENDPOINT}/usuarios/`, {
        method: "POST",
        headers: {
            "x-token": `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            firstname,
            lastname,
            email,
            password,
            companys,
        }),
    });

    let userCreateJson = await resUserCreate.json();
    return userCreateJson;
};

export default userCreateService;
