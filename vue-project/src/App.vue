<script setup>
import HeaderComponent from "./components/common/HeaderComponent.vue";
import FooterComponent from "./components/common/FooterComponent.vue";
import "./assets/css/common.css";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// 현재 라우터 경로가 로그인, 회원가입 또는 마이페이지인지 확인하는 계산된 속성
const isLoginPage = computed(() => route.name === "login");
const isSignupPage = computed(() => route.name === "signup");
const isMyPage = computed(() => route.name === "mypage");
const isErrorPage = computed(() => route.name === "NotFound");
</script>

<template>
    <div class="app-container">
        <div v-if="!isLoginPage && !isSignupPage && !isMyPage && !isErrorPage">
            <div class="wrap">
                <HeaderComponent></HeaderComponent>
                <RouterView></RouterView>
                <FooterComponent></FooterComponent>
            </div>
        </div>
        <div v-else>
            <RouterView></RouterView>
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
    font-family: "NanumNeuRisNeuRisCe";
    src: url("assets/fonts/NanumNeuRisNeuRisCe.ttf");
}
@font-face {
    font-family: 'Jalnan';
    src: url('assets/fonts/Jalnan2TTF.ttf');
    font-weight:lighter;
    font-style: normal;
}
</style>
