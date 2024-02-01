<script setup>
import DiaryNavComponent from "@/components/diary/DiaryNavComponent.vue";
import DiaryDetailListComponent from "@/components/diary/DiaryDetailListComponent.vue";
</script>

<template>
    <div class="diary-wrap">
        <DiaryNavComponent></DiaryNavComponent>
        <DiaryDetailListComponent></DiaryDetailListComponent>
    </div>
</template>

<style scoped>
.diary-wrap {
    border: 4px dashed #AD9478;
    text-align: center;
    border-radius: 10px;
    padding: 1.25rem;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 10% 90%;
    background-image: url(@/assets/img/diary.png);
    background-size: cover;
}
</style>