import { defineStore } from "pinia";
import { ref } from "vue";

export const useMemberStore = defineStore("member-store", () => {
    const isDuplicatedId = ref(false);
    const isLoggedIn = ref(false);
    const memberInfo = ref({
        memberId: "",
        nickname: "",
    });

    return (
        {
            isDuplicatedId,
            isLoggedIn,
            memberInfo,
        },
        {
            persist: true,
        }
    );
});
