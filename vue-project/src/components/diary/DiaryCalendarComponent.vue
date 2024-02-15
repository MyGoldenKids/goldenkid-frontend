<script setup>
import { ref, onMounted } from "vue";
import { useCalendarStore } from "@/stores/calendar-store";
import { getDiaryByDate, getCalendarDiary } from "@/api/diary";
import { useMemberStore } from "@/stores/member-store";
import { useDiaryStore } from "@/stores/diary-store";

const calendarStore = useCalendarStore();
const diaryStore = useDiaryStore();
const memberStore = useMemberStore();
const dateList = ref([]);

onMounted(() => {
    getCalendarDiary(
        memberStore.memberInfo.memberNo,
        (response) => {
            dateList.value = response.data.data;
            // 2014-02-07 형식에서 년, 월, 일을 추출하여 배열에 저장
            dateList.value.forEach((date) => {
                const [year, month, day] = date.split("-");
                attrs.value.push({
                    key: "highlight",
                    dot: "red",
                    dates: new Date(year, month - 1, day),
                });
            });
        },
        (error) => {
            console.log(error);
        }
    );
});

const attrs = ref([
    {
        key: "today",
        dates: new Date(),
    },
    {
        key: "highlight",
        dot: 'red',
        dates: []
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
            createdAt: formatDate(new Date(calendarStore.date)),
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
    margin: 0.625rem auto 0 auto;
}

:deep(button[type="button"]) {
    background-color: inherit !important;
}

:deep(.vc-light.vc-attr,
.vc-light .vc-attr ) {
    --vc-highlight-solid-bg: #ad9478;
}
</style>
