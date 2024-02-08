<script setup>
import { ref, watch } from "vue";
import { checkId, message, signup } from "@/api/member";
import router from "@/router";

const member = ref({
    memberId: "",
    password: "",
    nickname: "",
    phoneNumber: "",
});

const checked = ref(false); // 체크박스 체크여부
const passwordValidate = ref(""); // 비밀번호 확인
const passwordMessage = ref(""); // 비밀번호 유효성 메시지

let checkedId = false
let checkedPwd = false

watch(() => member.value.memberId, (newVal) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (newVal) {
        if (emailRegex.test(newVal)) {
            const checkDuplicate = async () => {
                try {
                    const isDuplicate = await checkId(newVal);
                    if (!isDuplicate) {
                        checkedId = true;
                    } else {
                        message.value = "이미 사용중인 이메일입니다.";
                        checkedId = false;
                    }
                } catch (error) {
                    console.error(error);
                    checkedId = false;
                }
            };
            checkDuplicate();
        } else {
            message.value = "유효하지 않은 이메일입니다.";
            checkedId = false;
        }
    } else {
        message.value = "";
        checkedId = false;
    }
});

watch(() => member.value.password, (newVal) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

    if (newVal) {
        if (passwordRegex.test(newVal)) {
            passwordMessage.value = "유효한 비밀번호입니다.";
            checkedPwd = true;
        } else {
            passwordMessage.value = "영문, 숫자, 특수문자를 포함해야합니다.";
            checkedPwd = false;
        }
    } else {
        passwordMessage.value = "";
        checkedPwd = false; 
    }
});

function submitForm() {
    if (checked.value && checkedId && checkedPwd && passwordValidate.value == member.value.password) {
        signup(
            member,
            () => {
                alert("회원가입이 완료되었습니다. 로그인해주세요.");
                router.push({ name: "login" });
            },
            (error) => {
                alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
                console.error(error);
            }
        );
    } else if (!checked.value) {
        // 체크박스 미체크
        alert("개인정보 이용에 동의해주세요!");
    } else if (passwordValidate.value != member.value.password) {
        // 비밀번호 불일치
        alert("비밀번호를 확인해주세요!");
    }  else{
        alert("입력값을 확인해주세요!")
    }
}
</script>

<template>
    <div class="user-wrap">
        <div class="user-wrap-left">
            <h1>금쪽이 해방일지</h1>
        </div>
        <div class="user-wrap-right">
            <div class="signup-form">
                <h1>SIGN UP</h1>
                <form @submit.prevent="submitForm">
                    <div class="sign-grid">
                        <div class="sign-item message">
                            <label for="memberId" class="label"
                                ><span>*</span> 아이디</label
                            >
                            <input
                                type="email"
                                v-model="member.memberId"
                                required
                            />
                            <span class="message-text">{{ message }}</span>
                        </div>
                        <div class="sign-item">
                            <label for="password" class="label"
                                ><span>*</span> 비밀번호</label
                            >
                            <input
                                type="password"
                                required
                                v-model="member.password"
                                placeholder="8자리 이상 특수문자 1자 이상 포함"
                            />
                            <span class="message-text">{{ passwordMessage }}</span>
                        </div>
                        <div class="sign-item">
                            <label for="passwordValidate" class="label"
                                ><span>*</span> 비밀번호 확인</label
                            >
                            <input type="password" v-model="passwordValidate" />
                        </div>
                        <div class="sign-item">
                            <label for="nickname" class="label"
                                ><span>*</span> 닉네임</label
                            >
                            <input
                                type="text"
                                required
                                v-model="member.nickname"
                            />
                        </div>
                        <div class="sign-item">
                            <label for="phoneNumber" class="label"
                                ><span>*</span> 연락처</label
                            >
                            <input
                                type="tel"
                                required
                                v-model="member.phoneNumber"
                                pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                                placeholder="010-xxxx-xxxx"
                            />
                            <span class="message-text">{{ phoneNumberMessage }}</span>
                        </div>
                        <div class="sign-item">
                            <input type="checkbox" v-model="checked" />
                            <label for="checkbox"
                                >개인정보 이용 동의(필수)</label
                            >
                        </div>
                        <div class="sign-item">
                            <button type="submit">가입하기</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.user-wrap {
    display: grid;
    grid-template-columns: 40% 60%;
    height: 100vh;
}
.user-wrap-right {
    /* background-color: pink; */
    display: grid;
    align-items: center;
}
.signup-form {
    /* background-color: cadetblue; */
    width: 35%;
    margin: 0 auto;
}
.signup-form h1 {
    text-align: center;
    font-size: 1.5rem;
    color: #89b9ad;
    margin-bottom: 50px;
}
.sign-grid {
    width: 100%;
    margin: 0 auto;
    display: grid;
}
.sign-item {
    width: 100%;
    margin: 0.313rem auto;
    box-sizing: border-box;
    position: relative;
}
.sign-item .label {
    display: inline-block;
    position: absolute;
    top: -8px;
    left: 0.8rem;
    padding: 0.625rem;
    background: #fff8f2;
    font-size: 0.8rem;
    color: #89b9ad;
    font-weight: bold;
}

.sign-item label span {
    color: #e1baad;
    vertical-align: -1px;
}

.sign-item input[type="email"],
input[type="password"],
input[type="text"],
input[type="tel"] {
    width: 100%;
    border: 1px solid #89b9ad !important;
    font-size: 1rem;
    line-height: 1.45;
    letter-spacing: -0.04rem;
    border-radius: 8px;
    padding: 16px;
    margin-top: 12px;
    background-color: inherit;
    box-sizing: border-box;
    color: inherit;
}
.sign-item .sign-item input:focus {
    background-color: inherit;
    border: #89b9ad;
}

.sign-item input::placeholder {
    text-align: left;
    padding: 0 10px;
    color: #aeaeae;
    font-size: 13px;
}

.sign-item button {
    display: block;
    width: 80%;
    margin: 0 auto;
    box-sizing: border-box;
    background-color: #89b9ad;
    color: #fff;
    border: none;
    font-size: 1rem;
    line-height: 1.45;
    letter-spacing: -0.04rem;
    border-radius: 30px;
    padding: 13px;
    margin-top: 12px;
}
.sign-item button:hover {
    background-color: #e1baad;
    transition-duration: 0.8s;
    cursor: pointer;
}
.message {
    position: relative;
}
.message-text {
    position: absolute;
    text-align: left;
    top: 15px;
    right: -15px;
    transform: translate(100%, 100%);
}

.custom-checkbox input[type="checkbox"] {
    display: none;
}
</style>
