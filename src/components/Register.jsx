import { useState } from "react";
import { Input } from "../ui";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="text-center">
      <form className="w-25 m-auto">
        <img className="mb-4" src="/images/logo.svg" alt="logo" width={140} />
        <h1 className="h3 mb-3 fw-normal">Please register</h1>

        <Input label="Username" state={username} setState={setUsername} />
        <Input label="Email address" state={email} setState={setEmail} type="email" />
        <Input label="Password" state={password} setState={setPassword} type="password" />

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
