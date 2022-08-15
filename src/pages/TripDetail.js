import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { TripStateContext, TripDispatchContext } from "../App";
import Header from "../components/Header";

import CheckToken from "../utils/CheckToken";
import Logout from "../utils/Logout";

const TripCourseDetail = ({ value }) => {
  return <div className="TripCourseDetail">{value}</div>;
};

const TripDetail = () => {
  const navigate = useNavigate();
  const { isLogin } = useContext(TripStateContext);
  const { setIsLogin } = useContext(TripDispatchContext);

  const [data, setData] = useState();
  const { id } = useParams();

  const tripList = JSON.parse(localStorage.getItem("trip", "[]"));

  const targetTrip = tripList.find((it) => parseInt(it.id) === parseInt(id));

  useEffect(() => {
    CheckToken().then((data) => {
      setIsLogin(data);
      if (!isLogin) {
        navigate("/login", { replace: true });
        return;
      }
    });
  }, []);

  return (
    <div className="TripDetail">
      <Header
        onClick={() => {
          if (Logout()) {
            setIsLogin(false);
            navigate("/login", { replace: true });
          }
        }}
      ></Header>
      <div className="detail-box">
        <p className="detail-id">No. {targetTrip.id}</p>
        <p className="detail-title">{targetTrip.title}</p>
        <p className="detail-date">{targetTrip.created_at.substring(0, 10)}</p>
        <p className="detail-user">작성자 : {targetTrip.user}</p>

        <p className="detail-content">{targetTrip.content}</p>
        {targetTrip.tripcourse.map((it, idx) => (
          <TripCourseDetail key={idx} value={it}></TripCourseDetail>
        ))}
      </div>
    </div>
  );
};

export default TripDetail;
