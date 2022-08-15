import domainUrl from "./Urls";

const parsingApi = async (word) => {
  const res = await fetch(domainUrl + "/recommend/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      type: 0,
      word: word,
    }),
  })
    .then((response) => response.json())
    .then((data) => data);

  return res;
};

const scheduleApi = async (placeList) => {
  const res = await fetch(domainUrl + "/recommend/schedule/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      places: placeList,
    }),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((e) => alert(`여행 일정을 만들 수 없습니다. 오류코드 ${e}`));

  return res;
};

const tripSaveApi = async ({ result, title, content }) => {
  const access = localStorage.getItem("access", "");
  if (!access) {
    return "로그인을 다시해주세요.";
  }

  if (!result || result.length < 1) {
    return "여행 일정을 확인할 수 없습니다.";
  }

  const data = {
    title: title,
    content: content,
    tripcourse: result,
  };

  const res = await fetch(domainUrl + "/trip/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + access,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((e) => alert(`여행 일정을 만들 수 없습니다. 오류코드 ${e}`));

  return res;
};

export { scheduleApi, tripSaveApi };
export default parsingApi;
