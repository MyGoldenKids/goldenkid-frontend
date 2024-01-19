<script setup>
import { ref, reactive } from "vue";
import survey from "@/assets/json/survey.json";
import standard from "@/assets/json/surveyResult.json";

const questions = survey;
const cutOff = standard;

// 답변에 대한 점수를 저장해주는 변수, 반응형 변수로 사용하여 값이 업데이트 될 때마다 활용할 수 있게 해준다.
const childAnswer = ref([]); // 아이 ADHD 검사 내용 저장
const parentAnswer = ref([]); // 부모 depression 검사 내용 저장

let category = ref(0); // 설문지 종류 추적
let result = ref(); // 설문 점수를 내려주기 위한 변수
let resultComment = ref(); // DOM에 comment값을 내려주기 위한 변수

const status = reactive({ value: false }); // 결과창은 제출 버튼을 눌렀을 경우에만 보여주기 위해서 상태관리를 해주기 위함

// 설문지 화면 바뀌는 동작을 담당합니다.
const switchTab = (value) => {
  if (value !== category.value) {
    category.value = value; // value 값이 들어왔을 때 현재 category 값과 같지 않을 떄만 이벤트 발생

    // 설문지를 이동해도 이전 설문지 결과는 다시 볼 수 있도록 설정
    if (category.value === 0) {
      if (childAnswer.value.length !== 20) {
        status.value = false;
      } else {
        status.value = true;
      }
    } else {
      console.log(parentAnswer.value.length);
      if (parentAnswer.value.length !== 9) {
        status.value = false;
      } else {
        status.value = true;
      }
    }
  }
};

// sumFunction 함수 선언 비동기로 호출되어 순차적인 합산이 가능하게 하였습니다.
const sumFunction = async (a, b) => a + b;

// answer 배열 돌면서 sum 구하는 함수
const calculate = async (value) => {
  let sum = 0;
  // value값에 따라 설문지 합산 결과가 달라진다.
  if (value === 0) {
    for (let item of childAnswer.value) {
      sum = await sumFunction(sum, item);
    }
    sum *= 5; // ADHD의 경우 100점 만점 기준의 score가 필요함
  } else {
    for (let item of parentAnswer.value) {
      sum = await sumFunction(sum, item);
    }
  }
  status.value = true;
  result.value = sum;
  await resultView();
};

// 검사결과 완료되지않았음을 체크하기 위한 함수
const isComplete = async () => {
  let answer = [];
  let length = 0; // 문항 수 체크를 위한 변수
  if (category.value === 0) {
    answer = childAnswer.value;
    length = 20;
  } else {
    answer = parentAnswer.value;
    length = 9;
  }
  if (answer.length !== length) {
    // 설문 체크를 하지 않은 문항이 있다면 alert 창 띄우고 return
    alert("선택하지 않은 문항이 있습니다.");
    return;
  } else {
    await calculate(category.value);
  }
};

const resultView = async () => {
  let comment = "";
  const results = cutOff[category.value][category.value];

  if (category.value === 0) {
    if (result.value < 40) {
      comment = results[0].result;
    } else if (result.value < 60) {
      comment = results[1].result;
    } else if (result.value < 80) {
      comment = results[2].result;
      ``;
    } else {
      comment = results[3].result;
    }
  } else {
    if (result.value < 5) {
      comment = results[0].result;
    } else if (result.value < 10) {
      comment = results[1].result;
    } else if (result.value < 15) {
      comment = results[2].result;
    } else if (result.value < 20) {
      comment = results[3].result;
    } else {
      comment = results[4].result;
    }
  }

  resultComment.value = comment;
};
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
            <input type="radio" :value="num - 1" v-model="childAnswer[index]" />
          </span>
        </span>
        <span v-else>
          <span v-for="num in question.choices">
            <input type="radio" :value="num - 1" v-model="parentAnswer[index]" />
          </span>
        </span>
      </label>
    </div>
    <button type="submit">제출하기</button>
  </form>

  <div v-show="status.value">
    <div v-if="category === 0">
      <p>14문제 이상으로 나왔다면 주의집중 결핍장애, 과잉행동장애(ADHD)를 의심해볼 것.</p>
      {{ resultComment }}
    </div>
    <div v-else>
      <p>{{ resultComment }}</p>
    </div>
  </div>
</template>

<style scoped></style>
