import { useDispatch, useSelector } from "react-redux";
import { ArticleCard, Loader } from "../components";
import { useEffect } from "react";
import { getArticlesFailure, getArticlesStart, getArticlesSuccess } from "../slice/article";
import ArticleService from "../service/article";

const Home = () => {
  const { articles, isLoading } = useSelector(state => state.article);
  const dispatch = useDispatch();

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
          {articles.map(article => (
            <ArticleCard {...article} getArticles={getArticles} key={article.slug} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
