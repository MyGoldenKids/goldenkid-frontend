<script setup>
import { ref, onMounted } from "vue";
import { getDiaryList } from "@/api/diary";
import { useMemberStore } from "@/stores/member-store";
import { useDiaryStore } from "@/stores/diary-store";
const memberStore = useMemberStore();
const diaryStore = useDiaryStore();
const diaryList = ref([]);

onMounted(() => {
    getDiaryList(
        memberStore.memberInfo.memberNo,
        (response) => {
            diaryList.value = response.data.data;
        },
        () => {
            console.log("다이어리 목록을 불러올 수 없습니다.");
        }
    );
});

const goToDiaryList = (diaryId) => {
    diaryStore.diaryId = diaryId;
}
</script>

<template>
    <div>
        <div class="diary-list">
            <div class="item-title">최근 나의 일기</div>
            <div class="diary-list-sub">
                <ul>
                    <li v-for="(diary, index) in diaryList" :key="index">
                        <router-link :to="{name: 'diary-list'}" @click="goToDiaryList(diary.diaryId)">
                            <span>#{{ diary.diaryId }}</span>
                            <span>{{ diary.diaryTitle }}</span>
                            <span>{{ diary.createdAt }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 컨텐츠들 타이틀 */
.item-title {
    width: 50%;
    border-bottom: 3px solid #89b9ad;
    padding-bottom: 0.313rem;
    margin: 0 auto 1.2rem auto;
}
/* 최근 나의 일기 */
.diary-list-sub {
    /* padding-top: 0.625rem; */
    width: 90%;
    margin: 0 auto;
}
.diary-list-sub li {
    /* background-color: #dfdfdf; */
    width: 80%;
    border-radius: 20px;
    padding: 0.4rem;
    margin: 0.2rem auto;
    border: 2px solid #89b9ad;
}
.diary-list-sub span {
    font-size: 0.8rem;
    padding-left: 0.3rem;
    color: #89b9ad;
}

a {
    text-decoration-line: none;
}
</style>
