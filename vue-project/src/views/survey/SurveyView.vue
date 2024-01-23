<script setup>
import SurveyHeaderComponent from "@/components/survey/SurveyHeaderComponent.vue";
import SurveySwitchComponent from "@/components/survey/SurveySwitchComponent.vue";
import QuestionComponent from "@/components/survey/QuestionComponent.vue";
import AnswerComponent from "@/components/survey/AnswerComponent.vue";
import { useSurveyStore } from "@/stores/survey-store";

const store = useSurveyStore();
</script>

<template>
    <div>
        <SurveyHeaderComponent></SurveyHeaderComponent>
        <SurveySwitchComponent></SurveySwitchComponent>

        <div class="survey-wrap">
            <div class="survey-content">
                <div v-if="!store.status">
                    <QuestionComponent></QuestionComponent>
                </div>
                <div v-else>
                    <AnswerComponent></AnswerComponent>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.survey-wrap {
    /* background-color: pink; */
    padding: 20px 0;
}

.survey-content {
    width: 90%;
    margin: 2.4rem auto;
    border-radius: 50px;
    background-color: #fff;
    padding: 1.5rem;
}
</style>
