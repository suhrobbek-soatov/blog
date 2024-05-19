import { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as reducers from "../slices/article";
import * as services from "../services";
import { Form } from "../components";

const CreateArticle = () => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    dispatch(reducers.postArticleStart());
    try {
      await services.article.postArticle({ title, description, body });
      dispatch(reducers.postArticleSuccess());
      navigate("/");
    } catch (error) {
      dispatch(reducers.postArticleFailure(error.response.data.errors));
      console.log(error);
    }
  };

  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog | Create Post</title>
      </Helmet>
      <div className="text-center">
        <h1 className="fs-2 mb-2">Create Article</h1>
      </div>
      <Form {...{ title, setTitle, description, setDescription, body, setBody, handleSubmit }} />
    </main>
  );
};

export default CreateArticle;
