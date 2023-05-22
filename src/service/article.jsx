import axios from "./api";

const ArticleService = {
  async getArticles() {
    const { data } = await axios.get("/articles");
    return data;
  },
  // async getArticles() {},
};

export default ArticleService;
