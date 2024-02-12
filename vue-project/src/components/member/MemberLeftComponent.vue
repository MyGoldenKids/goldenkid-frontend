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
    <div class="wrap-left" :style="{ backgroundImage: `url(${bgImage})`}">
        <button @click="goMain" class="center-button">금쪽이 해방일지</button>
    </div>
</template>

<style scoped>
.wrap-left {    
    display: grid;
    align-items: center;
    justify-items: center;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: left bottom;
}

.center-button {
    transform: translateY(-2000%);
    background-color: #fff8f2;
    width: 10.63rem;
    height: 3.125px;
    font-size: 1.25rem;
}
</style>