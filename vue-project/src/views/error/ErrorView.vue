<script setup></script>

<template>
    <div class="wrap">
        <div class="title">페이지를 찾을 수 없습니다.</div>
        <div class="sub-title">
        요청하신 페이지가 제거되었거나, 이름이 변경되었거나, 일시적으로 사용이 중단되었습니다.
        </div>
        <router-link to="/">홈으로</router-link>
    </div>
</template>

<style scoped>
.wrap {
    padding-top: 6.25rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh; /* 가운데 정렬을 위한 전체 뷰포트 높이 설정 */
}

.wrap .title {
    font-size: 5rem;
    margin: 0 0 5rem 0;
}

.wrap .sub-title {
    font-size: 1.5rem;
    margin: 0 0 5rem 0;
}

a {
    padding: 1.25rem 2.5rem;
    font-size: 1.6rem;
    color: #FFF;
    border-radius: 1.2rem;
    background-color: #89B9AD
}
</style>
