import domainUrl from "./Urls";

const CheckToken = async () => {
  const access = localStorage.getItem("access", "");
  let bool = false;
  if (access) {
    const res = await fetch(domainUrl + "/user/info/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + access,
      },
    }).then((response) => {
      if (response.status === 200) {
        bool = true;
      }
    });
  }
  return bool;
};

export default CheckToken;
