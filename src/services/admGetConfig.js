const ENDPOINT = "http://localhost:8010/api/v1";

const admGetConfig = async () => {
  let token = window.sessionStorage.getItem("token");

  let resadmConfig = await fetch(`${ENDPOINT}/`, {
    method: "GET",
    headers: {
      "x-token": `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  });

  let configGetJson = await resadmConfig.json();
  return configGetJson;
};

export default admGetConfig;
