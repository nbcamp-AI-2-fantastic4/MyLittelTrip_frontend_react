import domainUrl from "./Urls";

const GetTripList = async () => {
  const access = localStorage.getItem("access", "");

  let list = [];
  const res = await fetch(domainUrl + "/trip/", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + access,
    },
  }).then((response) => {
    if (response.status === 200) {
      list = response.json();
    }
  });

  return list;
};

export default GetTripList;
