import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import AuthService from "./services/auth";
import { getStorage } from "./utils/utils";
import { authUserSuccess } from "./slices/auth";

import * as Pages from "./pages";
import * as Layouts from "./layouts";

const App = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(state => state.auth);

  const token = getStorage("token");

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
    if (!!token) getUser();
  }, []);

  if (!loggedIn && !token)
    return (
      <Layouts.Auth>
        <Routes>
          <Route path="/login" element={<Pages.Login />} />
          <Route path="/register" element={<Pages.Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Layouts.Auth>
    );

  return (
    <Layouts.Main>
      <Routes>
        <Route path="/" element={<Pages.Home />} />
        <Route path="/article/:slug" element={<Pages.ArticleDetail />} />
        <Route path="/create-article" element={<Pages.CreateArticle />} />
        <Route path="/edit-article/:slug" element={<Pages.EditArticle />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Layouts.Main>
  );
};

export default App;
