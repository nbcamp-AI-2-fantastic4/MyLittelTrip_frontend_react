import { useRef, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TripDispatchContext } from "../App";

import Header from "../components/Header";
import Button from "../components/Button";
import TripCourseItem from "../components/TripCourseItem";

import Logout from "../utils/Logout";
import parsingApi, { scheduleApi, tripSaveApi } from "../utils/TripFunc";

const TripNew = () => {
  const navigate = useNavigate();

  const { setIsLogin } = useContext(TripDispatchContext);
  const [data, setData] = useState([]);
  const [place, setPlace] = useState("");
  const [result, setResult] = useState([]);
  const [placeList, setPlaceList] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="TripNew">
      <Header
        onClick={() => {
          if (Logout()) {
            setIsLogin(false);
            navigate("/login", { replace: true });
          }
        }}
      ></Header>
      <div className="input-body">
        <div className="input-box">
          <h4>장소 검색</h4>
          <p>
            네이버 지도에서 입력한 단어로 최상단의 장소를 검색합니다. 첫번째
            장소는 출발지를 입력해주세요.
          </p>
          <input
            value={place}
            type={"text"}
            onChange={(e) => setPlace(e.target.value)}
          ></input>
          <Button
            text={"검색"}
            onClick={() => {
              parsingApi(place).then((res) => {
                setData([...data, res]);
                setPlace("");
              });
            }}
          ></Button>
        </div>
        <div className="place-box">
          <h4>여행할 장소</h4>
          <div className="button-box">
            <Button
              text={"초기화"}
              onClick={() => {
                setData([]);
              }}
            ></Button>
            <Button
              text={"결과보기"}
              type={"positive"}
              onClick={() => {
                const placeList = data.map((it) => it.word);
                scheduleApi(placeList).then((res) => {
                  setResult(res.result);
                  setPlaceList(res.places_info);
                });
              }}
            ></Button>
          </div>
          {data.map((it) => (
            <div key={it.id} className="PlaceBox">
              <div>
                <h4>{it.name}</h4>
                <Button
                  text={"삭제"}
                  type={"nagetive"}
                  onClick={() => {
                    setData(data.filter((it2) => it2.id !== it.id));
                  }}
                ></Button>
              </div>
              <p>주소 : {it.address}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="result-body">
        <div className="line"></div>
        <div className="result-box">
          <div className="title-box">
            <h4>결과 보기</h4>
            <Button
              text={"저장하기"}
              type={"positive"}
              onClick={() => {
                tripSaveApi({ result, title, content }).then((res) => {
                  alert(res.message);
                  navigate("/trip", { replace: true });
                });
              }}
            ></Button>
          </div>
          <div className="save-box">
            <div className="content-box">
              <h4>제목</h4>
              <input
                value={title}
                type={"text"}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              <h4>내용</h4>
              <textarea
                value={content}
                type={"text"}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div>
              {result.map((it, idx) => (
                <TripCourseItem key={idx} value={it}></TripCourseItem>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripNew;
