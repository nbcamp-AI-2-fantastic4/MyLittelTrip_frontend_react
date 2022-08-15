import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TripStateContext, TripDispatchContext } from "../App";
import Header from "../components/Header";
import TripItem from "../components/TripItem";

import Logout from "../utils/Logout";
import CheckToken from "../utils/CheckToken";
import GetTripList from "../utils/GetTripList";
import Button from "../components/Button";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const Trip = () => {
  const { isLogin } = useContext(TripStateContext);
  const { setIsLogin } = useContext(TripDispatchContext);
  const navigate = useNavigate();

  const [trip, setTrip] = useState([]);
  const [sortType, setSortType] = useState("latest");

  useEffect(() => {
    CheckToken().then((data) => {
      setIsLogin(data);
      if (!isLogin) {
        navigate("/login", { replace: true });
        return;
      }
    });

    GetTripList().then((data) => {
      localStorage.setItem("trip", JSON.stringify(data));
      setTrip(
        data.sort((a, b) => {
          return b.id - a.id;
        })
      );
    });
  }, []);

  const getSortedTripList = () => {
    const copyList = JSON.parse(JSON.stringify(trip));
    const sortList = copyList.sort((a, b) => {
      if (sortType === "latest") {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    });

    return sortList;
  };

  return (
    <div className="Trip">
      <Header
        onClick={() => {
          if (Logout()) {
            setIsLogin(false);
            navigate("/login", { replace: true });
          }
        }}
      ></Header>
      <div className="menu-box">
        <ControlMenu
          value={sortType}
          onChange={setSortType}
          optionList={sortOptionList}
        ></ControlMenu>
        <Button
          text={"새로 만들기"}
          type={"positive"}
          onClick={() => navigate("/trip/new")}
        ></Button>
      </div>
      <div className="list-box">
        {getSortedTripList().map((it) => (
          <TripItem
            key={it.id}
            value={it}
            onClick={() => navigate(`/trip/detail/${it.id}`)}
          ></TripItem>
        ))}
      </div>
    </div>
  );
};

export default Trip;
