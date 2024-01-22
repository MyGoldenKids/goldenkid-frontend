<script setup>
import { useRouter } from "vue-router";
const route = useRouter();

</script>

<template>
    <div class="diary-nav">
        <ul>
            <li>
                <router-link to="/diary/home">
                    <img
                        src="@/assets/img/house.png"
                        alt="홈"
                        class="icon"
                        :class="{
                            active:
                                route.currentRoute.value.path === '/diary/home',
                        }"
                    />
                    <span class="icon-text">홈</span>
                </router-link>
            </li>
            <li>
                <router-link to="/diary/write">
                    <img
                        src="@/assets/img/marker.png"
                        alt="일기쓰기"
                        class="icon"
                        :class="{
                            active:
                                route.currentRoute.value.path ===
                                '/diary/write',
                        }"
                    />
                    <span class="icon-text">일기쓰기</span>
                </router-link>
            </li>
            <li>
                <router-link to="/diary/list">
                    <img
                        src="@/assets/img/book.png"
                        alt="일기모음"
                        class="icon"
                        :class="{
                            active:
                                route.currentRoute.value.path === '/diary/list',
                        }"
                    />
                    <span class="icon-text">일기모음</span>
                </router-link>
            </li>
            <li>
                <router-link to="/diary/extract">
                    <img
                        src="@/assets/img/analyze.png"
                        alt="일기추출"
                        class="icon"
                        :class="{
                            active:
                                route.currentRoute.value.path ===
                                '/diary/extract',
                        }"
                    />
                    <span class="icon-text">일기추출</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.diary-nav {
    border-right: 3px dashed #ad9478;
    padding: 2.5rem 1.25rem 0 0;
    box-sizing: border-box;
}
.diary-nav ul li {
    padding: 0.625rem 0;
}
.icon {
    border: 2px solid #ad9478;
    border-radius: 3.125rem;
    padding: 0.313rem;
    display: block;
    margin: 0 auto;
}
.icon:hover,
.icon.active {
    background-color: #ad9478;
    transition-duration: 0.5s;
}
.icon-text {
    font-size: 0.813rem;
}
</style>
