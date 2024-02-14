<script setup>
import DiaryNavComponent from "@/components/diary/DiaryNavComponent.vue";
import DiaryCalendarComponent from "@/components/diary/DiaryCalendarComponent.vue";
import DiaryPreviewComponent from "@/components/diary/DiaryPreviewComponent.vue";
import DiaryListComponent from "@/components/diary/DiaryListComponent.vue";
import DiaryIngComponent from "@/components/diary/DiaryIngComponent.vue";
</script>

<template>
    <div class="diary">
        <DiaryNavComponent></DiaryNavComponent>
        <div>
            <div class="diary-main">
                <div class="diary-content">
                    <div class="content-left">
                        <img
                            src="../../assets/img/sticker1.png"
                            class="sticker1"
                        />
                        <div>
                            <DiaryCalendarComponent></DiaryCalendarComponent>
                        </div>
                        <div>
                            <DiaryPreviewComponent></DiaryPreviewComponent>
                        </div>
                    </div>
                    <div class="content-right">
                        <div>
                            <DiaryListComponent></DiaryListComponent>
                        </div>
                        <div>
                            <DiaryIngComponent></DiaryIngComponent>
                        </div>
                    </div>
                    <img
                        src="../../assets/img/sticker-bear1.png"
                        class="sticker2"
                    />
                    <img
                        src="../../assets/img/sticker-rabbit.png"
                        class="sticker3"
                    />
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
    padding: 1.2rem;
}

.diary-content {
    padding: 0.313rem 1.2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    position: relative;
}

.content-left {
    width: 80%;
    margin: 0 auto;
    padding: 50px 0;
    border-radius: 10px;
    background-color: #fff8f2;
    display: grid;
    position: relative;
}

.content-right {
    padding: 50px 0 0 0;
    display: grid;
}
.sticker1 {
    width: 3.5rem;
    position: absolute;
    top: -5%;
    left: 40%;
}
.sticker2 {
    width: 9rem;
    position: absolute;
    bottom: 0;
    left: 0;
}
.sticker3 {
    width: 6rem;
    position: absolute;
    bottom: -5%;
    right: -4%;
}
</style>
