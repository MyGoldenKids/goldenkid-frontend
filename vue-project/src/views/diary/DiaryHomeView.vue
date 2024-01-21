<script setup>
import DiaryHeaderComponent from "@/components/diary/DiaryHeaderComponent.vue";
import DiaryNavComponent from "@/components/diary/DiaryNavComponent.vue";
import DiaryProfileComponent from "@/components/diary/DiaryProfileComponent.vue";
import DiaryCalendarComponent from "@/components/diary/DiaryCalendarComponent.vue";
import DiaryPreviewComponent from "@/components/diary/DiaryPreviewComponent.vue";
</script>

<template>
    <div class="diary">
        <DiaryNavComponent></DiaryNavComponent>
        <div>
            <DiaryHeaderComponent></DiaryHeaderComponent>
            <div class="diary-main">
                <DiaryProfileComponent></DiaryProfileComponent>
                <div class="diary-content">
                    <!--다이어리 홈 위젯 상단 -->
                    <div class="content-top">
                        <DiaryCalendarComponent></DiaryCalendarComponent>
                        <DiaryPreviewComponent></DiaryPreviewComponent>
                    </div>
                    <!--다이어리 홈 위젯 하단 -->
                    <div class="content-bottom">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.diary {
    border: 4px dashed #ad9478;
    text-align: center;
    border-radius: 10px;
    padding: 1.25rem;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 10% 90%;
    background-image: url(@/assets/img/diary.png);
    background-size: cover;
}
.diary-main {
    display: grid;
    grid-template-columns: 20% 80%;
    padding: 1.2rem;
}
.diary-content {
    /* background-color: peru; */
    padding: 0.313rem 1.2rem;
}

/* 컨텐츠 상위 영역 */
.content-top {
    /* background-color: aquamarine; */
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 1.2rem;
}

/* 컨텐츠 하위 영역 */
.content-bottom {
    /* background-color: cadetblue; */
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
</style>
