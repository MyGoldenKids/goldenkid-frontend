<script setup>
import { getChildList } from "@/api/child";
import { createDiary } from "@/api/diary";
import { ref, onMounted } from "vue";
import { useMemberStore } from "@/stores/member-store";
import { useDiaryStore } from "@/stores/diary-store";
import router from "@/router";
const memberStore = useMemberStore();
const diaryStore = useDiaryStore();
const childList = ref([]);


onMounted(() => {
    getChild(memberStore.memberInfo.memberNo);
});

// 아이 정보 가져오기
const getChild = (memberNo) => {
    getChildList(memberNo, (response) => {
        childList.value = response.data.data;
    }).catch((error) => {
        console.log(error);
    });
};

// 일기 작성하러 가기
const goToDiaryWrite = (child) => {
    // 일기 생성
    createDiary(
        {
            memberId: memberStore.memberInfo.memberNo,
            childId: child,
        },
        (response) => {
            diaryStore.createdDiaryId = response.data.data;
            // 생성 성공하면 작성 페이지로 이동
            router.push({ name: "diary-write" });
        },
        (error) => {
            console.log(error);
        }
    );
};
</script>

<template>
    <div class="child-list">
        <div v-for="(child, index) in childList" :key="index">
            <button @click="goToDiaryWrite(child.childId)">
                {{ child.childName }}
                <div v-if="child.childGender">남아</div>
                <div v-else>여아</div>
            </button>
        </div>
    </div>
</template>

<style scoped>
.child-list button {
    margin-bottom: 3rem;
}
</style>
