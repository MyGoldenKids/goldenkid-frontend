<script setup>
import DiaryNavComponent from "@/components/diary/DiaryNavComponent.vue";
import DiaryWriteComponent from "@/components/diary/DiaryWriteComponent.vue";
</script>

<template>
    <div class="diary-wrap">
        <DiaryNavComponent></DiaryNavComponent>
        <DiaryWriteComponent></DiaryWriteComponent>
    </div>
</template>

<style scoped>
.diary-wrap {
    border: 0.25rem dashed #ad9478;
    text-align: center;
    border-radius: 0.625rem;
    padding: 1.25rem;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 10% 90%;
    background-image: url(@/assets/img/diary.png);
    background-size: cover;
}
</style>
