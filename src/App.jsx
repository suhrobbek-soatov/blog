import { Route, Routes } from "react-router-dom";
import { Login, Main, Navbar, Register } from "./components";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
