// const ENDPOINT = process.env.REACT_APP_BASE_URL;
const ENDPOINT =
    "https://xddr3e2ar9.execute-api.us-east-1.amazonaws.com/api-app-gir";

const loginService = async ({ username, password }) => {
    let resLogin = await fetch(`${ENDPOINT}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    let userData = await resLogin.json();
    return userData;
};

export default loginService;
