import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom container">
      <Link className="d-flex align-items-center me-md-auto" to={"/"}>
        <img src="/images/logo.svg" alt="logo" />
      </Link>
      <ul className="nav nav-pills">
        <li className="nav-item me-3">
          <Link className="text-decoration-none text-dark" to={"/login"}>
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="text-decoration-none text-dark" to={"/register"}>
            Register
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
