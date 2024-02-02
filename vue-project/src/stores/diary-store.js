import { defineStore } from "pinia";
import { ref } from "vue";

export const useDiaryStore = defineStore(
    "diary-store",
    () => {
        const diaryId = ref("");
        const diaryInfo = ref("");

        return {
            diaryId,
            diaryInfo,
        };
    },
    {
        persist: {
            storage: sessionStorage,
        },
    }
);
