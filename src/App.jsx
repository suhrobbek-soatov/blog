import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { storage } from "./lib";
import { auth } from "./services";
import * as reducers from "./slices/auth";

import routes from "./routes";
import { Main } from "./layouts";

const App = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(state => state.auth);

  const token = storage.local.get("token");

  const getUser = async () => {
    try {
      const { user } = await auth.getUser();
      dispatch(reducers.authUserSuccess(user));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = storage.local.get("token");
    if (token) getUser();
    // eslint-disable-next-line
  }, []);

  if (!loggedIn && !token)
    return (
      <Suspense fallback="">
        <Routes>
          {routes.auth.map(({ path, Page }, idx) => (
            <Route path={path} element={<Page />} key={idx} />
          ))}

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    );

  return (
    <Main>
      <Suspense fallback="">
        <Routes>
          {routes.private.map(({ path, Page }, idx) => (
            <Route path={path} element={<Page />} key={idx} />
          ))}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Main>
  );
};

export default App;
