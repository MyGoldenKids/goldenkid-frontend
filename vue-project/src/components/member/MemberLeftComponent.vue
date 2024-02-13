<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import logo from '@/assets/img/mainbear.png';

const router = useRouter();
const bgImage = ref(logo);

const goMain = () => {
    router.push("/");
};
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
    left: 0;
    bottom: 0;
    width: 100%;
    height: 60%;
    background-size: cover;
    background-position: center;
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