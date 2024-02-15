<script setup>
import { useSurveyStore } from "@/stores/survey-store";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useSurveyStore();

const goJira = () => {
    router.push("/jira/home");
};
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
        <div class="go-signup">
            PLAN 기록하기
            <button @click="goJira">GO</button>
        </div>
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

.go-signup {
    text-align: center;
    padding: 2rem 0 0 1rem;
    font-size: 1.1rem;
}
.go-signup button {
    border: none;
    border-radius: 30%;
    background-color: #89B9AD;
    color: #fff8f2;
    font-size: 1.1rem;
    padding: 0.313rem 0.625rem;
}

.go-signup button:hover {
    background-color: #e2bcb1;
    transition: 0.5s;
}
</style>
