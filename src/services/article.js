import { http } from "../lib";

const article = {
  async getArticles() {
    const { data } = await http.get("/articles");
    return data;
  },
  async getArticleDetail(slug) {
    const { data } = await http.get(`/articles/${slug}`);
    return data;
  },
  async postArticle(article) {
    const { data } = await http.post("/articles", { article });
    return data;
  },
  async deleteArticle(slug) {
    const { data } = await http.delete(`/articles/${slug}`);
    return data;
  },
  async editArticle(slug, article) {
    const { data } = await http.put(`/articles/${slug}`, { article });
    return data;
  },
};

export default article;
