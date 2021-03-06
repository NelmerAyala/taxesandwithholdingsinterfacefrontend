const ENDPOINT = process.env.REACT_APP_BASE_URL;

const changePasswordService = async ({ password, passwordNew }) => {
  let token = window.sessionStorage.getItem("token");

  let resPasswordUpdate = await fetch(
    `${ENDPOINT}/usuarios/perfil/contrasena`,
    {
      method: "PUT",
      headers: {
        "x-token": `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, passwordNew }),
    }
  );

  let passwordUpdate = await resPasswordUpdate.json();
  return passwordUpdate;
};

export default changePasswordService;
