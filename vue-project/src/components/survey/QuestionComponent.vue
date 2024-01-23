<script setup>
import { ref, watch } from "vue";
import survey from "@/assets/json/survey.json";
import standard from "@/assets/json/surveyResult.json";
import { useSurveyStore } from "@/stores/survey-store";

const store = useSurveyStore();
const questions = survey;
const cutOff = standard;

watch(
    () => store.category,
    (newValue) => {
        // store.category 값이 업데이트 될 때 category  값도 업데이트 시켜주기 위한  watch 함수
        category.value = newValue;
    }
);

// 답변에 대한 점수를 저장해주는 변수, 반응형 변수로 사용하여 값이 업데이트 될 때마다 활용할 수 있게 해준다.
const childAnswer = ref([]); // 아이 ADHD 검사 내용 저장
const parentAnswer = ref([]); // 부모 depression 검사 내용 저장

const category = ref(store.category); // 자가진단지 종류 추적

// sumFunction 함수 선언 비동기로 호출되어 순차적인 합산이 가능하게 하였습니다.
const sumFunction = async (a, b) => a + b;

// 설문 결과 총점을 계산해주는 함수입니다. ADHD test는 총점 100점 기준으로 하였고, 우울증세 테스트는 총점 27점 기준입니다.
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
    store.status = true;
    if (category.value === 0) {
        store.childScore = sum;
    } else {
        store.parentScore = sum;
    }

    await resultView();
};

// 검사 진행 완료되지 않았음을 체크하기 위한 함수
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

    for (let idx = 0; idx < length; idx++) {
        if (answer[idx] === undefined) {
            alert("선택하지 않은 문항이 있습니다.");
            return;
        }
    }
    await calculate(category.value); // 체크를 모두 진행한 후 함수를 호출하기 위해 비동기 처리
};

// 검사 결과를 기준에 따라 정해진 comment를 보여줄 수 있도록 처리한 함수
const resultView = async () => {
    let comment = "";
    const results = cutOff[store.category][store.category];

    if (store.category === 0) {
        if (store.childScore < 40) {
            comment = results[0].result;
        } else if (store.childScore < 60) {
            comment = results[1].result;
        } else if (store.childScore < 80) {
            comment = results[2].result;
        } else {
            comment = results[3].result;
        }

        store.childComment = comment;
    } else {
        if (store.parentScore < 5) {
            comment = results[0].result;
        } else if (store.parentScore < 10) {
            comment = results[1].result;
        } else if (store.parentScore < 15) {
            comment = results[2].result;
        } else if (store.parentScore < 20) {
            comment = results[3].result;
        } else {
            comment = results[4].result;
        }
        store.parentComment = comment;
    }
};
</script>

<template>
    <!-- 설문조사 체크 -->
    <div v-if="category === 0" class="content-title">
        <h1>금쪽이 자가 진단</h1>
    </div>
    <div v-else class="content-title">
        <h1>부모 자가 진단</h1>
        <div class="content-title-sub">
            <p>0</p>
            <p>젼혀 방해 받지 않았다</p>
        </div>
        <div class="content-title-sub">
            <p>1</p>
            <p>며칠 동안 방해 받았다</p>
        </div>
        <div class="content-title-sub">
            <p>2</p>
            <p>7일 이상 방해 받았다</p>
        </div>
        <div class="content-title-sub">
            <p>3</p>
            <p>거의 매일 방해 받았다</p>
        </div>
    </div>

    <!-- adhd test category 0번 -->
    <!-- phq-9 test category 1번 -->
    <form @submit.prevent="isComplete">
        <div
            v-for="(question, index) in questions[category][category]"
            class="select-box"
        >
            <div class="select-num">{{ question.num }}.</div>
            <div class="select-content">{{ question.question }}</div>
            <div v-if="category === 0">
                <!-- <span v-for="num in question.choices">
                            <input type="radio" :value="num - 1" v-model="childAnswer[index]" />
                        </span> -->
                <label v-for="num in question.choices" class="radio-button">
                    <input
                        type="radio"
                        :value="num - 1"
                        v-model="childAnswer[index]"
                    />
                    <span v-if="num - 1 === 0" class="radio-text">X</span>
                    <span v-else class="radio-text">O</span>
                </label>
            </div>
            <div v-else>
                <label v-for="num in question.choices" class="radio-button">
                    <input
                        type="radio"
                        :value="num - 1"
                        v-model="parentAnswer[index]"
                    />
                    <span class="radio-text"> {{ num - 1 }}</span>
                </label>
            </div>
        </div>

        <button type="submit" class="submit-btn">제출하기</button>
    </form>
</template>

<style scoped>
/* 설문조사 */
.content-title {
    margin-bottom: 3.13rem;
}
.content-title h1 {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 2rem;
}
.content-title-sub {
    width: 30%;
    margin: 0 auto;
    text-align: center;
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    padding: 0.313rem 0;
}
.content-title-sub p:first-child {
    width: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    border: 2px solid #89b9ad;
    border-radius: 50%;
    color: #89b9ad;
    box-sizing: border-box;
}

/* 라디오버튼 꾸미기 */
.radio-button input[type="radio"] {
    display: none;
}
.radio-button .radio-text {
    padding: 0.313rem;
    border: 2px solid #89b9ad;
    border-radius: 50%;
    display: inline-block;
    width: 1.2rem;
    height: 1.1rem;
    line-height: 1.2rem;
    text-align: center;
    color: #89b9ad;
    margin-right: 0.313rem;
}
.radio-button input[type="radio"]:checked + .radio-text {
    background-color: #89b9ad;
    color: #fff;
}

.select-box {
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 10% 70% 25%;
    align-items: center;
    padding: 0.625rem 0;
}
.select-num {
    font-size: 1.5rem;
}
.submit-btn {
    display: block;
    margin: 2.4rem auto;
    padding: 0.625rem 2.4rem;
    background-color: inherit;
    color: #89b9ad;
    border: 2px solid #89b9ad;
    border-radius: 20px;
    font-size: 1.2rem;
}
.submit-btn:hover {
    background-color: #89b9ad;
    color: #fff;
    transition-duration: 0.5s;
}
</style>
