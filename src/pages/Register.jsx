import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as services from "../services";
import * as reducers from "../slices/auth";

import { Input, ValidationError } from "../components";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitRegister = async e => {
    e.preventDefault();
    dispatch(reducers.authUserStart());

    try {
      const response = await services.auth.userRegister({ username, email, password });
      dispatch(reducers.authUserSuccess(response.user));
      navigate("/");
    } catch (error) {
      dispatch(reducers.authUserFailure(error.response.data.errors));
    }
  };

  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog | Register</title>
      </Helmet>

      <section className="text-center flex-grow-1 d-flex align-items-center">
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

          <p>
            already registered? <Link to="/login">login</Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Register;
