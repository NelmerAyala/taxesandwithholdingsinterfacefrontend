const ENDPOINT = process.env.REACT_APP_BASE_URL;

const userUpdateServiceAdmin = async ({
    id,
    email,
    firstname,
    lastname,
    companys,
}) => {
    let token = window.sessionStorage.getItem("token");

    let resUserUpdateAdmin = await fetch(`${ENDPOINT}/usuarios/${id}`, {
        method: "PUT",
        headers: {
            "x-token": `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            firstname,
            lastname,
            companys,
        }),
    });

    let userUpdatedAdminJson = await resUserUpdateAdmin.json();
    return userUpdatedAdminJson;
};

export default userUpdateServiceAdmin;
