<script setup>
import { ref } from "vue";
import { useCalendarStore } from "@/stores/calendar-store";

const store = useCalendarStore();

const attrs = ref([
    {
        key: "today",
        dates: new Date(),
    },
]);
</script>

<template>
    <!-- 캘린더 -->
    <div class="calendar">
        <!-- <VCalendar
                locale="ko"
                borderless
                transparent
                :max-date="new Date()"
                :attributes="attrs"
            ></VCalendar> -->
        <VDatePicker
            v-model="store.date"
            locale="ko"
            transparent
            borderless
            :max-date="new Date()"
            :attributes="attrs"
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
