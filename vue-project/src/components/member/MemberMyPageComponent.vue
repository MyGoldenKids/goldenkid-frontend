<script setup>
import { onMounted, ref } from "vue";
import {
    getMemberDetail,
    modifyMemberDetail,
    deleteMember,
} from "@/api/member";
import { useMemberStore } from "@/stores/member-store";
import router from "@/router";
const store = useMemberStore();
const memberNo = store.memberInfo.memberNo;
const memberDetail = ref({
    memberNo: memberNo,
    password: "", 
    newPassword: "", 
    nickname: "",
    phoneNumber: "",
});
onMounted(() => {
    getMemberDetail(
        memberNo,
        (response) => {
            memberDetail.value.nickname = response.data.data.nickname;
            memberDetail.value.phoneNumber = response.data.data.phoneNumber;
        },
        () => {
            console.log("회원정보를 가져올 수 없습니다.");
        }
    );
});

function submitForm() {
    // TO DO: 회원정보 수정 form의 로직 추가
    modifyMemberDetail(
        memberDetail,
        () => {
            // 회원정보 수정 시 수정한 닉네임으로 업데이트
            store.memberInfo.nickname = memberDetail.value.nickname;
            alert("회원정보가 변경되었습니다.");
        },
        () => {
            alert("비밀번호가 일치하지 않습니다.");
        }
    );
}

function signOut(memberNo) {
    deleteMember(memberNo);
    store.isLoggedIn = false; // 로그인 여부 false로 갱신
    store.memberInfo = ""; // 로그인한 사용자 정보 초기화
    router.push("/"); // 탈퇴 후 메인 페이지로 이동
}
</script>

<template>
    <!-- 엄마 -->
    <div class="mypage-grid">
        <div class="mom-box">
            <img src="@/assets/img/bear-profile.png" alt="금쪽프로필" />
            <p>{{ memberDetail.nickname }}</p>
            <p>{{ memberDetail.phoneNumber }}</p>
        </div>
    </div>
    <!-- 버튼 -->
    <div class="mypage-grid">
        <div class="btn-box">
            <button @click="regist">내정보 수정</button>
        </div>
    </div>
</template>

<style scoped>
.mypage-grid {
    width: 50%;
    margin: 0 auto;
}
/* 엄마 정보 */
.mom-box {
    width: 50%;
    margin: 0 auto;
    background-color: #89b9ad;
    text-align: center;
    border-radius: 1.87rem;
    color: #fff;
    padding: 0.625rem 0;
}
.mom-box img {
    width: 50%;
}
.mom-box p {
    margin: 0.625rem 0;
    font-size: 1.1rem;
}

/* 버튼 */
.btn-box {
    width: 50%;
    margin: 0 auto;
}
.btn-box button {
    width: 100%;
    border: none;
    height: 2.5rem; 
    border: 3px solid #ad9478;
    background-color: inherit;
    border-radius: 0.625rem;
    margin-top: 0.625rem;
}
.btn-box button:hover {
    background-color: #ad9478;
    color: #fff;
    transition-duration: 0.5s;
}
</style>
