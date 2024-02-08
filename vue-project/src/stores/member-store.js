import { defineStore } from "pinia";
import { ref } from "vue";

export const useMemberStore = defineStore(
    "member-store",
    () => {
        const isDuplicatedId = ref(false);
        const isLoggedIn = ref(false);
        const memberInfo = ref({
            memberId: "",
            nickname: "",
        });

        const logout = () => {
            isLoggedIn.value = false; // 로그인 여부 false로 갱신
            memberInfo.value = ""; // 로그인한 사용자 정보 초기화
        };

        return {
            isDuplicatedId,
            isLoggedIn,
            memberInfo,
            logout
        };
    },
    {
        persist: {
            storage: sessionStorage, // 세션 storage에 저장
        },
    }
);
