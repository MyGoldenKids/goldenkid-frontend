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
const memberNo = sessionStorage.getItem("memberNo");
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
            sessionStorage.setItem("nickname", memberDetail.value.nickname);
            store.memberInfo.nickname = memberDetail.value.nickname;
            alert("회원정보가 변경되었습니다.")
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
    sessionStorage.clear(); // 세션 storage 초기화
    router.push("/"); // 탈퇴 후 메인 페이지로 이동
}
</script>

<template>
    <div>닉네임: {{ memberDetail.nickname }}</div>
    <div>연락처: {{ memberDetail.phoneNumber }}</div>
    <form @submit.prevent="submitForm">
        <input
            type="password"
            placeholder="현재 비밀번호"
            v-model="memberDetail.password"
        />
        <br />
        <input
            type="password"
            placeholder="새 비밀번호"
            v-model="memberDetail.newPassword"
        />
        <br />
        <input
            type="text"
            placeholder="닉네임"
            v-model="memberDetail.nickname"
        />
        <br />
        <input
            type="tel"
            placeholder="연락처"
            v-model="memberDetail.phoneNumber"
        />
        <br />
        <button type="submit">수정</button>
    </form>

    <button @click="signOut(memberNo)">탈퇴</button>
</template>

<style scoped></style>
