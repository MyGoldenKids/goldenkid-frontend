import { instance } from "@/api//axios";
import { ref } from "vue";

const hasInput = ref(false);
const message = ref("");

const checkId = (member_id) => {
    hasInput.value = true;
    instance
        .post("member/idcheck/" + member_id)
        .then((response) => {
            if (response.data.data === 0) {
                message.value = "중복된 아이디가 존재합니다!";
            } else {
                message.value = "사용가능한 아이디입니다.";
            }
        })
        .catch((e) => {
            console.log(e);
        });
};

const signup = (data) => {
    console.log(data.value);
    instance
        .post("member/signup", data.value)
        .then((response) => {
            console.log(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
};

// 로그인
const login = (data, success, fail) => {
    instance.post("member/login", data.value).then(success).catch(fail);
};

// 회원정보 조회
const getMemberDetail = (member_no, success, fail) => {
    instance
        .get("member/detail/" + member_no)
        .then(success)
        .catch(fail);
};

export { hasInput, message, checkId, signup, login, getMemberDetail };
