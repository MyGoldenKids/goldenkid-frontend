<script setup>

</script>

<template>
    <!-- 미리보기 -->
    <div class="preview">
        <img src="../../assets/img/sticker5.png" class="sticker1" />
        <img src="../../assets/img/sticker5.png" class="sticker2"/>
        <p class="preview-temp-text">
            캘린더 날짜를 누르면
            해당 일자 게시글 미리보기를
            여기서 볼 수 있어요 :D
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
    background-color: #89B9AD;
    border-radius: 20px;
    position: relative;
}
.preview-temp-text {
    width: 70%;
    font-size: 1.0rem;
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