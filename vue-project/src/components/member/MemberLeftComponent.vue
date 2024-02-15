<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import logo1 from '@/assets/img/logo-mypage1.png';
import logo2 from '@/assets/img/logo-mypage2.png';

const router = useRouter();
const bgImage = ref(logo1);

const goMain = () => {
    router.push("/");
};

// 배경 이미지를 전환하는 함수입니다.
const switchBackgroundImage = () => {
    bgImage.value = bgImage.value === logo1 ? logo2 : logo1;
};

// 컴포넌트가 마운트될 때 인터벌을 설정합니다.
onMounted(() => {
    const intervalId = setInterval(switchBackgroundImage, 1000); // 1초마다 배경 이미지를 전환합니다.

    // 컴포넌트가 언마운트될 때 인터벌을 제거합니다.
    onUnmounted(() => {
        clearInterval(intervalId);
    });
});
</script>

<template>
    <div class="wrap-left">
        <div class="background-img" :style="{ backgroundImage: `url(${bgImage})` }"></div>
        <button @click="goMain" class="center-button">금쪽이 해방일지</button>
    </div>
</template>

<style scoped>
.wrap-left {
    position: relative;
}

.background-img {
    position: absolute;
    left: -5%;
    bottom: -1%;
    width: 90%;
    height: 90%;
    background-size: contain;
    background-position: bottom;
    background-repeat: no-repeat;
}

.center-button {
    position: absolute;
    top: 40%;
    left: 50%;
    background-color: inherit;
    font-size: 3rem;
    font-weight: 900;
    font-family: 'NanumNeuRisNeuRisCe';
    transform: scale(1);
    transition-duration: 0.3s;
}

.center-button:hover {
    transform: scale(1.2);
    transition-duration: 0.3s;
}
</style>