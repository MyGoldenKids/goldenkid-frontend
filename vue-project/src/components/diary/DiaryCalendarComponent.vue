<script setup>
import { ref } from "vue";

const attrs = ref([
    {
        key: "today",
        content: "purple",
        dates: new Date(),
    },
]);
</script>

<template>
        <!-- 캘린더 -->
        <div class="calendar">
            <VCalendar
                locale="ko"
                borderless
                transparent
                :max-date="new Date()"
                :attributes="attrs"
            ></VCalendar>
        </div>
</template>

<style scoped>

/* 캘린더 & 캘린더 미리보기 */
.calendar {
    width: 70%;
    height: 12.5rem;
    margin: 0 auto;
}
</style>
