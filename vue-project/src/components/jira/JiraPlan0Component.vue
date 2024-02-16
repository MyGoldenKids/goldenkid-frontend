<script setup>
import { useJiraCreateStore } from "@/stores/jira-create-store";
const store = useJiraCreateStore();
const sprintInfo = store.sprintInfo;
sprintInfo.value = { sprintTitle: "", startDate: "", endDate: "" };
</script>

<template>
  <div class="jira-wrap">
    <div class="jira-dash">
      <div class="jira-title">
        <h1>STEP0</h1>
        <p class="font-color">에피소드 생성</p>
        <p>에피소드를 생성하세요!<br /></p>
      </div>
      <div class="jira-content">
        <div class="content-title">
          <form class="sprint-form">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              maxlength="10"
              v-model="sprintInfo.value.sprintTitle"
            />
            <div class="date-form">
              <div class="start-date">
                <div>시작일</div>
                <input type="date" v-model="sprintInfo.value.startDate" />
              </div>
              <div class="end-date">
                <div>종료일</div>
                <input type="date" v-model="sprintInfo.value.endDate" />
              </div>
            </div>
          </form>
        </div>
        <div class="jira-btn">
          <router-link :to="{ name: 'jira-plan1' }">NEXT</router-link>
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

.jira-content {
  padding: 0.625rem;
}

.jira-btn {
  margin: 5rem 0 2.5rem 0;
}
.jira-btn a {
  background-color: #665031;
  color: #fff;
  border: none;
  padding: 0.625rem 2.5rem;
  border-radius: 0.625rem;
  font-size: 1.5rem;
}

.date-form {
  width: 60%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.625rem;
  margin: 2.5rem auto;
}

.sprint-form {
  margin: 2.5rem auto;
}
.sprint-form input {
  font-family: inherit;
  font-size: 1rem;
  color: #ad9478;
  border-radius: 0.625rem;
  padding: 0.625rem;
  border: none;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: border-color 0.2s box-shadow 0.2s;
  background-color: #fff8f2;
  border: 2px solid transparent;
}

.sprint-form input:focus {
  border: 2px solid #665031;
  outline: none;
  box-sizing: border-box;
}

.sprint-form input::placeholder {
  color: #ad9478;
}

.start-date div,
.end-date div {
  margin: 0.625rem 0;
}
</style>
