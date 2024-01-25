import { instance } from '@/api/axios';

// 전체 게시글 조회
const getArticleList = async () => {
    try {
        const response = await instance.get('article/list');
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


export {
    getArticleList, getArticle,
};
