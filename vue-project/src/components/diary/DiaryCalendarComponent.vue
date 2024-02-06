<script setup>
import { ref } from "vue";
import { useCalendarStore } from "@/stores/calendar-store";
import { getDiaryByDate } from "@/api/diary";
import { useMemberStore } from "@/stores/member-store";
import { useDiaryStore } from "@/stores/diary-store";

const calendarStore = useCalendarStore();
const diaryStore = useDiaryStore();
const memberStore = useMemberStore();

const attrs = ref([
    {
        key: "today",
        dates: new Date(),
    },
]);

const formatDate = (date) => {
    // 날짜를 yyyy-mm-dd 형식으로 변환
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const getDiaryPreview = async () => {
    await getDiaryByDate(
        {
            memberId: memberStore.memberInfo.memberNo,
            createdAt: formatDate(calendarStore.date),
        },
        (response) => {
            diaryStore.preview = response.data.data;
        },
        (error) => {
            console.log(error);
        }
    );
};
</script>

<template>
    <!-- 캘린더 -->
    <div class="calendar">
        <VDatePicker
            v-model="calendarStore.date"
            locale="ko"
            transparent
            borderless
            :max-date="new Date()"
            :attributes="attrs"
            :touch="getDiaryPreview()"
        ></VDatePicker>
    </div>
</template>

<style scoped>
/* 캘린더 & 캘린더 미리보기 */
.calendar {
    width: 70%;
    height: 14rem;
    margin: 0 auto;
}
</style>
