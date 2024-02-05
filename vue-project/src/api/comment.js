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

// 댓글 수정
const updateComment = async (commentId, comment, success, fail) => {
    await instance
        .patch(`comment/modify/${commentId}`, comment)
        .then(success)
        .catch(fail);
};

// 댓글 삭제
const deleteComment = async (commentId, memberId, success, fail) => {
    await instance
        .delete(`comment/delete/${commentId}/member/${memberId}`)
        .then(success)
        .catch(fail);
};

export { getCommentByArticleId, writeComment, updateComment, deleteComment };
