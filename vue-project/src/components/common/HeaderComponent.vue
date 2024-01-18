<script setup></script>

<template>
    <div class="header">
        <div class="logo">
            <a href="/"><img src="@/assets/img/logo.png" /></a>
        </div>
        <div class="nav">
            <div class="menu-item"><a href="#">금쪽일기</a></div>
            <div class="menu-item"><a href="#">꿀팁</a></div>
            <div class="menu-item"><a href="#">진단</a></div>
            <div class="menu-item"><a href="#">주변병원</a></div>
        </div>
    </div>
</template>

<style scoped>
a {
    text-decoration: none;
    color: inherit;
}

a:hover {
    font-weight: 700;
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
</style>
