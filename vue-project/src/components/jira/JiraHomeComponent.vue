<script setup>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
</script>

<template>
  <div class="jira-wrap">
    <div class="jira-dash">
      <div class="jira-home-header">
        <span>JIRA</span>
      </div>
      <div class="underline">
        <h1>HISTORY</h1>
      </div>
      <!-- slide 시작 -->
      <div class="mini-underline">
        <div class="slide-box">
          <VueperSlides
            class="no-shadow"
            :visible-slides="3"
            slide-multiple
            :gap="3"
            :slide-ratio="1 / 4"
            :dragging-distance="200"
            :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }"
          >
            <VueperSlide v-for="(slide, index) in 12" :key="index">
              <template v-slot:content>
                <div class="slide__item">
                  <div class="slide-box-list">
                    <h2>200129</h2>
                    <h1>{{ slide }}번째 스프린트</h1>
                    <div class="finished-story">
                      <div>완료된 스토리</div>
                      <span>2/3</span>
                    </div>
                  </div>
                </div>
              </template>
            </VueperSlide>
          </VueperSlides>
        </div>
      </div>
      <!-- slide 끝 -->

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
.vueperslides {
  box-sizing: border-box;
}
.jira-wrap {
  background-color: #ad9478;
  text-align: center;
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-sizing: border-box;
}

.jira-dash {
  border: 0.313rem dashed #665031;
  border-radius: 1.25rem;
  box-sizing: border-box;
  padding: 2rem;
}

.jira-home-header {
  width: 10.25rem;
  height: auto;
  background-image: url(@/assets/img/sticker9.png);
  background-size: cover;
  padding: 0.438rem 0;
  color: #ad9478;
  font-size: 1.8rem;
  margin: 0 auto;
}

.jira-home-header span {
  display: inline-block;
  margin: 0.45rem 0 0 0;
  color: #ad9478;
}

.underline {
  border-bottom: 0.25rem solid #665031;
  width: 95%;
  display: grid;
  justify-items: left;
  margin: 0 2rem;
  margin-bottom: 3rem;
  overflow-y: scroll;
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

/* Carousel 시작 */
.slide-box-list span {
  background-color: #665031;
  color: #fff8f2;
  border-radius: 1.25rem;
  padding: 0 0.5rem;
  font-size: small;
}

.finished-story {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.progress > span {
  text-align: center;
  color: #fff8f2;
}

.slide-box {
  width: 82%;
  margin: 0 auto;
  padding: 1.25rem 0;
}
.slide-box h1 {
  font-size: 1.3rem;
  margin: 0.5rem 0;
}
.slide-box-list {
  background-color: #fff8f2;
  padding: 2.5rem 1.25rem;
  border-radius: 1.25rem;
  line-height: 1.8rem;
  box-sizing: border-box;
  box-shadow: 0rem 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  margin: 0.5rem;
}

.slide-box-list.active {
  border: 0.25rem solid #665031;
}

.slide-box-list:hover {
  transform: scale(1.05);
}
.slide__item {
  padding: 0.625rem 0;
  box-sizing: border-box;
}

/* Carousel 아래 */
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

.todolist-wrap {
  display: grid;
  grid-template-columns: 77% 18%;
  gap: 5%;
  width: 80%;
  padding: 1.25rem;
  margin: 0 auto;
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
</style>
