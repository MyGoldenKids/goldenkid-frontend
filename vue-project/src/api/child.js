import { instance } from "./axios";

// 아이 정보 등록
const registerChild = async (data) => {
    instance
        .post("child/register", data.value)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
};

// 아이 상세 정보 조회
const getChildInfo = async (childId, success, fail) => {
    instance.get(`child/detail/${childId}`).then(success).catch(fail);
};

export { registerChild, getChildInfo };
