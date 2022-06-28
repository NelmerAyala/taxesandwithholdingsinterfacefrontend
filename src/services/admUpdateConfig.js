const ENDPOINT = process.env.REACT_APP_BASE_URL;

const admUpdateConfig = async () => {
    let token = window.sessionStorage.getItem("token");

    let resconfigAdm = await fetch(`${ENDPOINT}/`, {
        method: "PUT",
        headers: {
            "x-token": `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(),
    });

    let configUpdatedJson = await resconfigAdm.json();
    return configUpdatedJson;
};

export default admUpdateConfig;
