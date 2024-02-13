import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useJiraCreateStore = defineStore('jira-create-store', () => {
    const sprintInfo = ref({}); // sprint: title, startDate, endDate
    const storyList = ref([undefined, undefined, undefined, undefined]); // story: storyContent, storyPoint 
    const totalStoryPoint = ref(0);

    function $reset(){
        sprintInfo.value = {};
        storyList.value = {};
    }

    return {
        sprintInfo,
        storyList,
        totalStoryPoint
    }
})