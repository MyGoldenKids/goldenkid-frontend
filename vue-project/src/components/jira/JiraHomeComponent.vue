<script setup>
import { changeStoryStatus, getSprintList, getStoryList } from "@/api/jira";
import { useMemberStore } from "@/stores/member-store";
import { ref, onMounted, watch } from "vue";
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
    sprintList.value.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    sprintList.value.forEach(async (sprint) => {
      let startDate = new Date(sprint.startDate);
      let endDate = new Date(sprint.endDate);
      let createdAt = new Date(sprint.createdAt);
      sprint.startDate = startDate.toLocaleDateString().replace(/\.$/, "");
      sprint.endDate = endDate.toLocaleDateString().replace(/\.$/, "");
      sprint.createdAt = createdAt
        .toLocaleDateString()
        .replace(/\.$/, "")
        .replace(/\. /g, "-");
      await getStoryList(sprint.sprintId, store.memberInfo.memberNo, (data) => {
        sprint.sprintDetail = data.data.data;
        sprint.totalLength = Object.keys(sprint.sprintDetail).length;
        sprint.completedCnt = sprint.sprintDetail.filter(story => story.storyStatus === 2).length;
      });
    });
  });
});

const getSprintDetail = (index) => {
  storyList.value = sprintList.value[index].sprintDetail;
};

const handleStatusChange = async (event, storyId) => {
  const selectValue = event.target.value;
  await changeStoryStatus(storyId, {'storyStatus': selectValue, 'memberId': store.memberInfo.memberNo}, (data) => {
    const sprintIndex = sprintList.value.findIndex(sprint => 
      sprint.sprintDetail.some(story => story.storyId === storyId));
    if (sprintIndex !== -1) {
      const sprint = sprintList.value[sprintIndex];
      sprint.completedCnt = sprint.sprintDetail.filter(story => story.storyStatus === 2).length;
    }
  });
};

const isSprintEndDatePassed = () => {
  const today = new Date();
  const latestSprint = sprintList.value[sprintList.value.length - 1];
  const endDate = new Date(latestSprint.endDate);
  if (sprintList.value.length > 0 && endDate.getTime() < today.getTime()) {
    return true;
  }
  return false;
};

const router = useRouter();
const goMakeSprint = () => {
  // if (!isSprintEndDatePassed()) {
  //   alert('아직 이번 주 스프린트가 끝나지 않았어요!');
  //   return;
  // }
  router.push("/jira/plan0");
};

const goSignUp = () => {
  router.push("/member/signup");
};

</script>

<template>
  <div class="jira-wrap">
    <div class="jira-dash">
      <div class="jira-home-header">
        <span>금쪽플래너</span>
      </div>
      <div class="underline">
        <div class="history">
          <h1>HISTORY</h1>
        </div>
        <div class="go-make-sprint-btn" @click="goMakeSprint">
          <button>에피소드 만들기</button>
        </div>
      </div>
      <!-- slide 시작 -->
      <div class="mini-underline">
        <div class="slide-box" v-if="sprintList.length > 0">
          <div
            v-if="sprintList.length < 3"
            :class="{
              'list-1': sprintList.length == 1,
              'list-2': sprintList.length == 2,
            }"
          >
            <div
              class="kid-box"
              v-for="(sprint, index) in sprintList"
              :key="sprint"
              @click="getSprintDetail(index)"
            >
              <div class="slide__item">
                <div class="slide_box_list">
                  <div class="sprint-header-wrap">
                    <h1>#{{ index + 1 }} {{ sprint.sprintTitle }}</h1>
                    <div v-if="sprint.sprintStatus" class="on-air-btn">
                      진행 중
                    </div>
                  </div>
                  <div>{{ sprint.startDate }} - {{ sprint.endDate }}</div>
                  <div>
                    완료된 스토리 : {{ sprint.completedCnt }}/{{
                      sprint.totalLength
                    }}
                  </div>
                  <div class="end-ep">
                    <button>에피소드 완성</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
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
                @click="getSprintDetail(index)"
              >
                <template v-slot:content>
                  <div class="slide__item">
                    <div class="slide-box-list">
                      <div class="sprint-header-wrap">
                        <h1>#{{ index + 1 }} {{ sprint.sprintTitle }}</h1>
                        <div v-if="sprint.sprintStatus" class="on-air-btn">
                          진행 중
                        </div>
                      </div>
                      <div>{{ sprint.startDate }} - {{ sprint.endDate }}</div>
                      <div>
                        완료된 스토리 : {{ sprint.completedCnt }}/{{
                          sprint.totalLength
                        }}
                      </div>
                      <div class="end-ep">
                        <button>에피소드 완성</button>
                      </div>
                    </div>
                  </div>
                </template>
              </VueperSlide>
            </VueperSlides>
          </div>
        </div>
        <div v-else class="no-history-wrap">
          <div class="no-history">아직 만들어진 에피소드가 없어요 :(</div>
          <div v-if="!store.isLoggedIn">
            금쪽이 해방일지가 처음이라면?
            <span class="make-story-btn" @click="goSignUp">회원가입 하기</span>
          </div>
          <div>
            금쪽플래너가 처음이라면?
            <span class="make-story-btn" @click="goMakeSprint"
              >에피소드 만들기</span
            >
          </div>
        </div>
      </div>
      <!-- slide 끝 -->

      <hr />

      <template v-if="storyList.length === 0">
        <div class="is-firsttime">
          <p>에피소드를 클릭하면 이 곳에서 나의 스토리를 볼 수 있어요.</p>
        </div>
      </template>
      <div class="todolist-wrap">
        <template v-for="(story, index) in storyList" :key="story">
          <div class="todolist">
            <span>
              <span>{{ story.storyContent }}</span>
              <span class="img-margin">
                <img
                  src="../../assets/img/delete_red.png"
                  alt="delete_btn_err"
                  @click="deleteStory"
                />
              </span>
            </span>
            <span>
              <span>{{ story.storyPoint }}시간</span>
            </span>
          </div>
          <div class="progress">
            <div class="select-box">
              <select name="search" class="sel" v-model.number="story.storyStatus" @change="handleStatusChange($event, story.storyId)">
                <option value="0">해야할 일</option>
                <option value="1">진행 중</option>
                <option value="2">완료됨</option>
              </select>
            </div>
            <!-- <span v-if="story.storyStatus === 0">해야할 일</span> -->
            <!-- <span v-else-if="story.storyStatus === 1">진행 중</span> -->
            <!-- <span v-else>완료됨</span> -->
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  padding: 2rem 2rem 4em;
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
  font-size: x-large;
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
  margin: 2rem auto;
}

/* Slide 시작 */
.slider-container {
  display: flex;
  justify-content: center;
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
  justify-content: space-evenly;
  align-items: center;
}

.finished-story :last-child {
  border: solid 0.23rem #665031;
  padding: 0.5vw 0.7vw 0.3vw 0.7vw;
  border-radius: 1rem;
}

.progress > span {
  text-align: center;
  color: #fff8f2;
}

.slide-box {
  width: 82%;
  margin: 0 auto;
}
.slide-box h1 {
  font-size: 1.3vw;
  margin: 0.5rem 0;
}

/* 슬라이드 3개 이상일 때 적용되는 css  */
.slide-box-list {
  background-color: #fff8f2;
  padding: 2rem 1.25rem;
  border-radius: 1.25rem;
  line-height: 1.5vw;
  box-sizing: border-box;
  box-shadow: 0rem 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  margin: 0.5rem;
  font-size: 1vw;
  width: 17vw;
}

/* 슬라이드 2개 이상일 때 적용되는 css */
.slide_box_list {
  background-color: #fff8f2;
  padding: 2rem 1.25rem;
  border-radius: 1.25rem;
  line-height: 1.5vw;
  box-sizing: border-box;
  box-shadow: 0rem 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  margin: 0.5rem auto;
  font-size: 1.3vw;
  width: 24vw;
  text-align: start;
}

.slide_box_list h1 {
  font-size: 1.5vw;
  margin: 0.5rem 0;
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
  flex: 0 0 auto;
}

.list-1 {
  display: grid;
  width: 50%;
  margin: 2.25rem auto 0 auto;
  grid-template-columns: 1fr;
}

.list-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 2.25rem;
}

/* Slide 아래 */
.todolist {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 1.5rem;
  background-color: #fff8f2;
  border-radius: 1.25rem;
  width: 100%;
  margin: 0.25rem 0;
  font-size: 1.1vw;
}

.todolist > span {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem;
}

.todolist :last-child span {
  background-color: #665031;
  color: #fff8f2;
  border-radius: 0.7rem;
  padding: 0.5rem 0.7rem;
}

.todolist-wrap {
  display: grid;
  grid-template-columns: 77% 18%;
  gap: 5%;
  width: 90%;
  padding: 1.25rem;
  margin: 0 auto;
}

.img-margin {
  margin: 0 0.7vw;
}

span > img {
  width: 1.6vw;
  height: auto;
  cursor: pointer;
  background-color: transparent;
  transition: transform 0.2s ease-in-out;
}

span > img:hover {
  transform: scale(1.2);
}

.progress {
  box-sizing: border-box;
  display: grid;
  justify-content: center;
  align-items: center;
  margin: 0.25rem 0;
  padding: 0.4rem 1rem;
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
  cursor: pointer;
}

/* 진행중 버튼 */
.sprint-header-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.on-air-btn {
  background-color: #e1baad;
  color: #665031;
  border-radius: 1.25rem;
  font-size: 0.9vw;
  padding: 0.313rem 0.625rem;
}

.sel {
  font-family: "jalnan";
  font-size: 1.1vw;
  width: 100%;
  background-color: transparent;
  box-sizing: border-box;
  padding: 0.625rem;
  color: #fff8f2;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border: none;
  margin: 0 auto;
}

.select-box {
  display: flex;
  justify-content: center;
}
.sel option {
  display: block;
  background: #fff8f2;
  color: #665031;
}

.sel:focus {
  border: 0.063rem solid transparent;
  box-sizing: border-box;
  border-radius: 1.25rem;
  outline: 0.125rem solid transparent;
  cursor: pointer;
}

select {
  text-align-last: center;
  text-align: left;
  -ms-text-align-last: left;
  -moz-text-align-last: left;
}

.end-ep {
  display: flex;
  justify-content: right;
}
.end-ep button {
  background-color: #665031;
  color: #fff8f2;
  border-radius: 1.25rem;
  padding: 0.5rem 1rem;
  font-size: 1vw;
}
</style>
