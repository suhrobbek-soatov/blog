import store from "store2";

const storageApi = type => ({
  get: key => store[type].get(key),
  set: (key, value) => store[type].set(key, value),
  remove: key => store[type].remove(key),
});

const storage = {
  local: storageApi("local"),
  session: storageApi("session"),
};

export default storage;
