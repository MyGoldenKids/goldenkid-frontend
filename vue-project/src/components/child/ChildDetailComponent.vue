<script setup>
import { getChildInfo } from "@/api/child";
import { ref, onMounted } from "vue";
const childInfo = ref("");
onMounted(() => {
    getChildInfo(24, (response) => {
        childInfo.value = response.data.data;
    }).catch((error) => {
        console.log(error);
    });
});

const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");

    return `${year}년 ${month}월 ${day}일`;
};
</script>

<template>
    <div class="child-wrap">
        이름 : {{ childInfo.childName }}
        <br />
        생년월일 : {{ formatDate(childInfo.childBirth) }}
        <br />
        <div v-if="childInfo.childGender">성별 : 남자</div>
        <div v-else>성별 : 여자</div>
    </div>
</template>

<style scoped></style>
