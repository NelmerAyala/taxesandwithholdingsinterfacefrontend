const ENDPOINT = "http://localhost:8010/api/v1";

const userCreateService = async (
  username,
  firstname,
  lastname,
  email,
  password,
  dictCompaniasPrivilegios
) => {
  let token = window.sessionStorage.getItem("token");

  let resUserCreate = await fetch(`${ENDPOINT}/users/`, {
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
      companys: dictCompaniasPrivilegios.companys,
    }),
  });

  let userCreateJson = await resUserCreate.json();
  return userCreateJson;
};

export default userCreateService;
