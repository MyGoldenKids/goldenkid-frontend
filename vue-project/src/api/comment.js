import { instance } from "./axios";

// 댓글 조회
const getCommentByArticleId = async (articleId, success, fail) => {
    await instance.get(`comment/list/${articleId}`).then(success).catch(fail);
};

export { getCommentByArticleId };
