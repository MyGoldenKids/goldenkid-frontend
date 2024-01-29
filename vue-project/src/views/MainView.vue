<script setup>
/* axios test 용 코드
import { instance } from "@/api/axios";

const fetchData = async () => {
    await instance
        .get("article/list")
        .then((response) => {
            console.log(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
};
*/
</script>

<template>
    <div class="banner-wrap">
        <div class="banner">
            <div class="banner-inner">
                <div class="banner-main-text">
                    <div>매일 <span>기록</span> 하며 솔루션 찾기</div>
                </div>
                <div class="banner-text">
                    매일 우리 아이의 증상을 기록하고, 우리 아이의 성장을 지켜보세요.
                    <br>금쪽이 해방일지는 경험을 나누고 함께 성장하는 공간으로, 다양한 증상에 대한 해결책을 찾아보는 여정에 동참합니다.
                    <br>함께 더 나은 방향으로 나아가요!
                </div>
                <div class="go-signup">
                    가입 후 우리 아이 기록하기
                    <button>GO</button>
                </div>
            </div>
        </div>


        <div class="button-box">
            <div class="box-item button-item1">
                <h1>혹시 내가 금쪽이 ?</h1>
                <p>객관적으로 양육태도 바라보기</p>
                <button>부모 자가진단</button>
            </div>
            <div class="box-item button-item2">
                <h1>혹시 내아이가 금쪽이 ?</h1>
                <p>ADHD, 발달장애, 틱 자가진단</p>
                <button>증상 확인하기</button>
            </div>
            <div class="box-item button-item3">
                여기에 머하지?
            </div>
        </div>
    </div>
</template>

<style scoped>
/* ----------배너----------- */
.banner-wrap {
    display: grid;
    align-items: center;
    margin-top: 1.5rem;
}
/* 배너 겉껍질 */
.banner {
    width: 100%;
    display: grid;
    justify-self: center;
    background-color: #AD9478;
    border-radius: 1.25rem;
    padding: 1.2rem;
    box-sizing: border-box;
}
/* 배너 속껍질 */
.banner-inner {
    width: 100%;
    display: grid;
    justify-self: center;
    align-self: center;
    border: dashed 0.438rem #665031;
    border-radius: 1.25rem;
}
/* 배너 텍스트들 */
.banner-main-text {
    padding: 4rem 3.125rem 3rem;
    box-sizing: border-box;
    text-decoration-color: #665031;
    /* line-height: 3; */
    font-size: 2rem;
}
.banner-main-text > div {
    color: #FFF8F2;
    display: inline-block;
    border-bottom: 0.313rem solid #665031;
    padding-bottom: 0.625rem;
}

.banner-text {
    padding: 0 0 0.625rem 3.125rem;
    color: #FFF8F2;
    font-size: 1.2rem;
    line-height: 2rem;
}
.go-signup {
    padding: 0 2rem 3rem;
    color: #FFF8F2;
    font-size: 1.1rem;
    text-align: right;
}
.go-signup button {
    border: none;
    border-radius: 30%;    background-color: #FFF8F2;
    color: #665031;
    font-size: 1.1rem;
    padding: 0.313rem 0.625rem;
}
.button-box {
    /* background-color: pink; */
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 3rem;
}

.box-item {
    /* background-color: burlywood; */
    /* width: 90%; */
    margin: 0 auto;
}
.box-item h1 {
    font-size: 1.5rem;
    padding: 0.625rem;
}
.box-item p {
    padding: 0.625rem;
    font-size: 1rem;
}
.box-item button {
    display: block;
    padding: 0.6rem 2rem;
    margin-left: 0.625rem;
    border-radius: 0.625rem;
    background-color: #AD9478;
    color: #fff;
    border: none;
    box-sizing: border-box;
}
</style>
