<script setup>
import { ref, onMounted } from "vue";
import { getDiaryList } from "@/api/diary";
import { useMemberStore } from "@/stores/member-store";
import { useDiaryStore } from "@/stores/diary-store";
const memberStore = useMemberStore();
const diaryStore = useDiaryStore();
const diaryList = ref([]);

onMounted(() => {
    getDiaryList(
        memberStore.memberInfo.memberNo,
        (response) => {
            diaryList.value = response.data.data;
        },
        () => {
            console.log("다이어리 목록을 불러올 수 없습니다.");
        }
    );
});

const goToDiaryList = (diaryId, index) => {
    diaryStore.diaryId = diaryId;
    diaryStore.diaryIndex = index;
};
</script>

<template>
    <div>
        <div class="diary-list">
            <div class="item-title">
                <img
                    src="../../assets/img/sticker-star.png"
                    class="sticker-star"
                />
                <span>최근 나의 일기</span>
            </div>
            <div v-if="diaryList.length !== 0">
                <div class="diary-list-sub">
                    <ul>
                        <li
                            v-for="(diary, index) in diaryList.slice(0, 5)"
                            :key="index"
                        >
                            <router-link
                                :to="{ name: 'diary-list' }"
                                @click="goToDiaryList(diary.diaryId, diaryList.length - index)"
                            >
                                <span>#{{ diaryList.length - index }}</span>
                                <span>{{ diary.diaryTitle }}</span>
                                <!-- <span>{{ diary.createdAt }}</span> -->
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else>
                <div class="diary-ing-sub-not">작성한 일기가 없습니다.</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.item-title {
    width: 90%;
    text-align: left;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 13% auto;
    align-items: center;
}

.item-title span {
    font-family: "NanumNeuRisNeuRisCe";
    font-size: 2rem;
    font-weight: 900;
}
.sticker-star {
    width: 2.5rem;
}
.diary-list-sub {
    width: 90%;
    margin: 1.25rem auto;
    font-family: "NanumNeuRisNeuRisCe";
}
.diary-list-sub li {
    position: relative;
    width: 80%;
    padding: 0.4rem;
    margin: 0.2rem auto;
    overflow: hidden;
    text-align: left;
}
.diary-list-sub li span {
    margin-right: 1.25rem;
}
.diary-list-sub li a {
    position: relative; /* 여기에 position 추가 */
    z-index: 2; /* 텍스트를 배경보다 위로 */
    color: #000;
    text-decoration: none;
    transition: color 0.5s ease;
    background-color: transparent; /* 배경색 투명 */
    font-size: 1.5rem;
}

.diary-list-sub li a::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 0;
    height: 100%;
    background-color: rgba(137, 185, 173, 0.2); /* 형광펜 효과 색상 */
    z-index: 1; /* 텍스트 뒤로 배경을 보내기 위해 z-index 조정 */
    transition: all 0.5s ease-out; /* 부드러운 전환 효과 */
}

.diary-list-sub li a:hover::before {
    width: 100%; /* 마우스를 올리면 배경이 전체 너비로 확장 */
}
.diary-ing-sub-not {
    width: 90%;
    margin: 0 auto;
    padding: 1.25rem 0;
    font-family: "NanumNeuRisNeuRisCe";
    font-size: 1.5rem;
}
</style>
