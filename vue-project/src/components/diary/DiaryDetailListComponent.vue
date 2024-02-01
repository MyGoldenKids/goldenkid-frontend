<script setup>
import { ref, onMounted } from "vue";
import { getDiaryList, getDiaryDetail } from "@/api/diary";
import { useMemberStore } from "@/stores/member-store";
import { useDiaryStore } from "@/stores/diary-store";
const memberStore = useMemberStore();
const diaryStore = useDiaryStore();
const diaryList = ref([]);
const diaryDetail = ref("");

onMounted(() => {
    getDiaryList(
        memberStore.memberInfo.memberNo,
        (response) => {
            diaryList.value = response.data.data;

            // 최근 다이어리 모음에서 선택한 값이 있는 경우
            if (diaryStore.diaryId) {
                fetchDiaryDetail(diaryStore.diaryId); // 다어이리 모음에서 선택한 다이어리 정보 가져오기
                diaryStore.diaryId = ""; // 가져온 후에는 초기화
            }
            // 가장 최근 다이어리 가져오기
            else if (!diaryDetail.value && diaryList.value.length > 0) {
                fetchDiaryDetail(diaryList.value[0].diaryId);
            }
        },
        () => {
            console.log("다이어리 목록을 불러올 수 없습니다.");
        }
    );
});

const fetchDiaryDetail = (diaryId) => {
    getDiaryDetail(diaryId, (response) => {
        diaryDetail.value = {
            ...response.data.data,
            diaryId: diaryId,
        };
    });
};
</script>

<template>
    <div class="diary-content">
        <div class="content-left">
            <div class="diary-content-box">
                <div class="title">{{ diaryDetail.diaryTitle }}</div>
                <div class="title-under">
                    <div class="title-sub">
                        <span>#{{ diaryDetail.diaryId }}번째 일기</span>
                        <span>{{ diaryDetail.cratedAt }}</span>
                    </div>
                    <div class="title-btn">
                        <button>수정</button>
                        <button>삭제</button>
                    </div>
                </div>
                <div class="diary-detail">
                    <div class="diary-img">
                        이미지 크기 얼마로 해야할지 고민중 500x300 px
                    </div>
                    <div class="diary-text">
                        {{ diaryDetail.diaryContent }}
                    </div>
                </div>
            </div>
        </div>
        <div class="content-right">
            <div class="diary-list">
                <div class="list-title">
                    <ul>
                        <li v-for="(diary, index) in diaryList" :key="index">
                            <a @click="fetchDiaryDetail(diary.diaryId)">
                                <span>#{{ diary.diaryId }}</span>
                                <span>{{ diary.diaryTitle }}</span>
                                <span>{{ diary.createdAt }}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 다이어리 컨텐츠 */
.diary-content {
    /* background-color: pink; */
    display: grid;
    grid-template-columns: 60% 40%;
}

/* 다이어리 왼쪽 부분 */
.content-left {
    /* background-color: cadetblue; */
    text-align: left;
    padding: 1.2rem;
    box-sizing: border-box;
    font-family: "NanumNeuRisNeuRisCe";
}
.title {
    padding-bottom: 0.313rem;
    padding-left: 0.313rem;
    border-bottom: 0.313rem solid #89b9ad;
    font-size: 3rem;
    font-weight: 600;
}

/* 타이틀 아래 */
.title-under {
    display: grid;
    grid-template-columns: auto 1fr;
    padding: 0.625rem 0.313rem 0 0.313rem;
}
.title-sub span {
    font-size: 1.5rem;
    font-weight: 500;
}
.title-sub span:last-child {
    margin-left: 2rem;
}
.title-btn {
    justify-self: end;
    align-items: center;
}
.title-btn button {
    display: inline-block;
    border: none;
    background-color: #89b9ad;
    color: #fff;
    border-radius: 1.2rem;
    padding: 0.313rem 1.2rem;
    margin-left: 0.313rem;
}
.title-btn button:hover {
    background-color: #e1baad;
    transition-duration: 0.8s;
    cursor: pointer;
}

/* 다이어리 내용 */
.diary-detail {
    height: 31.25rem;
    overflow-y: scroll;
    margin-top: 1.875rem;
}

.diary-img {
    background-color: chocolate;
    margin: 0 1.2rem 1.2rem;
    /* 일기상세에서 보여줄 이미지 크기 정해야함 (임시) */
    width: 500px;
    height: 300px;
}
.diary-text {
    line-height: 2.2rem;
    padding: 0 1.2rem;
    font-size: 1.8rem;
    font-weight: 600;
}

/* 다이어리 오른쪽 부분 */
.content-right {
    text-align: left;
    padding: 1.2rem 0 1.2rem 1.2rem;
    box-sizing: border-box;
}

/* 다이어리 리스트 검색 */

/* 다이어리 리스트 */
.diary-list span {
    color: #89b9ad;
}

.list-title a {
    border: 0.2rem solid #89b9ad;
    background-color: initial;
    display: grid;
    border-radius: 1.2rem;
    grid-template-columns: auto auto 1fr;
    padding: 0.625rem 1rem;
    margin: 1rem 0;
    align-items: center;
}
.list-title span {
    padding-right: 0.625rem;
}
.list-title span:last-child {
    justify-self: end;
    font-size: 0.8rem;
    padding-right: 0;
}
.list-title a:hover {
    background-color: #89b9ad;
    transition-duration: 0.5s;
}
.list-title:hover span {
    color: #fff !important;
    transition-duration: 0.5s;
}
</style>
