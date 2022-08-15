import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TripDispatchContext } from "../App";
import { TripStateContext } from "../App";
import Header from "../components/Header";
import Logout from "../utils/Logout";
import ItemList from "../components/ItemList";
import GetTripList from "../utils/GetTripList";
import CheckToken from "../utils/CheckToken";

const Home = () => {
  const { setIsLogin } = useContext(TripDispatchContext);
  const { data, isLogin } = useContext(TripStateContext);
  const navigate = useNavigate();

  const [trip, setTrip] = useState([]);

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
        data
          .sort((a, b) => {
            return b.id - a.id;
          })
          .slice(0, 3)
      );
    });
  }, [isLogin]);

  return (
    <div className="Home">
      <Header
        onClick={() => {
          if (Logout()) {
            setIsLogin(false);
            navigate("/login", { replace: true });
          }
        }}
      ></Header>
      <ItemList
        value={trip}
        onClick={() => navigate("/trip")}
        onClick2={(id) => navigate(`/trip/detail/${id}`)}
      />
    </div>
  );
};

export default Home;
