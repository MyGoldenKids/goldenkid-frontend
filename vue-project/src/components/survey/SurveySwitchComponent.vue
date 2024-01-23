<script setup>
import { useSurveyStore } from "@/stores/survey-store";
import { ref, watch } from "vue";

const store = useSurveyStore();
const category = ref(store.category);

watch(() => store.category, (newValue) => {  // store.category 값이 업데이트 될 때 category  값도 업데이트 시켜주기 위한  watch 함수
    category.value = newValue;
})

// 자가진단 화면 바뀌는 동작을 담당합니다.
const switchTab = (value) => {
    if (value !== store.category) {
        store.category = value; // value 값이 들어왔을 때 현재 category 값과 같지 않을 떄만 이벤트 발생
        store.$reset();

        // 자가진단 설문지를 이동해도 이전 설문지 결과는 다시 볼 수 있도록 설정
        if (store.category === 0) {
            if (store.childScore === -1) {
                store.status = false;
            } else {
                store.status = true;
            }
        } else {
            if (store.parentScore === -1) {
                store.status = false;
            } else {
                store.status = true;
            }
        }
    }
};
</script>

<template>
    <!-- 탭 버튼 -->
    <div class="tab">
        <div>
            <button
                @click="switchTab(0)"
                :class="{ 'tab-left': true, 'tab-on': category === 0 }"
            >
                금쪽이 진단
            </button>
        </div>
        <div>
            <button
                @click="switchTab(1)"
                :class="{ 'tab-right': true, 'tab-on': category === 1 }"
            >
                부모 자가 진단
            </button>
        </div>
    </div>
</template>

<style scoped>
/* 탭 */
.tab {
    width: 30%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    text-align: center;
}
.tab-left {
    border: 3px solid #89B9AD;
    color: #89B9AD;
    box-sizing: border-box;
    border-radius: 1.2rem 0 0 1.2rem;
    width: 100%;
    height: 100%;
    padding: 0.625rem 0.625rem;
    font-size: 1.2rem;
    background-color: inherit;
    text-align: center;
}
.tab-right {
    border: 3px solid #89B9AD;
    color: #89B9AD;
    box-sizing: border-box;
    border-left: none;
    border-radius: 0 1.2rem 1.2rem 0;
    width: 100%;
    height: 100%;
    padding: 0.625rem 0.625rem;
    font-size: 1.2rem;
    background-color: inherit;
    text-align: center;
}
.tab-on {
    background-color: #89B9AD;
    color: #fff;
}
</style>
