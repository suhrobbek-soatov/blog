import { http } from "../lib";

const auth = {
  async userRegister(user) {
    const { data } = await http.post("/users", { user });
    return data;
  },

  async userLogin(user) {
    const { data } = await http.post("/users/login", { user });
    return data;
  },

  async getUser() {
    const { data } = await http.get("/user");
    return data;
  },
};

export default auth;
