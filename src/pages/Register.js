import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TripStateContext, TripDispatchContext } from "../App";

import Button from "../components/Button";
import Logo from "../components/Logo";

import CheckToken from "../utils/CheckToken";
import domainUrl from "../utils/Urls"


const Register = () => {
  const { isLogin } = useContext(TripStateContext);
  const { setIsLogin } = useContext(TripDispatchContext);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    CheckToken().then((data) => {
      setIsLogin(data);
      if (isLogin) {
        navigate("/", { replace: true });
      }
    });
  }, []);

  const registerApi = async () => {
    if (password !== password2) {
      alert("비밀번호를 확인해주세요.");
      return;
    }

    const res = fetch(domainUrl + "/user/info/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        fullname: fullname,
      }),
    }).then((response) => {
      if (response.status === 200) {
        alert("회원가입 성공!");
        navigate("/", { replace: true });
        return;
      } else {
        alert("입력정보가 유효하지않습니다.");
        return;
      }
    });
  };

  return (
    <div className="Register">
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

        <div>
          <p>패스워드 확인</p>
          <input
            value={password2}
            type={"password"}
            onChange={(e) => setPassword2(e.target.value)}
          ></input>
        </div>

        <div>
          <p>아이디</p>
          <input
            value={username}
            type={"text"}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>

        <div>
          <p>이름</p>
          <input
            value={fullname}
            type={"text"}
            onChange={(e) => setFullname(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="button-box">
        <Button text={"< 뒤로 가기"} onClick={() => navigate(-1)}></Button>
        <Button
          text={"회원가입하기"}
          type={"positive"}
          onClick={() => registerApi()}
        ></Button>
      </div>
    </div>
  );
};

export default Register;
