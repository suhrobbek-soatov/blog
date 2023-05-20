import axios from "./api";

const AuthService = {
  async userRegister(user) {
    const res = await axios.post("/users", { user });

    return res;
  },
  async userLogin() {
    // const res = await axios.post("/users/login");
  },
  async getUser() {
    // const res = await axios.post("/users");
  },
};

export default AuthService;
