import { defineStore } from "pinia";
import { ref } from "vue";

export const useSurveyStore = defineStore("survey-store", () => {
    const status = ref(false);
    const category = ref(0);
    const parentComment = ref(0);
    const childComment = ref(0);

    function $reset(){
        parentComment.value = 0;
        childComment.value = 0;
    }

    return {
        category,
        status,
        parentComment, 
        childComment,
    };
});