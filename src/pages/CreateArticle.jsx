import { useState } from "react";
import { Form } from "../components";
import ArticleService from "../service/article";
import { useDispatch } from "react-redux";
import { postArticleFailure, postArticleStart, postArticleSuccess } from "../slice/article";
import { useNavigate } from "react-router-dom";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const article = { title, description, body };
    dispatch(postArticleStart());
    try {
      const response = await ArticleService.postArticle(article);
      dispatch(postArticleSuccess());
      navigate("/");
    } catch (error) {
      dispatch(postArticleFailure(error.response.data.errors));
      console.log(error);
    }
  };

  const formProps = { title, setTitle, description, setDescription, body, setBody, handleSubmit };
  return (
    <>
      <div className="text-center">
        <h1 className="fs-2 mb-2">Create Article</h1>
      </div>
      <Form {...formProps} />
    </>
  );
};

export default CreateArticle;
