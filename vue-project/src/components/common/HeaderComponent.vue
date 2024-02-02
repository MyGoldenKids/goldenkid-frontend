r
<script setup>
import { useRoute } from "vue-router";
import { useMemberStore } from "@/stores/member-store";
import router from "@/router";
const route = useRoute();
const store = useMemberStore();

const logout = () => {
    store.isLoggedIn = false; // 로그인 여부 false로 갱신
    store.memberInfo = ""; // 로그인한 사용자 정보 초기화
    sessionStorage.clear(); // 세션
    router.push("/"); // 로그아웃 후 메인 페이지로 이동
};
</script>

<template>
    <div class="header">
        <div class="member">
            <div v-if="store.isLoggedIn" class="member-sub">
                <div>
                    <router-link to="/member/mypage">MY PAGE</router-link>
                </div>
                <div>
                    <a href="#" @click="logout">LOGOUT</a>
                </div>
            </div>
            <div v-else class="member-sub">
                <div>
                    <router-link
                        :class="{ active: route.path.startsWith('/member') }"
                        to="/member/login"
                        >LOGIN</router-link
                    >
                </div>
                <div>
                    <router-link
                        :class="{ active: route.path.startsWith('/member') }"
                        to="/member/signup"
                        >SIGNUP</router-link
                    >
                </div>
            </div>
        </div>
        <div class="logo">
            <router-link to="/"
                ><img src="@/assets/img/logo.png"
            /></router-link>
        </div>
        <div class="nav">
            <router-link
                class="menu-item"
                :class="{ active: route.path.startsWith('/jira') }"
                to="/jira/home"
                >JIRA</router-link
            >
            <router-link
                class="menu-item"
                :class="{ active: route.path.startsWith('/diary') }"
                to="/diary/home"
                >금쪽일기</router-link
            >
            <router-link
                class="menu-item"
                :class="{ active: route.path.startsWith('/survey') }"
                to="/survey"
                >진단</router-link
            >
            <router-link
                class="menu-item"
                :class="{ active: route.path.startsWith('/article') }"
                to="/article/list"
                >꿀팁</router-link
            >
        </div>
    </div>
</template>

<style scoped>
a {
    text-decoration: none;
    /* color: inherit; */
}

.header {
    /* background-color: pink; */
    padding: 50px 0 20px;
}
.nav {
    padding: 20px 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* 4개의 열을 생성합니다. 각 열의 너비는 동일하게 설정됩니다. */
    /* background-color: #333; */
    color: #fff;
    text-align: center;
    font-size: 1.125rem;
}

.logo {
    text-align: center;
}
.logo img {
    width: 50px;
}
.menu-item {
    /* background-color: bisque; */
    height: auto;
    background-image: url(../../assets/img/sticker2.png);
    background-size: cover;
    padding: 10px 0;
    margin: 0 50px;
    transition: background-image 0.3s ease;
}

.menu-item:hover {
    background-image: url(../../assets/img/sticker3.png);
}

.menu-item.active {
    background-image: url(../../assets/img/sticker3.png);
}

.member {
    display: grid;
}
.member-sub {
    justify-self: end;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.313rem;
}
.member-sub div a {
    padding: 0.4rem 0.625rem;
    border: 4px dotted #ad9478;
    text-align: center;
    border-radius: 10px;
}
.member-sub div a:hover {
    background-color: #ad9478;
    color: #fff;
    transition-duration: 0.5s;
}
</style>
