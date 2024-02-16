<script setup>
import { getDiaryDetail, getDraft } from "@/api/diary";
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
    getDiaryDetail(
        diaryStore.selectedDraftId,
        (response) => {
            diaryStore.draft = response.data.data;
            router.push({ name: "diary-write" });
        },
        () => {
            console.log("임시 저장된 일기를 불러올 수 없습니다.");
        }
    );
};
</script>

<template>
    <div class="diary-ing">
        <div class="item-title">
            <img src="../../assets/img/sticker-star.png" class="sticker-star" />
            <span>작성 중인 일기</span>
        </div>
        <!-- 임시저장 있을 때 -->
        <div v-if="draftList.length !== 0">
            <div
                class="diary-ing-sub"
                v-for="(draft, index) in draftList"
                :key="index"
            >
                <div class="ing-sub-left">
                    <div>
                        <span> {{ draft.diaryTitle }} </span>
                    </div>
                    <div>
                        <span class="ing-sub-date">{{ draft.createdAt }}</span>
                    </div>
                </div>
                <div class="ing-sub-right">
                    <button @click="goToWrite(index)" class="ing-btn">
                        작성하러가기 >
                    </button>
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
button {
    background-color: inherit;
}
.item-title {
    width: 90%;
    text-align: left;
    margin: 0 auto 0.625rem auto;
    display: grid;
    grid-template-columns: 13% auto;
    align-items: center;
}
.item-title span {
    font-family: "NanumNeuRisNeuRisCe";
    font-size: 2rem;
    font-weight: 900;
}
.sticker-star {
    width: 2.5rem;
}
.diary-ing-sub {
    display: grid;
    grid-template-columns: 65% auto;
    text-align: left;
    padding: 1.25rem 0 0.313rem 0.313rem;
    font-family: "NanumNeuRisNeuRisCe";
}
.diary-ing-sub span {
    font-family: "NanumNeuRisNeuRisCe";
    font-size: 1.5rem;
}
.ing-sub-left {
    width: 80%;
    margin: 0 auto;
    text-align: left;
}

.ing-sub-left span {
    margin-right: 1.25rem;
}
.ing-sub-left span.ing-sub-date {
    font-size: 1.2rem;
}
.ing-sub-right {
    font-size: 1.4rem;
}
.ing-sub-right button {
    font-family: "NanumNeuRisNeuRisCe";
    transform: scale(1);
    transition-duration: 0.3s;
}

.ing-sub-right button:hover {
    transform: scale(1.1);
    transition-duration: 0.3s;
}
.diary-ing-sub-not {
    width: 90%;
    margin: 0 auto;
    padding: 1.25rem 0;
    font-family: "NanumNeuRisNeuRisCe";
    font-size: 1.5rem;
}
</style>
