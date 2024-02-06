import { instance } from "@/api/axios";

// 전체 게시글 조회
const getArticleList = (success, fail) => {
  instance.get("article/list").then(success).catch(fail);
};

// 단일 게시글 조회
const getArticle = (articleId, success, fail) => {
  instance.get(`article/detail/${articleId}`).then(success).catch(fail);
};

// 게시글 작성
const writeArticle = (data, success, fail) => {
  return instance.post("article/write", data).then(success).catch(fail);
}

// 게시글 수정
const modifyArticle = (data, success, fail) => {
  return instance.put(`article/modify`, data).then(success).catch(fail);
};

// 게시글 삭제
const deleteArticle = (articleId, success, fail) => {
  return instance.put(`article/delete/${articleId}`).then(success).catch(fail);
};

export { getArticleList, getArticle, writeArticle, modifyArticle, deleteArticle };