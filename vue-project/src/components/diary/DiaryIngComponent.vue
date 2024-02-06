<script setup>
import { getDraft } from "@/api/diary";
import { ref, onMounted } from "vue";
import { useMemberStore } from "@/stores/member-store";
import { useDiaryStore } from "@/stores/diary-store";
import router from "@/router";
const memberStore = useMemberStore();
const diaryStore = useDiaryStore();
const draftList = ref([]);

onMounted(() => {
    getDraft(
        memberStore.memberInfo.memberNo,
        (response) => {
            draftList.value = response.data.data;
        },
        () => {
            console.log("임시저장 목록을 불러올 수 없습니다.");
        }
    );
});

const goToWrite = (index) => {
    diaryStore.selectedDraftId = draftList.value[index].diaryId;
    router.push({ name: "diary-write" });
};
    
</script>

<template>
    <div class="diary-ing">
        <div class="item-title">작성 중인 일기</div>
        <!-- 임시저장 있을 때 -->
        <div v-if="draftList.length !== 0">
            <div
                class="diary-ing-sub"
                v-for="(draft, index) in draftList"
                :key="index"
            >
                <div class="ing-sub-left">
                    <div>
                    <button @click="goToWrite(index)">
                        <span>#{{ draft.diaryId }} </span>
                        <span> {{ draft.diaryTitle }} </span>
                    </button>
                    </div>
                    <div class="ing-sub-date">{{ draft.createdAt }}</div>
                </div>
                <div class="ing-sub-right">
                    <button class="ing-btn">작성 중</button>
                </div>
                
            </div>
        </div>
        <!-- 임시저장 없을 때 -->
        <div v-else>
            <div class="diary-ing-sub-not">작성 중인 일기가 없습니다.</div>
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

/* 작성중인 일기 */
.diary-ing-sub {
    width: 70%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 75% 25%;
    text-align: left;
    border-bottom: 3px solid #89b9ad;
    padding: 1.25rem 0 0.313rem 0.313rem;
}
.ing-sub-date {
    padding-left: 1rem;
    padding-top: 0.5rem;
    font-size: 0.8rem;
}
.ing-btn {
    border: none;
    background-color: #89b9ad;
    color: #ffffff;
    padding: 0.313rem 0.625rem;
    border-radius: 20px;
    font-size: 0.8rem;
}
.diary-ing-sub-not {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    padding-top: 1.25rem;
}
</style>
