const ENDPOINT = "http://localhost:8010/api/v1";

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
