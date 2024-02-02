import { instance } from "@/api/axios";

// 전체 게시글 조회
const getArticleList = (success, fail) => {
  instance.get("article/list").then(success).catch(fail);
};

// 단일 게시글 조회
const getArticle = (articleId, success, fail) => {
  instance.get(`article/detail/${articleId}`).then(success).catch(fail);
};

// 게시글 삭제
const deleteArticles = (articleId, success, fail) => {
  return instance.put(`article/delete/${articleId}`).then(success).catch(fail);
};

export { getArticleList, getArticle, deleteArticles };