import { instance } from "./axios";

// 에피소드 생성
const createSprint = async (data, success, fail) => {
    await instance.post("jira/sprint/create", data).then(success).catch(fail);
};

// 에피소드 조회
const getSprintList = async (memberId, success, fail) => {
    await instance
        .get(`jira/sprint/list/${memberId}`)
        .then(success)
        .catch(fail);
};

// 에피소드 상태 변경
const changeSprintStatus = async (sprintId, data, success, fail) => {
    await instance
        .patch(`jira/sprint/status/${sprintId}`, data)
        .then(success)
        .catch(fail);
};

// 에피소드 수정
const modifySprint = async (sprintId, data, success, fail) => {
    await instance
        .put(`jira/sprint/modify/${sprintId}`, data)
        .then(success)
        .catch(fail);
};

// 에피소드 삭제
const deleteSprint = async (sprintId, memberId, success, fail) => {
    await instance
        .delete(`jira/sprint/delete/${sprintId}`, memberId)
        .then(success)
        .catch(fail);
};

// 스토리 생성
const createStory = async (data, success, fail) => {
    await instance.post("jira/story/create", data).then(success).catch(fail);
};

// 에피소드별 스토리 조회
const getStoryList = async (sprintId, memberId, success, fail) => {
    await instance
        .get(`jira/story/list/${sprintId}/member/${memberId}`)
        .then(success)
        .catch(fail);
};

// 스토리 상세 조회
const getStoryDetail = async (storyId, success, fail) => {
    await instance
        .get(`jira/story/detail/${storyId}/member/${memberId}`)
        .then(success)
        .catch(fail);
};

// 스토리 수정
const modifyStory = async (storyId, data, success, fail) => {
    await instance
        .put(`jira/story/modify/${storyId}`, data)
        .then(success)
        .catch(fail);
};

// 스토리 상태 변경
const changeStoryStatus = async (storyId, data, success, fail) => {
    await instance
        .patch(`jira/story/status/${storyId}`, data)
        .then(success)
        .catch(fail);
};

// 스토리 삭제
const deleteStory = async (storyId, memberId, success, fail) => {
    await instance
        .delete(`jira/story/delete/${storyId}/member/${memberId}`)
        .then(success)
        .catch(fail);
};

// 활동 추천
const activityList = async (success, fail) => {
    await instance.get("activity/recommend").then(success).catch(fail);
}
export {
    createSprint,
    getSprintList,
    changeSprintStatus,
    modifySprint,
    deleteSprint,
    createStory,
    getStoryList,
    getStoryDetail,
    modifyStory,
    changeStoryStatus,
    deleteStory,
    activityList,
};
