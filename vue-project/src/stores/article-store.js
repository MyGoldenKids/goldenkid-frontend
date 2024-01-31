import { defineStore } from "pinia";
import { ref } from "vue";

export const useArticleStore = defineStore(
  "article-store",
  () => {
    const articleInfo = ref("");

    return {
      articleInfo,
    };
  },
  {
    persist: {
      storage: sessionStorage, // 세션 storage에 저장
    },
  }
);
