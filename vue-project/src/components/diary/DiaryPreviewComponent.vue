<script setup>
import { useCalendarStore } from "@/stores/calendar-store";
import { useDiaryStore } from "@/stores/diary-store";
import { ref, watch } from "vue";

const store = useCalendarStore();
const diaryStore = useDiaryStore();

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}; 
</script>

<template>
    <!-- 미리보기 -->
    <div class="preview">
        <p class="preview-temp-text">
            <p class="preview-date">{{ formatDate(new Date(store.date)) }}</p>
            <!-- 해당 날짜에 작성한 일기가 없는 경우 -->
            <div v-if="diaryStore.preview.length === 0"> 
                캘린더 날짜를 누르면 해당 일자 게시글 미리보기를 여기서 볼 수 있어요 :D
            </div>
            <!-- 해당 날짜에 작성한 일기가 있는 경우 -->
            <div v-else>
                <div v-for="(diary, index) in diaryStore.preview" :key="index">
                    #{{ diary.diaryId }} {{ diary.diaryTitle }}
                </div>
            </div>
        </p>
    </div>
</template>

<style scoped>
.preview {
    width: 70%;
    height: 13.5rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1.25rem;
    font-family: "NanumNeuRisNeuRisCe";
    font-size: 1.5rem;
}

.preview-temp-text div {
    font-size: 1.5rem;
    margin-bottom: 1.2rem;
}
.preview-date {
    font-size: 1.7rem;
    margin-bottom: 1.2rem;
    background-color: rgba(225, 186, 173, 0.2);
    border-radius: 5px;
}
</style>
