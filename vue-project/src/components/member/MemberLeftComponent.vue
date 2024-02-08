<script setup>
import { ref } from 'vue';
import logo from '@/assets/img/mainbear.png';

const bgImage = ref(logo);
</script>

<template> 
    <div class="wrap-left" :style="{ backgroundImage: `url(${bgImage})`}">
        <button class="center-button">금쪽이 해방일지</button>
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