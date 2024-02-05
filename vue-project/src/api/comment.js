import { instance } from "./axios";

// 댓글 조회
const getCommentByArticleId = async (articleId, success, fail) => {
    await instance.get(`comment/list/${articleId}`).then(success).catch(fail);
};

// 댓글 작성
const writeComment = async (articleId, comment, success, fail) => {
    await instance
        .post(`comment/write/${articleId}`, comment)
        .then(success)
        .catch(fail);
};

export { getCommentByArticleId, writeComment };
