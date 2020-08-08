const ROOT_URL = "http://localhost:5000";

export default class APIService {
  static startDeploy = async (deploySettings) => {
    console.log(deploySettings);
    return fetch(`${ROOT_URL}/clone/`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify(deploySettings),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  static getAllSites = async (walletAddress) => {
    console.log(walletAddress);
    return fetch(`${ROOT_URL}/getData/`, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify({ address: walletAddress }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };
}
