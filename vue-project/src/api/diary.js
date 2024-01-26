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

export { getDiaryList };
