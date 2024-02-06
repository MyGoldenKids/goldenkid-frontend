import { defineStore } from "pinia";
import { ref } from "vue";

export const useDiaryStore = defineStore(
    "diary-store",
    () => {
        const diaryId = ref("");
        const diaryInfo = ref("");
        const createdDiaryId = ref("");
        const selectedDraftId = ref("");
        const draft = ref("");

        return {
            diaryId,
            diaryInfo,
            createdDiaryId,
            selectedDraftId,
            draft,
        };
    },
    {
        persist: {
            storage: sessionStorage,
        },
    }
);
