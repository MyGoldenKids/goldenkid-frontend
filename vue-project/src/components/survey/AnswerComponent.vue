<script setup>
import { useSurveyStore } from "@/stores/survey-store";

const store = useSurveyStore();
</script>

<template>
    <div v-if="store.category === 0">
        <p>
            70점 이상으로 나왔다면 주의집중 결핍장애, 과잉행동장애(ADHD)를
            의심해볼 것.
        </p>
        <br>
        <p>
            {{ store.childScore }}점
        </p>
        <br>
        <p>
            {{ store.childComment }}
        </p>
    </div>
    <div v-else>
        <p>{{ store.parentComment }}</p>
    </div>
</template>

<style scoped>
p {
    text-align: center;
    width: 70%;
    margin: 0 auto;
    line-height: 1.5rem;
}
</style>
