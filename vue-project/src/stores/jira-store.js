import { defineStore } from "pinia";
import { ref } from "vue";

export const jiraStore = defineStore("jira-store", () => {
    const sprintList = ref([]);
    const storyList = ref([]);
    const storyDetail = ref({});
    const sprintId = ref(0);
    const storyId = ref(0);
    const storyStatus = ref(0);
    const storyContent = ref({});

    function $reset() {
        sprintList.value = [];
        storyList.value = [];
        storyDetail.value = {};
        sprintId.value = 0;
        storyId.value = 0;
        storyStatus.value = 0;
        storyContent.value = {};
    }

    return {
        $reset,
        sprintList,
        storyList,
        storyDetail,
        sprintId,
        storyId,
        storyStatus,
        storyContent,
    };
});