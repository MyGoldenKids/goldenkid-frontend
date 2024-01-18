<script setup>
import HeaderComponent from "./components/common/HeaderComponent.vue";
import FooterComponent from "./components/common/FooterComponent.vue";
import "./assets/css/common.css";
</script>

<template>
    <div class="app-container">
        <div class="wrap">
            <HeaderComponent></HeaderComponent>
            <RouterView></RouterView>
            <FooterComponent></FooterComponent>
        </div>
    </div>
</template>

<style scoped>
.app-container {
    background-color: #fff8f2;
}

.wrap {
    max-width: 75rem;
    margin: 0 auto;
}

@font-face {
    font-family: "BMDOHYEON";
    src: url("assets/fonts/BMDOHYEON_ttf.ttf");
}
</style>
