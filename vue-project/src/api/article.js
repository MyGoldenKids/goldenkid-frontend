import { instance } from "@/api/axios";
import router from "@/router";

// 전체 게시글 조회
const getArticleList = async () => {
  try {
    const response = await instance.get("article/list");
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// 단일 게시글 조회
const getArticle = async (articleId) => {
  try {
    const response = await instance.get(`article/detail/${articleId}`);
    return response.data;
  } catch (error) {
    router.push("/404");
    console.log(error);
  }
};

// 게시글 삭제
const deleteArticles = async (articleId) => {
  try {
    await instance.put(`article/delete/${articleId}`);
  } catch (error) {
    console.error("POST DELETE ERROR!", error);
  }
};

export { getArticleList, getArticle, deleteArticles };
