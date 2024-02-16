<script setup>
import { useJiraCreateStore } from "@/stores/jira-create-store";
import { computed } from "vue";
import { Story } from "@/models/story";
import { useRouter } from "vue-router";
const store = useJiraCreateStore();

const sprintInfo = store.sprintInfo;
const router = useRouter();

const totalStoryPoints = computed(() => {
  return store.storyList.reduce((total, story) => {
    if (story instanceof Story && typeof story.storyPoint === "number") {
      return total + story.storyPoint;
    }
    return total;
  }, 0);
});

const checkStoryPoints = () => {
  if (
    store.storyList
      .filter((story) => story !== undefined)
      .some((story) => story.storyPoint === 0)
  ) {
    alert("스토리 포인트는 최소 1 이상이어야 합니다.");
  } else {
    store.totalStoryPoints = totalStoryPoints.value;
    router.push({ name: "jira-plan3" });
  }
};

const validateInput = (event, story) => {
  const input = event.target;
  const min = parseInt(input.min, 10);
  const max = parseInt(input.max, 10);
  const value = parseInt(input.value, 10);

  if (value < min || value > max) {
    alert(`스토리 포인트는 ${min}에서 ${max} 사이여야 합니다.`);
    const correctedValue = value < min ? min : max;
    input.value = correctedValue;
    story.storyPoint = correctedValue;
  }
};
</script>

<template>
  <div class="jira-wrap">
    <div class="jira-dash">
      <div class="jira-title">
        <h1>STEP 2</h1>
        <p class="font-color">스토리시간</p>
        <p>
          일주일 동안 아이와 함께 활동할 <br />
          목표 시간을 정해 보세요 😊 <br />
        </p>
        <p>
          기간 : {{ sprintInfo.value.startDate }} ~
          {{ sprintInfo.value.endDate }}
        </p>
      </div>
      <div class="jira-content">
        <div
          class="todo-box"
          v-for="(story, index) in store.storyList"
          :key="index"
        >
          <div class="todo-time" v-if="story !== undefined">
            <p>{{ story.storyContent }}</p>
            <input
              type="number"
              required
              v-model="story.storyPoint"
              min="1"
              max="4"
              @input="validateInput($event, story)"
            />
          </div>
        </div>
        <div class="sum-point">
          <span>{{ totalStoryPoints }}</span> HOURS
        </div>
        <div class="jira-btn">
          <router-link :to="{ name: 'jira-plan1' }">PREV</router-link>
          <button @click="checkStoryPoints">NEXT</button>
        </div>
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
  display: grid;
  grid-template-columns: 30% 70%;
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

.jira-title p:last-child {
  color: #fff;
  font-size: 0.9rem;
}

.jira-content {
  padding: 1.25rem 0.625rem 0.625rem 0.625rem;
}

.todo-box {
  display: grid;
  grid-template-columns: 1fr;
}

.todo-time {
  width: 60%;
  padding: 0.625rem;
  margin: 0.625rem auto;
  background-color: #fff8f2;
  border-radius: 0.625rem;
  display: grid;
  grid-template-columns: 85% 10%;
  align-items: center;
  text-align: left;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* 그림자 효과 */
}

.todo-time p {
  color: #ad9478;
  font-size: 1.2rem;
}

.todo-time input[type="number"] {
  width: 100%;
  height: 1.8rem;
  font-size: 1.5rem;
  border: 2px solid #ad9478;
  border-radius: 0.375rem;
  background-color: #fff;
  color: #ad9478;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s, box-shadow 0.2s;
  padding: 0 0.313rem;
}

.sum-point {
  padding: 1.5rem 0 0.625rem 0;
  font-size: 1.5rem;
}

.sum-point span {
  color: #fff;
  font-size: 1.8rem;
}

.jira-btn {
  margin: 2.5rem;
}

.jira-btn a,
button {
  background-color: #665031;
  color: #fff;
  border: none;
  padding: 0.625rem 2.5rem;
  border-radius: 0.625rem;
  font-size: 1.5rem;
  margin: 0 1.25rem;
}
</style>
