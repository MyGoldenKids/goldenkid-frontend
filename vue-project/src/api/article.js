import { instance } from "@/api/axios";
import { fileInstance } from "./fileaxios";

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
    await instance.put(`article/delete/${articleId}`);
  } catch (error) {
    console.error("POST DELETE ERROR!", error);
  }
};

// 파일 불러오기
const getFileInfo = async (fileListId) => {
    try {
        const response = await fileInstance.get(`/file/detail/all/${fileListId}`);
        return response.data
    } catch (error) {
        console.log('FILE LIST GET ERROR!', error)
    }
}

export { getArticleList, getArticle, deleteArticles, getFileInfo };
