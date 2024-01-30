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

export { registerChild };
