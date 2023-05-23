import { useParams } from "react-router-dom";
import ArticleService from "../service/article";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import article, { getArticleDetailFailure, getArticleDetailStart, getArticleDetailSuccess } from "../slice/article";
import { Loader } from "../components";

const ArticleDetail = () => {
  const { slug } = useParams();
  const { isLoading, articleDetail } = useSelector(state => state.article);
  const dispatch = useDispatch();

  console.log(articleDetail);

  const getArticleDetail = async () => {
    dispatch(getArticleDetailStart());
    try {
      const { article } = await ArticleService.getArticleDetail(slug);
      dispatch(getArticleDetailSuccess(article));
    } catch (error) {
      dispatch(getArticleDetailFailure(error.response.data.errors));
    }
  };

  useEffect(() => {
    getArticleDetail();
  }, [slug]);

  return <div>{isLoading && <Loader />}</div>;
};

export default ArticleDetail;
