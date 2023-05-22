import { Navigate, Route, Routes } from "react-router-dom";
// components
import { Header } from "./components";
// pages
import { Home, Login, Register } from "./pages";
import { useSelector } from "react-redux";

const App = () => {
  const { loggedIn } = useSelector(state => state.auth);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={loggedIn ? <Navigate to={"/"} /> : <Login />} />
        <Route path="/register" element={loggedIn ? <Navigate to={"/"} /> : <Register />} />
      </Routes>
    </>
  );
};

export default App;
