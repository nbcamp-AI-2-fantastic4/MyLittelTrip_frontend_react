const Logo = () => {
  return (
    <div className="Logo">
      <div className="title-box">
        <p>My Little Trip</p>
      </div>
      <img src={process.env.PUBLIC_URL + `logo.png`} />
    </div>
  );
};

export default Logo;
