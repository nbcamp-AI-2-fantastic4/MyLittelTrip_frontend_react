const Logout = () => {
  if (window.confirm("정말 로그아웃하시겠습니까?")) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    return true;
  }
  return false;
};

export default Logout;
