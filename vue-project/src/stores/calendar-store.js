import { defineStore } from "pinia";
import { ref } from "vue";

export const useCalendarStore = defineStore("calendar-store", () => {
    const date = ref(new Date());

    return {
        date,
    };
});
