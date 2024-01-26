<script setup>
import { ref } from "vue";
import { login } from "@/api/member";
import { useMemberStore } from "@/stores/member-store";
import router from "@/router";

const store = useMemberStore();

const loginInfo = ref({
    memberId: "",
    password: "",
});

function submitForm() {
    // ID 또는 비밀번호가 비어있는 경우 체크
    if (!loginInfo.value.memberId || !loginInfo.value.password) {
        alert("ID와 비밀번호를 모두 입력해주세요.");
    } else {
        login(
            loginInfo,
            (response) => {
                store.isLoggedIn = true; // 로그인 여부 store에 저장
                store.memberInfo = response.data.data; // 로그인한 사용자 정보 store에 저장
                sessionStorage.setItem("memberNo", response.data.data.memberNo);
                sessionStorage.setItem("nickname", response.data.data.nickname);
                sessionStorage.setItem("isLoggedIn", true);
                router.push("/"); // 로그인 성공 시 메인 페이지로 이동
            },
            () => {
                alert("ID 또는 비밀번호가 일치하지 않습니다.");
            }
        );
    }
}
</script>

<template>
    <div class="user-wrap">
        <div class="wrap-left">
            <h1>금쪽이 해방일지</h1>
        </div>

        <div class="wrap-right">
            <div>
                <div class="user-title">LOGIN</div>
                <form @submit.prevent="submitForm">
                    <div class="login-box">
                        <input
                            type="text"
                            placeholder="ID"
                            v-model="loginInfo.memberId"
                        />
                        <input
                            type="password"
                            placeholder="PW"
                            v-model="loginInfo.password"
                        />
                        <button type="submit">로그인</button>
                        <div class="check-box">
                            <div class="check-box-left">
                                <label for="remember-check">
                                    <input
                                        type="checkbox"
                                        id="remember-check"
                                    />아이디 저장
                                </label>
                            </div>
                            <div class="check-box-right">
                                <a href="#">ID찾기 | PW찾기</a>
                            </div>
                        </div>
                        <a href="#" class="a-btn">카카오톡 계정으로 시작하기</a>
                        <router-link to="/member/signup" class="a-btn"
                            >회원가입</router-link
                        >
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.user-wrap {
    /* background-color: blanchedalmond; */
    display: grid;
    grid-template-columns: 40% 60%;
    height: 100vh;
}
.user-title {
    text-align: center;
    font-size: 3rem;
    color: #89b9ad;
}
.wrap-left {
    display: grid;
}
.wrap-right {
    display: grid;
    align-items: center;
}
.login-box {
    /* background-color: pink; */
    width: 35%;
    margin: 0 auto;
    padding-top: 1.2rem;
}
/* 로그인 박스 a태그 */
.login-box a,
label {
    color: #89b9ad;
}

/* 로그인 박스 input */
.login-box > input {
    width: 100%;
    padding: 0.8rem 0;
    box-sizing: border-box;
    border: 3px solid #89b9ad;
    background-color: inherit;
    border-radius: 10px;
    margin-top: 0.625rem;
    padding-left: 0.625rem;
}
.login-box > input::placeholder {
    padding-left: 0.625rem;
    color: #ddd;
}
/* .login-box > input:focus {
    display: none;
} */

/* 로그인 박스 button */
.login-box button {
    width: 100%;
    padding: 0.8rem 0;
    box-sizing: border-box;
    /* border: 3px solid #89B9AD; */
    background-color: #89b9ad;
    color: #fff;
    border: none;
    border-radius: 10px;
    margin-top: 0.625rem;
}

/* 로그인 박스 checkbox */
.check-box {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding-bottom: 1.875rem;
    padding-top: 0.625rem;
}

.check-box-right {
    justify-self: end;
}
.check-box span {
    text-align: right;
}

/* 로그인 a태그 버튼 */
.a-btn {
    display: block;
    width: 100%;
    text-align: center;
    padding: 0.8rem 0;
    border: 3px solid #89b9ad;
    margin-top: 0.625rem;
    background-color: inherit;
    border-radius: 10px;
}
</style>
