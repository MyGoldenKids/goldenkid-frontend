<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goSignup = () => {
  router.push("/member/signup");
};

const goSurvey = () => {
  router.push("/survey");
};

const goDiary = () => {
  router.push("/diary/home");
};
</script>

<template>
  <div class="banner-wrap">
    <div class="banner">
      <div class="banner-inner">
        <div class="banner-main-text">
          <div>
            내가 <span>직접</span> 만드는 내 아이와의 <span>일주일</span>
          </div>
        </div>
        <div class="banner-text">
          <span class="subtitle"
            >한치 앞도 모르는 육아생활! 앞으로의 일주일을 미리 계획하고 싶진
            않으신가요?</span
          >
          <br /><span>금쪽이 해방일지</span>에서 아이와의 한 주를 계획할 수
          있어요. <br />특별한 순간들을 예측하고, 일상에 색다른 기대감을
          더해보세요. <br />앞으로의 일주일이 지난 일주일보다 빛날거에요.
        </div>
        <div class="go-signup">
          가입 후 <span>JIRA</span> 기록하기
          <button @click="goSignup">GO</button>
        </div>
      </div>
    </div>

    <div class="button-box">
      <div class="box-item button-item1">
        <h1>혹시 내가 금쪽이 ?</h1>
        <p>객관적으로 양육태도 바라보기</p>
        <button @click="goSurvey">부모 자가진단</button>
      </div>
      <div class="box-item button-item2">
        <h1>혹시 내아이가 금쪽이 ?</h1>
        <p>ADHD, 발달장애, 틱 자가진단</p>
        <button @click="goSurvey">증상 확인하기</button>
      </div>
      <div class="box-item button-item3">
        <img src="@/assets/img/diary_btn.png" alt="error" @click="goDiary" />
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
  background-color: #ad9478;
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
  color: #fff8f2;
  display: inline-block;
  border-bottom: 0.313rem solid #665031;
  padding-bottom: 0.625rem;
}

.banner-text {
  padding: 0 0 0.625rem 3.125rem;
  color: #fff8f2;
  font-size: 1.2rem;
  line-height: 2rem;
}

.subtitle {
  font-size: 1.5rem;
  color: #fff8f2;
  margin-bottom: 1.2rem;
}
.go-signup {
  padding: 0 2rem 3rem;
  color: #fff8f2;
  font-size: 1.1rem;
  text-align: right;
}
.go-signup button {
  border: none;
  border-radius: 30%;
  background-color: #fff8f2;
  color: #665031;
  font-size: 1.1rem;
  padding: 0.313rem 0.625rem;
}
.button-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 3rem;
  align-items: center;
}

.box-item {
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
  background-color: #ad9478;
  color: #fff;
  border: none;
  box-sizing: border-box;
}

.box-item img {
  width: 95%;
  height: 95%;
  border-radius: 1.25rem;
  box-sizing: border-box;
  cursor: pointer;
  margin: 0 auto;
}
</style>
