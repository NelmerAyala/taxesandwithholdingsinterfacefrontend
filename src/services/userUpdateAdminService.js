const ENDPOINT = "http://localhost:8010/api/v1";

const userUpdateServiceAdmin = async ({
  id,
  email,
  firstname,
  lastname,
  companys,
  privilegio,
}) => {
  let token = window.sessionStorage.getItem("token");

  let resUserUpdateAdmin = await fetch(`${ENDPOINT}/users/${id}`, {
    method: "PUT",
    headers: {
      "x-token": `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      firstname,
      lastname,
      companys: companys,
      privilegio: privilegio,
    }),
  });

  let userUpdatedAdminJson = await resUserUpdateAdmin.json();
  return userUpdatedAdminJson;
};

export default userUpdateServiceAdmin;
