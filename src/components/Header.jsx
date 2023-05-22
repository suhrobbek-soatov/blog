import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { loggedIn, user } = useSelector(state => state.auth);

  return (
    <div className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom container">
      <Link className="d-flex align-items-center me-md-auto" to={"/"}>
        <img src="/images/logo.svg" alt="logo" />
      </Link>

      <ul className="nav nav-pills d-flex align-items-center">
        {loggedIn && (
          <>
            <li className="nav-item me-3 text-capitalize">
              <span>{user.username}</span>
            </li>
            <li className="nav-item me-3">
              <button className="btn btn-outline-danger">Logout</button>
            </li>
          </>
        )}
        {!loggedIn && (
          <>
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
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
