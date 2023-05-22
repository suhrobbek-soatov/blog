export const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.log("something went wrong on saving data...");
  }
};
