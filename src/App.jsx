import { Navigate, Route, Routes } from "react-router-dom";
// components
import { Header } from "./components";
// pages
import { Home, Login, Register } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AuthService from "./service/auth";
import { authUserSuccess } from "./slice/auth";
import { getStorage } from "./utils/utils";

const App = () => {
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const { user } = await AuthService.getUser();
      dispatch(authUserSuccess(user));
      console.log(user);
    } catch (error) {
      console.log("something went wrong while get user data");
    }
  };

  useEffect(() => {
    const token = getStorage("token");
    if (!!token) {
      getUser();
    }
  }, []);
  const { loggedIn } = useSelector(state => state.auth);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={loggedIn ? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={loggedIn ? <Navigate to={"/"} /> : <Login />} />
        <Route path="/register" element={loggedIn ? <Navigate to={"/"} /> : <Register />} />
      </Routes>
    </>
  );
};

export default App;
