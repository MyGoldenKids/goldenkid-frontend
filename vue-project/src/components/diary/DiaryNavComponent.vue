<script setup></script>

<template>
    <div class="diary-nav">
        <ul>
            <li>
                <a href="#">
                    <img src="@/assets/img/house.png" alt="홈" class="icon" />
                    <span class="icon-text">홈</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <img
                        src="@/assets/img/marker.png"
                        alt="일기쓰기"
                        class="icon"
                    />
                    <span class="icon-text">일기쓰기</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="@/assets/img/book.png" alt="일기모음" class="icon" />
                    <span class="icon-text">일기모음</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <img
                        src="@/assets/img/analyze.png"
                        alt="일기추출"
                        class="icon"
                    />
                    <span class="icon-text">일기추출</span>
                </a>
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
.icon:hover {
    background-color: #ad9478;
    transition-duration: 0.5s;
}
.icon-text {
    font-size: 0.813rem;
}
</style>
