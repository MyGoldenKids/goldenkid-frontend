<script setup>

</script>

<template>
    <div class="diary-ing">
        <div class="item-title">작성 중인 일기</div>
        <!-- 임시저장 있을 때 -->
        <div class="diary-ing-sub">
            <div class="ing-sub-left">
                <div>
                    <span>#183 </span>
                    <span>우리 금쪽이 최고잉</span>
                </div>
                <div class="ing-sub-date">2024.01.20</div>
            </div>
            <div class="ing-sub-right">
                <button class="ing-btn">작성 중</button>
            </div>
        </div>
        <!-- 임시저장 없을 때 -->
        <!-- <div class="diary-ing-sub-not">
            작성 중인 일기가 없습니다.
        </div> -->
    </div>
</template>

<style scoped>
/* 컨텐츠들 타이틀 */
.item-title {
    width: 50%;
    border-bottom: 3px solid #89B9AD;
    padding-bottom: 0.313rem;
    margin: 0 auto 1.2rem auto;
}

/* 작성중인 일기 */
.diary-ing-sub {
    width: 70%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 75% 25%;
    text-align: left;
    border-bottom: 3px solid #89B9AD;
    padding: 1.25rem 0 0.313rem 0.313rem;
}
.ing-sub-date {
    padding-left: 1rem;
    padding-top: 0.5rem;
    font-size: 0.8rem;
}
.ing-btn {
    border: none;
    background-color: #89B9AD;
    color: #ffffff;
    padding: 0.313rem 0.625rem;
    border-radius: 20px;
    font-size: 0.8rem;
}
.diary-ing-sub-not {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    padding-top: 1.25rem;
}
</style>