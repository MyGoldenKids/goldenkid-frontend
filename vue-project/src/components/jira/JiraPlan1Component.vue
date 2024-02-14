<script setup>
import { Carousel, Pagination, Slide, Navigation } from "vue3-carousel";
import { useJiraCreateStore } from "@/stores/jira-create-store";
import { onMounted, ref } from "vue";
import { Story } from "@/models/story";
import { activityList } from "@/api/jira";
import "vue3-carousel/dist/carousel.css";

const store = useJiraCreateStore();
const storyList = store.storyList;
const idx = ref(0);
const activities = [];

onMounted(() => {
    activityList(
        (response) => {
            response.data.data.forEach((activity) => {
                activities.push(new Story(activity.activityDescription));
            });
        },
        () => {
            console.log("스토리를 가져올 수 없습니다.");
        }
    );
});

function injectStory(story) {
    if (idx.value > 3) {
        window.alert("최대 4개의 스토리까지만 추가 가능합니다.")
        return;
    }
    storyList[idx.value++] = story.clone();
}

function removeStory(index) {
    if (storyList[index] instanceof Story) {
        storyList[index] = undefined;
        let notUndefined = storyList.filter(story => story !== undefined);
        let undefinedItems = storyList.filter(story => story === undefined);
        storyList.value = notUndefined.concat(undefinedItems);
        idx.value--;
    }
}

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
                            <Slide v-for="(slide, index) in activities" :key="index">
                                <div class="carousel__item">
                                    <div class="slide-box-list">
                                        <h1>활동 {{index + 1}}번</h1>
                                        <p @click="injectStory(slide)">
                                            {{ slide.storyContent }}
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
                    <div class="todo-item" :class="{'select-todo': item instanceof Story}"
                            v-for="(item, index) in storyList" :key="index" 
                            @click="removeStory(index)">
                        {{ item !== undefined ? item.storyContent : "내용 안넣었을 때" }}
                    </div>
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
    width: 80%;
    margin: 0 auto;
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
    padding: 0 0 1.25rem 1.5rem;
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
    transform: rotateY(-10deg) scale(0.9);
}
.carousel__slide--next {
    opacity: 1;
    transform: rotateY(10deg) scale(0.9);
}
.carousel__slide--active {
    opacity: 1;
    transform: rotateY(0) scale(1.1);
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
    border-width: 0 4px 4px 0; /* 화살표 두께 */
    padding: 20px; /* 화살표 크기 */
    transition: transform 0.2s; /* 부드러운 전환 효과 */
}

.next,
.prev {
    position: absolute;
    top: 0%;
    border-color: rgba(208, 205, 205, 0.716);
}

.next {
    right: calc(-140%);
    transform: translateY(-10%) rotate(-45deg);
}

.prev {
    left: calc(-120%);
    transform: translateY(-10%) rotate(135deg);
}

.nav-button:hover {
    border-color: #665031;
    transform: translateY(-10%) rotate(-45deg) scale(1.2);
}

.prev:hover {
    transform: translateY(-10%) rotate(135deg) scale(1.2);
}
</style>
