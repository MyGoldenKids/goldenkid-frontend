import { instance } from "@/api/axios";

// 전체 게시글 조회
const getArticleList = (size, page, success, fail) => {
  instance.get(`article/list?size=${size}&page=${page}`).then(success).catch(fail);
};

// 전체 게시글 사이즈 조회
const getArticleListSize = (success, fail) => {
  instance.get("article/size").then(success).catch(fail);
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

// 게시글 검색
const searchArticle = (category, serachContent, success, fail) => {
  instance.get(`article/list/search?${category}=${serachContent}`).then(success).catch(fail);
}

// 게시글 추천
const recommendArticle = (data, success, fail) => {
  instance.patch(`article/recommend`, data).then(success).catch(fail);
}

// 게시글 추천 확인
const checkRecommendArticle = (articleId, memberId, success, fail) => {
  instance.get(`article/recommend/${articleId}/member/${memberId}`).then(success).catch(fail);
}

export { getArticleList, getArticle, writeArticle, modifyArticle, deleteArticle, searchArticle, recommendArticle, checkRecommendArticle, getArticleListSize };