import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as reducers from "../slices/auth";
import * as services from "../services";
import { Input, ValidationError } from "../components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitLogin = async e => {
    e.preventDefault();
    dispatch(reducers.authUserStart());

    try {
      const request = await services.auth.userLogin({ email, password });
      dispatch(reducers.authUserSuccess(request.user));
      navigate("/");
    } catch (error) {
      dispatch(reducers.authUserFailure(error.response.data.errors));
    }
  };

  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog | Login</title>
      </Helmet>
      <section className="text-center flex-grow-1 d-flex align-items-center">
        <form className="w-25 m-auto" onSubmit={handleSubmitLogin}>
          <img className="mb-4" src="/images/logo.svg" alt="logo" width={140} />
          <h1 className="h3 mb-3 fw-normal">Please Login</h1>
          <ValidationError />
          <Input label="Email address" state={email} setState={setEmail} type="email" />
          <Input label="Password" state={password} setState={setPassword} type="password" />

          <button className="w-100 btn btn-lg btn-primary" disabled={isLoading} type="submit">
            {isLoading ? "Loading..." : "Login"}
          </button>
          <p>
            not account yet? <Link to="/register">register</Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;
