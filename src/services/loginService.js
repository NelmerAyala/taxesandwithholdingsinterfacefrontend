const ENDPOINT = process.env.REACT_APP_BASE_URL;

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
