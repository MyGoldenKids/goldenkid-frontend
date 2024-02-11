<script setup>
import { getSprintList, getStoryList } from "@/api/jira";
import { useMemberStore } from "@/stores/member-store";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import "vue3-carousel/dist/carousel.css";

const store = useMemberStore();
const sprintList = ref([]);
const storyList = ref([]);
onMounted(() => {
  getSprintList(store.memberInfo.memberNo, (data) => {
    sprintList.value = data.data.data;
    sprintList.value.forEach((sprint) => {
      let startDate = new Date(sprint.startDate);
      let endDate = new Date(sprint.endDate);
      sprint.startDate = startDate.toLocaleDateString().replace(/\.$/, "");
      sprint.endDate = endDate.toLocaleDateString().replace(/\.$/, "");
    });
  });
});

const getSprintDetail = (sprintId) => {
  getStoryList(sprintId, store.memberInfo.memberNo, (data) => {
    storyList.value = data.data.data;
  });
};

const isSprintEndDatePassed = () => {
  const today = new Date();
  const latestSprint = sprintList.value[sprintList.value.length - 1];
  const endDate = new Date(latestSprint.endDate);
  if (endDate < today) {
    return true;
  }
  return false;
};

const router = useRouter();
const goMakeSprint = () => {
  if (!isSprintEndDatePassed()) {
    alert('아직 이번 주 스프린트가 끝나지 않았어요!');
    return;
  }
  router.push("/jira/plan0");
};
</script>

<template>
  <div class="jira-wrap">
    <div class="jira-dash">
      <div class="jira-home-header">
        <span>JIRA</span>
      </div>
      <div class="underline">
        <div class="history">
          <h1>HISTORY</h1>
        </div>
        <div class="go-make-sprint-btn" @click="goMakeSprint">
          <button>스토리 만들기</button>
        </div>
      </div>
      <!-- slide 시작 -->
      <div class="mini-underline">
        <div class="slide-box" v-if="sprintList.length > 0">
          <VueperSlides
            class="no-shadow"
            :visible-slides="3"
            slide-multiple
            :gap="3"
            :slide-ratio="1 / 4"
            :dragging-distance="200"
            :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }"
          >
            <VueperSlide
              v-for="(sprint, index) in sprintList"
              :key="sprint"
              @click="getSprintDetail(sprint.sprintId)"
            >
              <template v-slot:content>
                <div class="slide__item">
                  <div class="slide-box-list">
                    <h1>{{ index + 1 }}번째 스프린트</h1>
                    <div>{{ sprint.sprintTitle }}</div>
                    <div>{{ sprint.startDate }} ~ {{ sprint.endDate }}</div>
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
        <div v-else class="no-history-wrap">
          <div class="no-history">아직 만들어진 SPRINT가 없어요 :(</div>
          <div>JIRA가 처음이라면?</div>
          <div>
            우측 상단 <span class="make-story-btn">스토리 만들기</span>
            CLICK!
          </div>
        </div>
      </div>
      <!-- slide 끝 -->

      <hr />

      <template v-if="storyList.length === 0">
        <div class="is-firsttime">
          <p>SPRINT를 등록하면 이 곳에서 나의 STORY를 볼 수 있어요.</p>
        </div>
      </template>
      <div class="todolist-wrap">
        <template v-for="(story, index) in storyList" :key="story">
          <div class="todolist">
            <span>{{ story.storyContent }}</span>
            <span>
              <span>{{ story.storyPoint }}시간</span>
            </span>
          </div>
          <div class="progress">
            <span v-if="story.storyStatus === 0">해야할 일</span>
            <span v-else-if="story.storyStatus === 1">진행 중</span>
            <span v-else>완료됨</span>
          </div>
        </template>
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
  display: flex;
  justify-content: space-between;
  margin: 0 2rem;
  margin-bottom: 3rem;
  overflow-y: scroll;
}
.history {
  font-size: 2.5rem;
  margin: 1rem 0;
  display: grid;
  justify-content: center;
  align-items: center;
}

.go-make-sprint-btn {
  background-color: #665031;
  color: #fff8f2;
  border-radius: 1rem;
  font-size: large;
  padding: 2%;
  margin: 1rem 0;
}

.go-make-sprint-btn button {
  background-color: transparent;
  color: #fff8f2;
}
.mini-underline {
  width: 100%;
  box-sizing: border-box;
}

hr {
  border: 0.125rem solid #665031;
  width: 45%;
  margin: 2rem auto 3rem auto;
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

.is-firsttime {
  background-color: #fff8f2;
  max-width: 40rem;
  margin: 0 auto;
  padding: 1.5rem;
  border-radius: 1.25rem;
  font-size: smaller;
}

.is-firsttime button {
  font-size: large;
  margin-top: 0.5rem;
}

.no-history-wrap {
  line-height: 3rem;
}

.no-history {
  font-size: xx-large;
}

.make-story-btn {
  color: #fff8f2;
  background-color: #665031;
  padding: 0.8%;
  border-radius: 0.75rem;
}
</style>
