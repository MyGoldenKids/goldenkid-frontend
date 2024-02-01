import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFileStore = defineStore(
    "file-store",
    () => {
        const fileInfo = ref("");

        return {
            fileInfo,
        };
    },
    {
        persist: {
            storage: sessionStorage,
        },
    }
);
