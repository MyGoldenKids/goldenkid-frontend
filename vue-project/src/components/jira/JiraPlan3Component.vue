<script setup>
import { useJiraCreateStore } from "@/stores/jira-create-store";
import { useMemberStore } from "@/stores/member-store";
import { Story } from "@/models/story";
import { createSprint, createStory } from "@/api/jira";
import { useRouter } from "vue-router";

const jiraStore = useJiraCreateStore();
const memberStore = useMemberStore();
const sprintInfo = jiraStore.sprintInfo;
const storyList = jiraStore.storyList;
const memberInfo = memberStore.memberInfo;
const router = useRouter();

const makeSprint = async () => {
  console.log(sprintInfo.value, memberInfo);
  const sprintRequestBody = {
    ...sprintInfo.value,
    memberId: memberInfo.memberNo,
  };
  await createSprint(sprintRequestBody, async (data) => {
    for (const story of storyList) {
      if (story instanceof Story) {
        const storyRequestBody = {
          ...story,
          sprintId: data.data.data,
          memberId: memberInfo.memberNo,
        };
        await createStory(storyRequestBody, (data) => {
          console.log(data);
        });
      }
    }
    await router.push({name: "jira-home"});
  });
};
</script>

<template>
  <div class="jira-wrap">
    <div class="jira-dash">
      <div class="jira-title">
        <p class="font-color">JIRA 완성 !</p>
        <p>
          이번 주 내 아이와의 이야기가 완성됐어요. <br />
          이제 관리하러 가볼까요 ? <br />
        </p>
        <p>
          기간 : {{ sprintInfo.value.startDate }} ~
          {{ sprintInfo.value.endDate }}
        </p>
      </div>
      <div class="jira-content">
        <div class="todo-box" v-for="(item, index) in storyList" :key="index">
          <div class="todo-time" v-if="item instanceof Story">
            <p>{{ item.storyContent }}</p>
            <input type="number" :value="item.storyPoint" readonly />
          </div>
        </div>
        <div class="sum-point">
          <span>{{ jiraStore.totalStoryPoints }}</span> HOURS
        </div>
        <div class="jira-btn">
          <router-link :to="{ name: 'jira-plan2' }">PREV</router-link>
          <button @click="makeSprint()">관리하러 가기</button>
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
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
