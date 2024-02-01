import { defineStore } from "pinia";
import { ref } from "vue";

export const useDiaryStore = defineStore(
    "diary-store",
    () => {
        const diaryId = ref("");

        return {
            diaryId,
        };
    },
    {
        persist: {
            storage: sessionStorage,
        },
    }
);
