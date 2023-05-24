import { useEffect, useState } from "react";
import { Form } from "../components";
import { useDispatch } from "react-redux";
import { getArticleDetailFailure, getArticleDetailStart, getArticleDetailSuccess } from "../slice/article";
import ArticleService from "../service/article";
import { useNavigate, useParams } from "react-router-dom";

const EditArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  const getArticleDetail = async () => {
    dispatch(getArticleDetailStart());
    try {
      const { article } = await ArticleService.getArticleDetail(slug);
      setTitle(article.title);
      setDescription(article.description);
      setBody(article.body);
      dispatch(getArticleDetailSuccess(article));
    } catch (error) {
      dispatch(getArticleDetailFailure(error.response.data.errors));
    }
  };

  useEffect(() => {
    getArticleDetail();
  }, []);

  const handleSubmit = async slug => {};
  const formProps = {
    title,
    setTitle,
    description,
    setDescription,
    body,
    setBody,
    handleSubmit,
  };
  return (
    <>
      <div className="text-center">
        <h1 className="fs-2 mb-2">Edit Article</h1>
      </div>
      <Form {...formProps} />
    </>
  );
};

export default EditArticle;
