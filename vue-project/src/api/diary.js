import { instance } from "./axios";

// 일기 모음 조회
const getDiaryList = async (memberId, success, fail) => {
    await instance
        .get("diary/list/" + memberId)
        .then(success)
        .catch(fail);
};

// 일기 상세 조회
const getDiaryDetail = async (diaryId, success, fail) => {
    await instance
        .get("diary/detail/" + diaryId)
        .then(success)
        .catch(fail);
};

// 일기 생성
const createDiary = async (data, success, fail) => {
    await instance
        .post("diary/create", data)
        .then(success)
        .catch(fail);
};

// 일기 제출
const submitDiary = async (data) => {
    await instance
        .put("diary/submit", data.value)
        .then((response) => {
            console.log(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
};

// 일기 삭제
const deleteDiary = async (diaryId, success, fail) => {
    await instance
        .delete("diary/delete/" + diaryId)
        .then(success)
        .catch(fail);
};

// 일기 수정 및 임시 저장
const updateDiary = async (diaryId, data) => {
    await instance
        .put("diary/update/" + diaryId, data.value)
        .then((response) => {
            console.log(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
};

export {
    getDiaryList,
    getDiaryDetail,
    createDiary,
    submitDiary,
    deleteDiary,
    updateDiary,
};
