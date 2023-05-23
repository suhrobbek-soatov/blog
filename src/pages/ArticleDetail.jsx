import { useParams } from "react-router-dom";
import ArticleService from "../service/article";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import article, { getArticleDetailFailure, getArticleDetailStart, getArticleDetailSuccess } from "../slice/article";
import { Loader } from "../components";
import moment from "moment/moment";

const ArticleDetail = () => {
  const { slug } = useParams();
  const { isLoading, articleDetail } = useSelector(state => state.article);
  const dispatch = useDispatch();

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

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {articleDetail && (
            <div className="container p-3">
              <div className="py-5">
                <h1 className="display-5 fw-bold">{articleDetail.title}</h1>
                <p className="col-md-8 fs-4">{articleDetail.description}</p>
              </div>
              <p className="text-muted">
                <span className="fw-bold">createdAt:</span> {moment(articleDetail.createdAt).format("DD MMM, YYYY")}
              </p>
              <p className="fw-400">{articleDetail.body}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ArticleDetail;
