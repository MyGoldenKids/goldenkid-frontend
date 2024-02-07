import { defineStore } from "pinia";
import { ref } from "vue";

export const useSurveyStore = defineStore("survey-store", () => {
    const status = ref(false);
    const category = ref(0);
    const parentScore = ref(-1);
    const childScore = ref(-1);
    const parentComment = ref(0);
    const childComment = ref(0);

    function $reset(){
        parentScore.value = -1;
        childScore.value = -1;
        parentComment.value = 0;
        childComment.value = 0;
    }

    return {
        $reset,
        category,
        status,
        parentScore, 
        childScore,
        parentComment,
        childComment,
    };
},
{
    persist: {
        storage: sessionStorage,
    },
});