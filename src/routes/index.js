import { lazy } from "react";

// auth
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

// private
const Home = lazy(() => import("../pages/Home"));
const ArticleDetail = lazy(() => import("../pages/ArticleDetail"));
const CreateArticle = lazy(() => import("../pages/CreateArticle"));
const EditArticle = lazy(() => import("../pages/EditArticle"));

const routes = {
  auth: [
    {
      path: "/login",
      Page: Login,
    },
    {
      path: "/register",
      Page: Register,
    },
  ],
  private: [
    {
      path: "/",
      Page: Home,
    },
    {
      path: "/article/:slug",
      Page: ArticleDetail,
    },
    {
      path: "/create-article",
      Page: CreateArticle,
    },
    {
      path: "/edit-article/:slug",
      Page: EditArticle,
    },
  ],
};

export default routes;
