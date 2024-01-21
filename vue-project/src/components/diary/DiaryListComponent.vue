<script setup>

</script>

<template>
    <div>
        <div class="diary-list">
            <div class="item-title">최근 나의 일기</div>
            <div class="diary-list-sub">
                <ul>
                    <li>
                        <a href="#">
                            <span>#183</span>
                            <span>좋은 부모란 무엇인가 ?</span>
                            <span>Jan 10</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span>#183</span>
                            <span>좋은 부모란 무엇인가 ?</span>
                            <span>Jan 10</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span>#183</span>
                            <span>좋은 부모란 무엇인가 ?</span>
                            <span>Jan 10</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span>#183</span>
                            <span>좋은 부모란 무엇인가 ?</span>
                            <span>Jan 10</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
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
/* 최근 나의 일기 */
.diary-list-sub {
    /* padding-top: 0.625rem; */
    width: 90%;
    margin: 0 auto;
}
.diary-list-sub li {
    /* background-color: #dfdfdf; */
    width: 80%;
    border-radius: 20px;
    padding: 0.4rem;
    margin: 0.2rem auto;
    border: 2px solid #89B9AD;
}
.diary-list-sub span {
    font-size: 0.8rem;
    padding-left: 0.3rem;
    color: #89B9AD;
}
</style>