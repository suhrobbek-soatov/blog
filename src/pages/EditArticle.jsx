import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";

import * as reducers from "../slices/article";
import * as services from "../services";
import { Form } from "../components";

const EditArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  const getArticleDetail = async () => {
    dispatch(reducers.getArticleDetailStart());
    try {
      const { article } = await services.article.getArticleDetail(slug);
      setTitle(article.title);
      setDescription(article.description);
      setBody(article.body);
      dispatch(reducers.getArticleDetailSuccess(article));
    } catch (error) {
      dispatch(reducers.getArticleDetailFailure(error.response.data.errors));
    }
  };

  useEffect(() => {
    getArticleDetail();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    dispatch(reducers.postArticleStart());
    try {
      const article = { title, body, description };
      await services.article.editArticle(slug, article);
      dispatch(reducers.postArticleSuccess());
      navigate("/");
    } catch (error) {
      dispatch(reducers.postArticleFailure(error.response.data.errors));
    }
  };

  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog | {title}</title>
      </Helmet>
      <div className="text-center">
        <h1 className="fs-2 mb-2">Edit Article</h1>
      </div>
      <Form
        {...{
          body,
          title,
          setBody,
          setTitle,
          description,
          handleSubmit,
          setDescription,
        }}
      />
    </main>
  );
};

export default EditArticle;
