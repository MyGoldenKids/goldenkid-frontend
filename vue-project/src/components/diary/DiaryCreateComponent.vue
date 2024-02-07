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
    <div class="diary-main">
    <div class="diary-title">어떤 금쪽이에게 쓸까요?</div>
    <div class="child-list child box-2">
        <div v-for="(child, index) in childList" :key="index" @click="goToDiaryWrite(child.childId)">
            <div class="profile-box">
                <div class="profile-img">
                    <img src="@/assets/img/bear-profile.png" alt="프로필" class="profile"/>
                </div>
                <div class="profile-text">
                    <h1>{{ child.childName }}</h1>
                    <p>
                    <div v-if="child.childGender">남자</div>
                    <div v-else>여자</div>
                    </p>
                <p>{{ child.childBirth }}</p>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<style scoped>
.diary-main {
    display: grid;
    padding: 1.2rem;
}
.diary-title {
    font-size: 2rem;
    margin: 2.5rem 0;
}

/* 아이 프로필 */
.child-list {
    width: 40%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
}

/* 1명일 때  */
/* .child-box-1 {
    display: grid;
    grid-template-columns: 1fr;
} */

.profile-box {
    padding: 0.625rem;
    background-color: inherit;
    border-radius: 1.25rem;
    border: 4px solid #AD9478;
    box-shadow: rgba(0, 0, 0, 0.2);
    scale: 1;
    transition-duration: 0.5s;
    box-sizing: border-box;
}

.profile-img img {
    width: 80%;
}

.profile-text h1 {
    font-size: 1.2rem
}

.profile-text p {
    font-size: 1rem;
    margin: 0.5rem 0;
}

.profile-box:hover {
    scale: 1.1;
    transition-duration: 0.5s;
}
</style>
