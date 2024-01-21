<script setup>
import { ref } from "vue";

const attrs = ref([
    {
        key: "today",
        content: "purple",
        dates: new Date(),
    },
]);
</script>

<template>
    <!--다이어리 홈 위젯 상단 -->
    <div class="content-top">
        <!-- 캘린더 -->
        <div class="calendar">
            <VCalendar
                locale="ko"
                borderless
                transparent
                :max-date="new Date()"
                :attributes="attrs"
            ></VCalendar>
        </div>
        <!-- 미리보기 -->
        <div class="preview">
            <img src="../../assets/img/sticker5.png" class="sticker1" />
            <img src="../../assets/img/sticker5.png" class="sticker2" />
            <p class="preview-temp-text">
                캘린더 날짜를 누르면 해당 일자 게시글 미리보기를 여기서 볼 수
                있어요 :D
            </p>
        </div>
    </div>
</template>

<style scoped>
.content-top {
    /* background-color: aquamarine; */
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 1.2rem;
}

/* 캘린더 & 캘린더 미리보기 */
.calendar {
    width: 70%;
    height: 12.5rem;
    margin: 0 auto;
}
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
    width: 40%;
    font-size: 0.8rem;
}
.sticker1 {
    width: 7.5rem;
    position: absolute;
    top: 0;
    left: -1.875rem;
    transform: rotate(-25deg);
}
.sticker2 {
    width: 6.25rem;
    position: absolute;
    bottom: 0;
    right: -1.563rem;
    transform: rotate(-25deg);
}
</style>
