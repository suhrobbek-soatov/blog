import { useState } from "react";
import { Input } from "../ui";
import { useDispatch, useSelector } from "react-redux";
import { registerUserStart } from "../slice/auth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);

  const handleSubmitRegister = e => {
    e.preventDefault();
    dispatch(registerUserStart());
  };

  return (
    <div className="text-center">
      <form className="w-25 m-auto" onSubmit={handleSubmitRegister}>
        <img className="mb-4" src="/images/logo.svg" alt="logo" width={140} />
        <h1 className="h3 mb-3 fw-normal">Please register</h1>

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
