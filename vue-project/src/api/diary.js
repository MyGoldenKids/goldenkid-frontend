import { instance } from "./axios";

// 일기 모음 조회
const getDiaryList = async (memberId) => {
    await instance
        .get("diary/list/" + memberId)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
};

// 일기 상세 조회
const getDiaryDetail = async (diaryId) => {
    await instance
        .get("diary/detail/" + diaryId)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
};

// 일기 생성
const createDiary = async (data) => {
    await instance
        .post("diary/create", data.value)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
};

// 일기 삭제
const deleteDiary = async(diaryId) => {
    await instance
    .delete("diary/delete/" + diaryId)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    })
}

export { getDiaryList, getDiaryDetail, createDiary, deleteDiary };
