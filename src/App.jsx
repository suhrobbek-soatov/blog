import { Navigate, Route, Routes } from "react-router-dom";
// components
import { Header } from "./components";
// pages
import { ArticleDetail, Home, Login, Register } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AuthService from "./service/auth";
import { authUserSuccess } from "./slice/auth";
import { getStorage } from "./utils/utils";
import ArticleService from "./service/article";
import { getArticlesStart, getArticlesSuccess } from "./slice/article";

const App = () => {
  const dispatch = useDispatch();

  const getArticles = async () => {
    dispatch(getArticlesStart());
    try {
      const response = await ArticleService.getArticles();
      dispatch(getArticlesSuccess(response.articles));
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const { user } = await AuthService.getUser();
      dispatch(authUserSuccess(user));
    } catch (error) {
      console.log("something went wrong while get user data");
    }
  };

  useEffect(() => {
    const token = getStorage("token");
    if (!!token) {
      getUser();
    }
    getArticles();
  }, []);
  const { loggedIn } = useSelector(state => state.auth);
  return (
    <>
      <Header />
      <Routes>
        {loggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/article/:slug" element={<ArticleDetail />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
};

export default App;
