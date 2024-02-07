<script setup>
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

</script>

<template>
  <div class="jira-wrap">
    <div class="jira-dash">
      <div class="jira-home-header">JIRA</div>
      <div class="underline">
        <h1>HISTORY</h1>
      </div>
      <!-- carousel 시작 -->
      <div class="mini-underline">
        <div class="slide-box">
          <Carousel :itemsToShow="4" :transition="600">
            <Slide v-for="slide in 10" :key="slide">
              <div class="carousel__item">
                <div class="slide-box-list">
                  <h2>200129</h2>
                  <h1>{{ slide }}번째 스프린트</h1>
                  <div class="finished-story">
                    <div>완료된 스토리</div>
                    <span>2/3</span>
                  </div>
                </div>
              </div>
            </Slide>

            <template #addons>
              <Navigation>
                <template #prev>
                  <div class="nav-button prev"></div>
                </template>
                <template #next>
                  <div class="nav-button next"></div>
                </template>
              </Navigation>
            </template>
          </Carousel>
        </div>
      </div>
      <!-- carousel 끝 -->

      <hr />

      <div class="todolist-wrap">
        <div class="todolist">
          <span>살 것 메모하고 시장가서 메모한 것만 사오기</span>
          <span>
            <span>1</span>
          </span>
        </div>
        <div class="progress">
          <span>진행중</span>
        </div>
        <div class="todolist">
          <span>저녁식사 상차림부터같이 준비하고 뒷정리 같이 하기</span>
          <span>
            <span>2</span>
          </span>
        </div>
        <div class="progress">
          <span>완료</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "yg-jalnan";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

.jira-wrap {
  background-color: #ad9478;
  text-align: center;
  border-radius: 1.25rem;
  padding: 1.25rem;
  box-sizing: border-box;
}

.jira-dash {
  border: 0.25rem dashed #665031;
  border-radius: 1.25rem;
  box-sizing: border-box;
}

.jira-home-header {
  width: 10.25rem;
  height: auto;
  background-image: url(@/assets/img/sticker9.png);
  background-size: cover;
  padding: 0.438rem 0;
  color: #ad9478;
  font-size: 1.8rem;
  margin: 1.2rem auto;
}

.underline {
  border-bottom: 0.25rem solid #665031;
  width: 95%;
  display: grid;
  justify-items: left;
  margin: 0 2rem;
  margin-bottom: 3rem;
}
.underline h1 {
  font-size: 2.5rem;
  margin: 1rem 0;
}

.mini-underline {
  width: 100%;
  box-sizing: border-box;
}

hr {
  border: 0.125rem solid #665031;
  width: 45%;
  margin: 1.25rem auto;
}

.todolist-wrap {
  display: grid;
  grid-template-columns: 77% 18%;
  gap: 5%;
  width: 80%;
  padding: 1.25rem;
  margin: 0 auto;
}

.todolist {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 0.7rem 1.5rem;
  background-color: #fff8f2;
  border-radius: 1.25rem;
  width: 100%;
  margin: 0.25rem 0;
}

.todolist > span {
  display: flex;
  align-items: center;
  justify-content: center;
}

.todolist :last-child {
  background-color: #665031;
  color: #fff8f2;
  border-radius: 0.7rem;
  padding: 0.3rem 0.5rem;
}
.slide-box-list span {
  background-color: #665031;
  color: #fff8f2;
  border-radius: 1.25rem;
  padding: 0 0.5rem;
  font-size: small;
}

.finished-story {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.progress {
  box-sizing: border-box;
  display: grid;
  justify-content: center;
  align-items: center;
  margin: 0.25rem 0;
  padding: 0.7rem 1rem;
  background-color: #665031;
  border-radius: 1.25rem;
  width: 100%;
}

.progress > span {
  text-align: center;
  color: #fff8f2;
}

.slide-box {
  width: 80%;
  margin: 0 auto;
  padding: 1.25rem 0;
}
.slide-box h1 {
  font-size: 1.5rem;
  margin: 0.5rem 0;
}
.slide-box-list {
  background-color: #fff8f2;
  padding: 2.5rem 1.25rem;
  border-radius: 1.25rem;
  line-height: 1.8rem;
  box-sizing: border-box;
  box-shadow: 0rem 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
}

.slide-box-list.active {
  border: 0.25rem solid #665031;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__item {
  padding: 0.625rem 0;
  box-sizing: border-box;
}

.nav-button {
  position: absolute;
  top: 50%;
  content: "";
  display: inline-block;
  border: solid white; /* 화살표 색상 */
  border-width: 0 0.25rem 0.25rem 0; /* 화살표 두께 */
  padding: 1.25rem; /* 화살표 크기 */
  transition: transform 0.2s; /* 부드러운 전환 효과 */
}

.next,
.prev {
  position: absolute;
  top: 0%;
  transform: translateY(-50%);
  background-color: transparent;
  border-color: #665031;
  cursor: pointer;
}

.next {
  right: -180%;
  transform: translateY(-50%) rotate(-45deg);
}

.prev {
  left: -180%;
  transform: translateY(-50%) rotate(135deg);
}

.nav-button:hover {
  border-color: #665031;
  transform: translateY(-50%) rotate(-45deg) scale(1.2);
}

.prev:hover {
  transform: translateY(-50%) rotate(135deg) scale(1.2);
}

.carousel__prev,
.carousel__next {
  display: none;
}

.slide-box-list:hover {
  transform: scale(1.1);
}
</style>
