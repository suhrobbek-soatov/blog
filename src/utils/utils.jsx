export const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.log("something went wrong while saving data...");
  }
};

export const getStorage = key => {
  try {
    if (!!localStorage.getItem(key)) {
      return localStorage.getItem(key);
    } else {
      throw new Error("Something went wrong while getting data...");
    }
  } catch (error) {
    return null;
  }
};

export const removeStorage = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log("something went wrong");
  }
};
