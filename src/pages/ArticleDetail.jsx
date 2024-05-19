import { useEffect } from "react";
import moment from "moment/moment";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as reducers from "../slices/article";
import * as services from "../services";
import { Loader } from "../components";

const ArticleDetail = () => {
  const { slug } = useParams();
  const { isLoading, articleDetail } = useSelector(state => state.article);
  const dispatch = useDispatch();

  const getArticleDetail = async () => {
    dispatch(reducers.getArticleDetailStart());
    try {
      const { article } = await services.article.getArticleDetail(slug);
      dispatch(reducers.getArticleDetailSuccess(article));
    } catch (error) {
      dispatch(reducers.getArticleDetailFailure(error.response.data.errors));
    }
  };

  useEffect(() => {
    getArticleDetail();
  }, [slug]);

  return (
    <main>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{`Blog | ${articleDetail?.title}`}</title>
          </Helmet>
          {articleDetail && (
            <div className="container p-3">
              <div className="py-5">
                <h1 className="display-5 fw-bold">{articleDetail.title}</h1>
                <p className="col-md-8 fs-4">{articleDetail.description}</p>
              </div>
              <p className="text-muted">
                <span className="fw-bold">createdAt:</span>{" "}
                {moment(articleDetail.createdAt).format("DD MMM, YYYY")}
              </p>
              <div className="col-md-6">
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                  <div className="col p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-primary text-uppercase">
                      {articleDetail.author.username}
                    </strong>
                    <p className="mb-auto card-text">{articleDetail.author.bio}</p>
                  </div>
                  <div className="col-auto d-none d-lg-block">
                    <svg
                      className="bd-placeholder-img"
                      width={200}
                      height={240}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="100%" height="100%" fill="#55595c" />
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
    </main>
  );
};

export default ArticleDetail;
