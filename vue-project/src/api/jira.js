import { instance } from "./axios";

// 스프린트 생성
const createSprint = async (data, success, fail) => {
    await instance.post("jira/sprint/create", data).then(success).catch(fail);
};

// 스프린트 조회
const getSprintList = async (memberId, success, fail) => {
    await instance
        .get(`jira/sprint/list/${memberId}`)
        .then(success)
        .catch(fail);
};

// 스프린트 상태 변경
const changeSprintStatus = async (sprintId, data, success, fail) => {
    await instance
        .patch(`jira/sprint/status/${sprintId}`, data)
        .then(success)
        .catch(fail);
};

// 스프린트 수정
const modifySprint = async (sprintId, data, success, fail) => {
    await instance
        .put(`jira/sprint/modify/${sprintId}`, data)
        .then(success)
        .catch(fail);
};

// 스프린트 삭제
const deleteSprint = async (sprintId, memberId, success, fail) => {
    await instance
        .delete(`jira/sprint/delete/${sprintId}`, memberId)
        .then(success)
        .catch(fail);
};

export {
    createSprint,
    getSprintList,
    changeSprintStatus,
    modifySprint,
    deleteSprint,
};
