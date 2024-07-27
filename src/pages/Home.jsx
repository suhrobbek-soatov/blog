import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";

import * as services from "../services";
import * as slices from "../slices/article";

import { ArticleCard, Loader } from "../components";

const Home = () => {
  const { articles, isLoading } = useSelector(state => state.article);
  const dispatch = useDispatch();

  const getArticles = async () => {
    dispatch(slices.getArticlesStart());

    try {
      const response = await services.article.getArticles();
      dispatch(slices.getArticlesSuccess(response.articles));
    } catch (error) {
      dispatch(slices.getArticlesFailure(error.response.data.errors));
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <main>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog | Home</title>
      </Helmet>

      <section className="album py-5">
        <div className="container">
          {isLoading && <Loader />}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {articles.map((article, idx) => (
              <ArticleCard {...article} getArticles={getArticles} key={idx} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
