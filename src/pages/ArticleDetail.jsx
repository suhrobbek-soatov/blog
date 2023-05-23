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

  console.log(articleDetail);

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
              <div className="col-md-6">
                <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                  <div class="col p-4 d-flex flex-column position-static">
                    <strong class="d-inline-block mb-2 text-primary text-uppercase">{articleDetail.author.username}</strong>
                    <p class="mb-auto card-text">{articleDetail.author.bio}</p>
                  </div>
                  <div class="col-auto d-none d-lg-block">
                    <svg class="bd-placeholder-img" width="200" height="240" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100%" height="100%" fill="#55595c"></rect>
                      <text x="50%" y="50%" fill="#eceeef">
                        {articleDetail.author.username.charAt()}
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="fw-400">{articleDetail.body}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ArticleDetail;
