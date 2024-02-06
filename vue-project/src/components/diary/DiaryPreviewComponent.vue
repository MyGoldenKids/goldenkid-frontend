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
        <img src="../../assets/img/sticker5.png" class="sticker1" />
        <img src="../../assets/img/sticker5.png" class="sticker2" />
        <p class="preview-temp-text">
            {{ formatDate(store.date) }}<br /><br />
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
    height: 12.5rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #89b9ad;
    border-radius: 20px;
    position: relative;
}
.preview-temp-text {
    width: 70%;
    font-size: 1rem;
    line-height: 1.5;
}
.sticker1 {
    width: 7.5rem;
    position: absolute;
    top: 0;
    left: -1.875rem;
    transform: rotate(-40deg);
}
.sticker2 {
    width: 6.25rem;
    position: absolute;
    bottom: 0;
    right: -1.563rem;
    transform: rotate(-25deg);
}
</style>
