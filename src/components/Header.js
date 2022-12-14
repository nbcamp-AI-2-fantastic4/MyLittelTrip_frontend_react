import Button from "./Button";

const Header = ({ onClick }) => {
  return (
    <div className="Header">
      <div className="logo-box">
        <img src={process.env.PUBLIC_URL + `/logo.png`} />
      </div>
      <div className="title-box">MyLittleTrip</div>
      <div className="user-box">
        <Button text={"๋ก๊ทธ์์"} type={"nagetive"} onClick={onClick}></Button>
      </div>
    </div>
  );
};

export default Header;
