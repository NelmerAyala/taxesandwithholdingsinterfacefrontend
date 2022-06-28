const ENDPOINT = process.env.REACT_APP_BASE_URL;

const listPrivilegiosService = async () => {
    let token = window.sessionStorage.getItem("token");

    let getPrivilegios = await fetch(`${ENDPOINT}/privilegios`, {
        method: "GET",
        headers: {
            "x-token": `${token}`,
            "Content-Type": "application/json",
        },
    });

    let PrivilegiosJson = await getPrivilegios.json();
    return PrivilegiosJson;
};

export default listPrivilegiosService;
