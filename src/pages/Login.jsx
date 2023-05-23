import { Input, ValidationError } from "../components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../service/auth";
import { authUserFailure, authUserStart, authUserSuccess } from "../slice/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleSubmitLogin = async e => {
    e.preventDefault();
    dispatch(authUserStart());

    const user = { email, password };

    try {
      const request = await AuthService.userLogin(user);
      dispatch(authUserSuccess(request.user));
      navigate("/");
    } catch (error) {
      dispatch(authUserFailure(error.response.data.errors));
    }
  };

  return (
    <div className="text-center">
      <form className="w-25 m-auto" onSubmit={handleSubmitLogin}>
        <img className="mb-4" src="/images/logo.svg" alt="logo" width={140} />
        <h1 className="h3 mb-3 fw-normal">Please Login</h1>
        <ValidationError />
        <Input label="Email address" state={email} setState={setEmail} type="email" />
        <Input label="Password" state={password} setState={setPassword} type="password" />

        <button className="w-100 btn btn-lg btn-primary" disabled={isLoading} type="submit">
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
