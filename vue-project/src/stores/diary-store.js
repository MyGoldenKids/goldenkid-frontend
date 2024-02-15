import { defineStore } from "pinia";
import { ref } from "vue";

export const useDiaryStore = defineStore(
    "diary-store",
    () => {
        const diaryId = ref("");
        const diaryIndex = ref("");
        const diaryInfo = ref("");
        const createdDiaryId = ref("");
        const selectedDraftId = ref("");
        const draft = ref("");
        const preview = ref("");

        return {
            diaryId,
            diaryIndex,
            diaryInfo,
            createdDiaryId,
            selectedDraftId,
            draft,
            preview,
        };
    },
    {
        persist: {
            storage: sessionStorage,
        },
    }
);
