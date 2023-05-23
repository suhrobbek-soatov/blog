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
  async postArticle(article) {
    const response = await axios.post("/articles", { article });
    return response;
  },
};

export default ArticleService;
