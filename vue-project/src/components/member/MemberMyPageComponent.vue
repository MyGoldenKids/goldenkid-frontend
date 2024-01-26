<script setup>
import { onMounted, ref } from "vue";
import {
    getMemberDetail,
    modifyMemberDetail,
    deleteMember,
} from "@/api/member";

const memberNo = sessionStorage.getItem("memberNo");
const memberDetail = ref({
    memberNo: memberNo,
    password: "",
    nickname: "",
    phoneNumber: "",
});
onMounted(() => {
    getMemberDetail(
        memberNo,
        (response) => {
            memberDetail.value.nickname = response.data.data.nickName;
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
            console.log("회원정보 수정 성공");
        },
        () => {
            console.log("회원정보 수정 실패");
        }
    );
}
</script>

<template>
    <div>{{ memberDetail }}</div>
    <div>
        <form @submit.prevent="submitForm">
            <input type="password" v-model="memberDetail.password" />
            <br />
            <input type="text" v-model="memberDetail.nickname" />
            <br />
            <input type="tel" v-model="memberDetail.phoneNumber" />
            <br />
            <button type="submit">수정</button>
        </form>
    </div>
    <button @click="deleteMember(memberNo)">탈퇴</button>
</template>

<style scoped></style>
