import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TripStateContext, TripDispatchContext } from "../App";

import Button from "../components/Button";
import Logo from "../components/Logo";

import CheckToken from "../utils/CheckToken";
import domainUrl from "../utils/Urls";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLogin } = useContext(TripStateContext);
  const { setIsLogin } = useContext(TripDispatchContext);

  useEffect(() => {
    CheckToken().then((data) => {
      setIsLogin(data);
      if (isLogin) {
        navigate("/", { replace: true });
      }
    });
  }, []);

  const navigate = useNavigate();

  const loginApi = async () => {
    const res = await fetch(domainUrl + "/user/token/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        alert("로그인 정보를 확인해주세요.");
        return;
      }
    });

    if (res) {
      localStorage.setItem("access", res["access"]);
      localStorage.setItem("refresh", res["refresh"]);
      setIsLogin(true);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="Login">
      <Logo></Logo>
      <div className="input-box">
        <div>
          <p>이메일</p>
          <input
            value={email}
            type={"text"}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <p>패스워드</p>
          <input
            value={password}
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="button-box">
        <Button
          text={"로그인하기"}
          type={"positive"}
          onClick={() => loginApi()}
        ></Button>
        <Button
          text={"회원가입하기"}
          onClick={() => navigate("/register")}
        ></Button>
      </div>
    </div>
  );
};

export default Login;
