import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeStorage } from "../utils/utils";
import { authUserLogout } from "../slice/auth";

const Header = () => {
  const { loggedIn, user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    removeStorage("token");
    dispatch(authUserLogout());
    navigate("/login");
  };

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
            <li className="nav-item">
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
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
