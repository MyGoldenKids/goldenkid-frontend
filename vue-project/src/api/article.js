import { instance } from "@/api/axios";
import { ref } from "vue";

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
    console.log(error);
  }
};

// 게시글 삭제

const deleteArticles = async (articleId) => {
  try {
    // put으로 바꿔야함
    await instance.put(`article/delete/${articleId}`);
    console.log('성공!')
  } catch (error) {
    console.error("Post delete ERROR!", error);
  }
};

export { getArticleList, getArticle, deleteArticles };
