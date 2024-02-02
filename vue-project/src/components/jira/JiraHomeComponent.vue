<script setup>

</script>

<template>
    <div>
        <div class="jira-wrap">
            <div class="jira-dash">
                <div class="jira-home-header">JIRA</div>
                <div class="main-title">내가 <span>직접</span> 만들어나가는 나와 내 아이의 <span>일주일</span></div>
                <div class="title-line"></div>
                <div class="jira-subtitle">한 치 앞도 모르는 육아 생활! 앞으로의 일주일을 미리 계획하고 싶진 않으신가요?</div>
                <div class="content">
                    <p><span>금쪽이 해방일지</span>는 아이와 함께할 일주일을 계획하는 도구입니다.</p>
                    <p>미리 일정을 짜면서 특별한 순간들을 예측하고, 일상에 색다른 기대감을 더해보세요.</p>
                    <p>앞으로의 일주일이 지난 일주일보다 빛날 거예요.</p>
                </div>
                <div class="button-wrap">
                    <button class="btn">
                        <div>아직 계획이 없다면?</div>
                        <div>계획하기</div>
                    </button>
                    <button class="btn">
                        <div>등록한 계획이 있다면?</div>
                        <div>관리하기</div>
                    </button>
                </div>
            </div>
        </div>
    </div>        
</template>

<style scoped>
.jira-wrap {
    background-color: #AD9478;
    text-align: center;
    border-radius: 1.25rem;
    padding: 1.25rem;
    box-sizing: border-box;
}

.jira-dash {
    border: 4px dashed #665031;
    display: grid;
    justify-items: center;
    border-radius: 1.25rem;
}

.jira-home-header {
    width: 10.25rem;
    height: auto;
    background-image: url(@/assets/img/sticker9.png);
    background-size: cover;
    padding: 0.438rem 0;
    color: #AD9478;
    font-size: 1.5rem;
    margin: 2rem 0;
}

.main-title {
    color: #FFF8F2;
    font-size: 2.4rem;
    margin-bottom: 2rem;
}

.title-line {
    width: 23.188rem;
    border-bottom: 0.25rem solid #665031;
    margin-bottom: 3.7rem;
}

.jira-subtitle {
    color: #FFF8F2;
    font-size: 1.6rem;
    margin-bottom: 0.7rem;
}

.content {
    color: #FFF8F2;
    font-size: 1.35rem;
}

.content p {
    margin-top: 0.8rem;
    color: #FFF8F2;
}

.button-wrap {
    margin: 2rem;
}

.btn {
    border-radius: 1.25rem;
    border: none;
    background-color: #665031;
    width: 24rem;
    height: 9.5rem;
    margin: 1.7rem;
}

.btn :first-child{
    color: #FFF8F2;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.btn :last-child{
    font-size: 2.7rem;
    color: #FFF8F2;
}
</style>