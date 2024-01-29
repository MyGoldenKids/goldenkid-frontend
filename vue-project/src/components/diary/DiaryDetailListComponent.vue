<script setup>

</script>

<template>
    <div class="diary-content">
        <div class="content-left">
            <div class="diary-content-box">
                <div class="title">좋은 부모란 무엇일까?</div>
                <div class="title-under">
                    <div class="title-sub">
                        <span># 183번째 일기</span>
                        <span>2024년 1월 25일 목요일</span>
                    </div>
                    <div class="title-btn">
                        <button>수정</button>
                        <button>삭제</button>
                    </div>
                </div>
                <div class="diary-detail">
                    <div class="diary-img">이미지 크기 얼마로 해야할지 고민중 500x300 px</div>
                    <div class="diary-text">
                        오늘은 금쪽이의 컨디션이 좋은 지 하루종일 빵긋빵긋 웃으며 재밌는 하루를 보냈다고 생각한다
                        이런날이 하루씩 찾아올 때 마다 그간 속상했던 날들에 대한 보상을 받ㅇ는 것 같아 기분이 조흐다.
                        한 아름다운 봄 날, 작은 마을은 화려한 꽃들로 물든 곳이었습니다. 그날은 사람들이 웃음소리를 지르며 마을 한가운데 모여 어린이들은 꽃다발을 만들어 친구들에게 선물하고, 어른들은 향기로운 꽃들을 가지고 집으로 돌아갔습니다. 햇빛은 고요하게 미소 짓고 있었고, 새들의 노래가 마을을 가득 채우고 있었습니다. 이 아름다운 순간들은 마을 사람들에게 늘 기억 속에 남을 것 같았습니다.
                        한 아름다운 봄 날, 작은 마을은 화려한 꽃들로 물든 곳이었습니다. 그날은 사람들이 웃음소리를 지르며 마을 한가운데 모여 어린이들은 꽃다발을 만들어 친구들에게 선물하고, 어른들은 향기로운 꽃들을 가지고 집으로 돌아갔습니다. 햇빛은 고요하게 미소 짓고 있었고, 새들의 노래가 마을을 가득 채우고 있었습니다. 이 아름다운 순간들은 마을 사람들에게 늘 기억 속에 남을 것 같았습니다.
                    </div>
                </div>
            </div>
        </div>
        <div class="content-right"> 
            <div class="diary-list">
                <div class="list-title">
                    <a href="#">
                        <span># 186</span>
                        <span>좋은 부모란 무엇일까 ?</span>
                        <span>01월 29일 월요일</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 다이어리 컨텐츠 */
.diary-content {
    /* background-color: pink; */
    display: grid;
    grid-template-columns: 60% 40%;
}

/* 다이어리 왼쪽 부분 */
.content-left {
    /* background-color: cadetblue; */
    text-align: left;
    padding : 1.2rem;
    box-sizing: border-box;
    font-family: 'NanumNeuRisNeuRisCe';
}
.title {
    padding-bottom: 0.313rem;
    padding-left: 0.313rem;
    border-bottom: 0.313rem solid #89B9AD;
    font-size: 3rem;
    font-weight: 600;
}

/* 타이틀 아래 */
.title-under {
    display: grid;
    grid-template-columns: auto 1fr;
    padding: 0.625rem 0.313rem 0 0.313rem;
}
.title-sub span {
    font-size: 1.5rem;
    font-weight: 500;
}
.title-sub span:last-child{
    margin-left: 2rem;
}
.title-btn {
    justify-self: end;
    align-items: center;
}
.title-btn button {
    display: inline-block;
    border:none;
    background-color: #89B9AD;
    color: #fff;
    border-radius: 1.2rem;
    padding: 0.313rem 1.2rem;
    margin-left: 0.313rem;
}
.title-btn button:hover {
    background-color: #E1BAAD;
    transition-duration: 0.8s;
    cursor: pointer;
}

/* 다이어리 내용 */
.diary-detail {
    height: 31.25rem;
    overflow-y: scroll;
    margin-top: 1.875rem;
}

.diary-img {
    background-color: chocolate;
    margin: 0 1.2rem 1.2rem;
    /* 일기상세에서 보여줄 이미지 크기 정해야함 (임시) */
    width: 500px; 
    height: 300px;
}
.diary-text {
    line-height: 2.2rem;
    padding : 0 1.2rem;
    font-size: 1.8rem;
    font-weight: 600;
}

/* 다이어리 오른쪽 부분 */
.content-right {
    text-align: left;
    padding : 1.2rem 0 1.2rem 1.2rem;
    box-sizing: border-box;
}

/* 다이어리 리스트 검색 */

/* 다이어리 리스트 */
.diary-list span {
    color: #89B9AD;
}

.list-title a{
    border: 0.2rem solid #89B9AD;
    background-color: initial;
    display: grid;
    border-radius: 1.2rem;
    grid-template-columns: auto auto 1fr;
    padding: 0.625rem 1rem;
    margin: 1rem 0;
    align-items: center;
}
.list-title span {
    padding-right: 0.625rem;
}
.list-title span:last-child {
    justify-self: end;
    font-size: 0.8rem;
    padding-right: 0;
}
.list-title a:hover {
    background-color: #89B9AD;
    transition-duration: 0.5s;
}
.list-title:hover span {
    color:#fff !important;
    transition-duration: 0.5s;
}
</style>