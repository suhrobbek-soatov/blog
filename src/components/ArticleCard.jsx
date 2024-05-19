import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ArticleService from "../services/article";

const ArticleCard = ({ slug, title, description, author, getArticles }) => {
  const { user, loggedIn } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleDeleteArticle = async slug => {
    try {
      await ArticleService.deleteArticle(slug);
      getArticles();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col" key={slug}>
      <div className="card h-100 shadow-sm">
        <svg
          className="bd-placeholder-img card-img-top"
          width="100%"
          height={225}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          focusable="false"
        >
          <rect width="100%" height="100%" fill="#55595c" />
        </svg>

        <div className="card-body">
          <p className="card-text mb-1 fw-bold">{title.slice(0, 75)}...</p>
          <p className="card-text">{description.slice(0, 120)}...</p>
        </div>

        <div className="card-footer d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => navigate(`/article/${slug}`)}
            >
              View
            </button>
            {loggedIn && user?.username === author?.username && (
              <>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => navigate(`/edit-article/${slug}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteArticle(slug)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
          <small className="text-muted text-capitalize fw-bold">{author.username}</small>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
