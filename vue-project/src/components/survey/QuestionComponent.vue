<script setup>
import { ref } from "vue";
import data from "@/assets/json/survey.json";

const questions = data;

// 답변에 대한 점수를 저장해주는 변수, 반응형 변수로 사용하여 값이 업데이트 될 때마다 활용할 수 있게 해준다.
const childAnswer = ref([]);  // 아이 ADHD 검사 내용 저장
const parentAnswer = ref([]);  // 부모 depression 검사 내용 저장

let category = ref(0); // 설문지 종류 추적
let sum = 0;
let result = ref();

const sumFunction = async (a, b) => a + b; // sumFunction 함수 선언 비동기로 호출되어 순차적인 합산이 가능하게 하였다.

// answer 배열 돌면서 sum 구하는 함수
const calculate = async (value) => {
  sum = 0;
  // value값에 따라 설문지 합산 결과가 달라진다.
  if (value === 0) {
    for (let item of childAnswer.value) {
      sum = await sumFunction(sum, item);
    }
    sum *= 5;  // ADHD의 경우 
  } else{
    for (let item of parentAnswer.value) {
      sum = await sumFunction(sum, item);
    }
  }
  result.value = sum;
};

const switchTab = (value) => {
  if (value !== category.value) {
    // value 값이 들어왔을 때 현재 category 값과 같지 않을 떄만 이벤트 발생
    category.value = value;
  }
};

// 검사결과 완료되지않았음을 체크하기 위한 함수
const isComplete = async() => {
  let answer = [];
  let length = 0;  // 문항 수 체크를 위한 변수
  if(category.value === 0){
    answer = childAnswer.value;  
    length = 20;
  } else{
    answer = parentAnswer.value;
    length = 9;
  }
  if (answer.length !== length){  // 설문 체크를 하지 않은 문항이 있다면 alert 창 띄우고 return
    alert("선택하지 않은 문항이 있습니다.")
    return;
  } else{
    calculate(category.value);
  }
}

</script>

<template>
  <div class="tab">
    <button @click="switchTab(0)">금쪽이 진단</button>
    <button @click="switchTab(1)">부모 자가 진단</button>
  </div>
  <!-- adhd test category 0번 -->
  <!-- phq-9 test category 1번 -->
  <form @submit.prevent="isComplete">
    <div v-for="(question, index) in questions[category][category]">
      <label>
        {{ question.num }}) {{ question.question }}
        <span v-if="category === 0">
          <!-- index는 0부터 시작하기 떄문에 +1 진행 -->
          <!-- 단일 선택만 가능하게하고 그룹화하여 값을 저장
            :value로 자료형을 자동으로 변환할 수 있도록 하였음  -->
          <span v-for="num in question.choices">
            <input type="radio" :value="num-1" v-model="childAnswer[index]" />
          </span>
        </span>
        <span v-else>
          <span v-for="num in question.choices">
            <input type="radio" :value="num-1" v-model="parentAnswer[index]" />
          </span>
        </span>
      </label>
    </div>
    <button type="submit">제출하기</button>
  </form>
</template>

<style scoped></style>
