import React from "react";
import { Nav, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Header = ({ context }) => {
  const [isAuth, setIsAuth] = React.useState(false);
  const { pathname } = useLocation();
  const [appToken, setAppToken] = context;

  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem("token") === appToken) {
      console.log(true);
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    console.log(appToken);
  }, [pathname]);

  const handleClickAuth = () => {
    if (isAuth && window.confirm("Are you sure about that?")) {
      localStorage.removeItem("token");
      setIsAuth(false);
      navigate("/");
    } else navigate("/login");
    console.log(appToken);
  };

  return (
    <div className="header">
      <h2>React Blog</h2>
      <Nav variant="pills">
        <Nav.Item>
          <Nav.Link active={pathname === "/"} to="/" as={Link}>
            Главная
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={pathname === "/about"} to="/about" as={Link}>
            Обо мне
          </Nav.Link>
        </Nav.Item>
        <Button
          onClick={handleClickAuth}
          variant={isAuth ? "danger" : "success"}
        >
          {isAuth ? "Выйти" : "Войти"}
        </Button>
      </Nav>
    </div>
  );
};

export default Header;
