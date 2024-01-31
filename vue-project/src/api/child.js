import { instance } from "./axios";

// 아이 정보 등록
const registerChild = async (data) => {
    await instance
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
    await instance.get(`child/detail/${childId}`).then(success).catch(fail);
};

// 아이 정보 조회
const getChildList = async (memberId, success, fail) => {
    await instance.get(`child/list/${memberId}`).then(success).catch(fail);
}

// 아이 정보 수정
const updateChildInfo = async(child, success, fail) => {
    await instance.put("child/modify", child).then(success).catch(fail);
}

// 아이 정보 삭제
const deleteChildInfo = async(childId, success, fail) => {
    await instance.delete(`child/delete/${childId}`).then(success).catch(fail);
}

export { registerChild, getChildInfo, getChildList, updateChildInfo, deleteChildInfo };
