<script setup>
import { useMemberStore } from "@/stores/member-store";
import { onMounted, ref } from "vue";
import { getMemberDetail } from "@/api/member";

const store = useMemberStore();
const memberDetail = ref();
const memberNo = sessionStorage.getItem("memberNo");

onMounted(() => {
    getMemberDetail(
        memberNo,
        (response) => {
            memberDetail.value = response.data.data;
        },
        () => {
            console.log("회원정보를 가져올 수 없습니다.");
        }
    );
});
</script>

<template>
    <div>{{ memberDetail }}</div>
</template>

<style scoped></style>
