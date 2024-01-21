<script setup>
import DiaryHeaderComponent from "@/components/diary/DiaryHeaderComponent.vue";
import DiaryNavComponent from "@/components/diary/DiaryNavComponent.vue";
import DiaryProfileComponent from "@/components/diary/DiaryProfileComponent.vue";
</script>

<template>
    <DiaryHeaderComponent></DiaryHeaderComponent>
    <div class="diary">
        <DiaryNavComponent></DiaryNavComponent>
        <div class="diary-main">
            <DiaryProfileComponent></DiaryProfileComponent>
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
</style>
