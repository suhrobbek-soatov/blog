import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getArticlesFailure, getArticlesStart, getArticlesSuccess } from "../slice/article";
import ArticleService from "../service/article";

const Home = () => {
  const { articles, isLoading } = useSelector(state => state.article);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getArticles = async () => {
    dispatch(getArticlesStart());
    try {
      const response = await ArticleService.getArticles();
      dispatch(getArticlesSuccess(response.articles));
    } catch (error) {
      dispatch(getArticlesFailure(error.response.data.errors));
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="album py-5">
      <div className="container">
        {isLoading && <Loader />}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {articles.map(({ slug, title, description, author }) => (
            <div className="col" key={slug}>
              <div className="card h-100 shadow-sm">
                <svg className="bd-placeholder-img card-img-top" width="100%" height={225} xmlns="http://www.w3.org/2000/svg" role="img" focusable="false">
                  <rect width="100%" height="100%" fill="#55595c" />
                </svg>

                <div className="card-body">
                  <p className="card-text mb-1 fw-bold">{title.slice(0, 75)}...</p>
                  <p className="card-text">{description.slice(0, 120)}...</p>
                </div>

                <div className="card-footer d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button className="btn btn-sm btn-outline-success" onClick={() => navigate(`/article/${slug}`)}>
                      View
                    </button>
                    <button className="btn btn-sm btn-outline-primary">Edit</button>
                    <button className="btn btn-sm btn-outline-danger">Delete</button>
                  </div>
                  <small className="text-muted text-capitalize fw-bold">{author.username}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
