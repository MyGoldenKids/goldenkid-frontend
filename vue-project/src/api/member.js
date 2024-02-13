import { instance } from "@/api/axios";
import { ref } from "vue";

const hasInput = ref(false);
const message = ref("");

const checkId = (member_id) => {
    return new Promise((resolve, reject) => {
        if (member_id.trim() !== "") {
            hasInput.value = true;
            instance
                .post("member/idcheck/" + member_id)
                .then((response) => {
                    if (response.data.data === 0) {
                        message.value = "중복된 아이디가 존재합니다!";
                        resolve(true);
                    } else {
                        message.value = "사용가능한 아이디입니다.";
                        resolve(false);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    reject(e);
                });
        } else {
            hasInput.value = false;
            message.value = "";
            resolve(false);
        }
    })
}

const signup = (data, success, fail) => {
  instance.post("member/signup", data.value).then(success).catch(fail);
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

// 회원정보 수정
const modifyMemberDetail = (member, success, fail) => {
  instance.put("member/modify", member.value).then(success).catch(fail);
};

// 회원 탈퇴
const deleteMember = (member_no, success, fail) => {
  instance
    .put("member/signout/" + member_no)
    .then(success)
    .catch(fail);
};

export {
  hasInput,
  message,
  checkId,
  signup,
  login,
  getMemberDetail,
  modifyMemberDetail,
  deleteMember,
};
