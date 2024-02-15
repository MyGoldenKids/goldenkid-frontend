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
        <div class="diary-title">
            <div v-if="childList.length === 0">
                <div class="diary-subtitle">등록된 금쪽이 정보가 없습니다.</div>
                <router-link :to="{ name: 'mypage' }" class="register-btn">금쪽이 등록하기</router-link>
            </div>
            <div v-else>어떤 아이에게 쓸까요?</div>
        </div>
        <div :class="{ 'child-list-1': childList.length <= 1, 'child-list-2': childList.length > 1 }">
            <div v-for="(child, index) in childList" :key="index" @click="goToDiaryWrite(child.childId)">
                <div class="profile-box">
                    <div class="profile-img">
                        <img src="@/assets/img/profile-bear-kid.png" alt="금쪽프로필" class="profile" />
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

.diary-subtitle {
    font-size: 2rem;
    margin-bottom: 4rem;
}

.register-btn {
    font-size: 1.5rem;
    color: #fff8f2;
    padding: 1.2rem 1.8rem;
    border-radius: 1.25rem;
    border: none;
    background-color: #89b9ad;
    box-sizing: border-box;
    box-shadow: 0rem 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
}

.register-btn:hover {
    background-color: #e1baad;
    transform: scale(1.1);

}

/* 아이 프로필 */
/* 1명일 때  */
.child-list-1 {
    width: 20%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
}

/* 2명일 때 */
.child-list-2 {
    width: 40%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
}

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
