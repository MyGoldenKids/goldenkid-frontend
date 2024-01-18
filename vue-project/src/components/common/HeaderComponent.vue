<script setup></script>

<template>
    <div class="header">
        <div class="member">
                <!-- 로그인 했을 때 -->
                <div class="member-sub">
                    <div>
                        <a href="#">MY PAGE</a> 
                    </div>
                    <div>
                        <a href="#">LOGOUT</a>
                    </div>
                </div>
            </div>
        <div class="logo">
            <router-link to="/"><img src="@/assets/img/logo.png" /></router-link>
        </div>
        <div class="nav">
            <div class="menu-item"><a href="#">금쪽일기</a></div>
            <div class="menu-item"><router-link to="/article/list">꿀팁</router-link></div>
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

.member {
    display: grid;
}
.member-sub {
    justify-self: end;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.313rem;
}
.member-sub div a{
    padding: 0.4rem 0.625rem;
    border: 4px dotted #AD9478;
    text-align: center;
    border-radius: 10px;
}
.member-sub div a:hover {
    background-color: #AD9478;
    color: #fff;
    transition-duration: 0.5s;
}

</style>
