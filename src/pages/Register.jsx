import { Input } from "../ui";
import { ValidationError } from "../components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUserFailure, authUserStart, authUserSuccess } from "../slice/auth";
import AuthService from "../service/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleSubmitRegister = async e => {
    e.preventDefault();
    dispatch(authUserStart());

    const user = { username, email, password };

    try {
      const response = await AuthService.userRegister(user);
      dispatch(authUserSuccess(response.user));
      navigate("/");
    } catch (error) {
      dispatch(authUserFailure(error.response.data.errors));
    }
  };

  return (
    <div className="text-center">
      <form className="w-25 m-auto" onSubmit={handleSubmitRegister}>
        <img className="mb-4" src="/images/logo.svg" alt="logo" width={140} />
        <h1 className="h3 mb-3 fw-normal">Please register</h1>
        <ValidationError />
        <Input label="Username" state={username} setState={setUsername} />
        <Input label="Email address" state={email} setState={setEmail} type="email" />
        <Input label="Password" state={password} setState={setPassword} type="password" />

        <button className="w-100 btn btn-lg btn-primary" disabled={isLoading} type="submit">
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
