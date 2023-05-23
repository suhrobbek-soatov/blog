import axios from "./api";

const ArticleService = {
  async getArticles() {
    const { data } = await axios.get("/articles");
    return data;
  },
  async getArticleDetail(slug) {
    const { data } = await axios.get(`/articles/${slug}`);
    return data;
  },
  // async getArticles() {},
};

export default ArticleService;
