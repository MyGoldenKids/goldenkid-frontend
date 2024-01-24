import { defineStore } from "pinia";
import { ref } from "vue";

export const useMemberStore = defineStore("member-store", () => {
    const isDuplicatedId = ref(false);
    return {
        isDuplicatedId,
    };
});
