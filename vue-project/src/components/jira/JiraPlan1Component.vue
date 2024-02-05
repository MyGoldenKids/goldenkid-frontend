<script setup>
import { defineComponent } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
</script>

<template>
    <div class="jira-wrap">
        <div class="jira-dash">
            <div class="jira-title">
                <h1>STEP1</h1>
                <p class="font-color">스토리등록</p>
                <p>
                    아이와 함께 할 활동을 선택 해보세요😊<br />
                    최대 4개까지 선택 가능해요 !
                </p>
            </div>
            <div class="jira-content">
                <div class="content-slide">
                    <div class="slide-box">
                        <Carousel
                            :itemsToShow="3"
                            :wrapAround="true"
                            :transition="500"
                            :autoplay="3000"
                        >
                            <Slide v-for="slide in 10" :key="slide">
                                <div class="carousel__item">
                                    <div class="slide-box-list">
                                        <h1>활동 1번</h1>
                                        <p>
                                            아이와 함께 할 활동들 적을 공간 /
                                            아이와 함께 할 활동들 적을 공간
                                        </p>
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
                                <Pagination />
                            </template>
                        </Carousel>
                    </div>
                    <div class="todo-box">
                        <div class="todo-item select-todo">
                            내용 클릭했을 때
                        </div>
                        <div class="todo-item select-todo">
                            해당 내용 여기로 들어옴
                        </div>
                        <div class="todo-item">내용 안넣었을 때</div>
                        <div class="todo-item">카드를 클릭해주세요</div>
                    </div>
                </div>
                <div class="jira-btn">
                    <router-link :to="{ name: 'jira-plan2' }">NEXT</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.jira-wrap {
    background-color: #ad9478;
    text-align: center;
    border-radius: 0.625rem;
    padding: 1.25rem;
    box-sizing: border-box;
}
.jira-dash {
    border: 4px dashed #665031;
    display: grid;
    grid-template-columns: 30% 70%;
}
.jira-content {
    padding: 0.625rem;
}
.slide-box {
    padding: 1.25rem 0;
}
.slide-box-list {
    background-color: #fff8f2;
    padding: 2.5rem 1.25rem;
    border-radius: 1.25rem;
    line-height: 1.5rem;
    box-sizing: border-box;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}
.todo-box {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 1.25rem;
}
.todo-item {
    padding: 0.625rem;
    margin: 0.625rem;
    background-color: inherit;
    border: 3px solid #665031;
    border-radius: 0.625rem;
    height: 9.38rem;
    display: grid;
    align-content: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    line-height: 1.5rem;
}
.select-todo {
    background-color: #665031;
    color: #fff;
}
.jira-title {
    width: 85%;
    margin: 0 auto;
    display: grid;
    align-content: center;
    justify-content: center;
    grid-template-columns: 1fr;
    gap: 0.625rem;
    height: 100%;
}
.jira-title h1 {
    font-size: 1.5rem;
}
.jira-title p {
    font-size: 1.2rem;
    line-height: 1.5rem;
    margin: 0.625rem 0;
}
.jira-title p.font-color {
    font-size: 2rem;
    color: #fff;
}
.jira-btn {
    margin: 2.5rem 0;
}
.jira-btn a {
    background-color: #665031;
    color: #fff;
    border: none;
    padding: 0.625rem 2.5rem;
    border-radius: 0.625rem;
    font-size: 1.5rem;
}

.carousel__slide {
    padding: 0 0 1.25rem 1.5rem 
}
.carousel__track {
    transform-style: preserve-3d;
}
.carousel__slide--sliding {
    transition: 0.5s;
}
.carousel__slide {
    opacity: 0.9;
    transform: rotateY(-20deg) scale(0.9);
}
.carousel__slide--active ~ .carousel__slide {
    transform: rotateY(20deg) scale(0.9);
}
.carousel__slide--prev {
    opacity: 1;
    transform: rotateY(-10deg) scale(0.95);
}
.carousel__slide--next {
    opacity: 1;
    transform: rotateY(10deg) scale(0.95);
}
.carousel__slide--active {
    opacity: 1;
    transform: rotateY(0) scale(1.1);
}
.carousel__item {
    padding: 0.625rem 0;
    box-sizing: border-box;
}
</style>