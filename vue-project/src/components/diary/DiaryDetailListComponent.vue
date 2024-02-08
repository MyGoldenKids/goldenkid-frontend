<script setup>
import { ref, onMounted } from "vue";
import { getDiaryList, getDiaryDetail, deleteDiary } from "@/api/diary";
import { getFileInfo, downloadFile } from "@/api/file";
import { useMemberStore } from "@/stores/member-store";
import { useDiaryStore } from "@/stores/diary-store";
import router from "@/router";
const memberStore = useMemberStore();
const diaryStore = useDiaryStore();
const diaryList = ref([]);
const diaryDetail = ref("");
const fileData = ref([]);
const fileListId = ref("");
const imageUrl = ref("");
const { VITE_SERVER_URL } = import.meta.env;

onMounted(async () => {
    const response = await getDiaryList(memberStore.memberInfo.memberNo);
    diaryList.value = response.data.data;
    
    // 최근 다이어리 모음에서 선택한 값이 있는 경우
    if (diaryStore.diaryId) {
        await fetchDiaryDetail(diaryStore.diaryId); // 다어이리 모음에서 선택한 다이어리 정보 가져오기
        diaryStore.diaryId = ""; // 가져온 후에는 초기화
    }
    // 가장 최근 다이어리 가져오기
    else if (!diaryDetail.value && diaryList.value.length > 0) {
        await fetchDiaryDetail(diaryList.value[0].diaryId);
    }
});

// 파일 다운로드
const download = async (fileId, fileName) => {
        await downloadFile(fileId, (response) => {
        // Blob 데이터 처리
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        // 파일 이름 설정 (예: 'download.pdf')
        link.setAttribute("download", fileName);

        // 문서에 링크 추가, 클릭 이벤트 발생, 링크 제거
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // URL 해제
        window.URL.revokeObjectURL(url);
    });
};

const fetchDiaryDetail = async (diaryId) => {
    const response = await getDiaryDetail(diaryId);
    diaryDetail.value = {
        ...response.data.data,
        diaryId: diaryId,
    };
    fileListId.value = diaryDetail.value.fileListId;
    if(fileListId.value){
        fileData.value = await getFileInfo(fileListId.value);
        const fileId = fileData.value.data.data[0].fileId;
        imageUrl.value = `${VITE_SERVER_URL}/file/download/${fileId}`;
    } else {
        fileData.value = { data: { data: [] } };
        imageUrl.value = "";
    }
};

const deleteDiaryDetail = (diaryId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
        deleteDiary(diaryId, () => {
            // 삭제 후 목록 다시 가져오기
            getDiaryList(memberStore.memberInfo.memberNo, (response) => {
                diaryList.value = response.data.data;

                // 가장 최근 다이어리 가져오기
                if (diaryList.value.length > 0) {
                    fetchDiaryDetail(diaryList.value[0].diaryId);
                } else {
                    // 목록이 비어있을 경우 초기화
                    diaryDetail.value = "";
                }
            });
        });
    }
};

const goToModify = (diaryId) => {
    diaryStore.diaryInfo = diaryDetail.value;
    router.push(`/diary/update/${diaryId}`);
};
</script>

<template>
    <div class="diary-content">
        <div class="content-left">
            <div v-if="diaryDetail">
                <div class="diary-content-box">
                    <div class="title">{{ diaryDetail.diaryTitle }}</div>
                    <div class="title-under">
                        <div class="title-sub">
                            <span>#{{ diaryDetail.diaryId }}번째 일기</span>
                            <span>{{ diaryDetail.cratedAt }}</span>
                        </div>
                        <div class="title-btn">
                            <button @click="goToModify(diaryDetail.diaryId)">수정</button>
                            <button
                                @click="deleteDiaryDetail(diaryDetail.diaryId)"
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                    <div class="diary-detail">
                        
                            <div v-if="imageUrl !== '' && imageUrl !== 'null' && imageUrl !== 'undefined' && imageUrl !== null">
                                <div class="diary-img">
                                    <img :src="imageUrl" alt="diary-img-err" height="300px" width="500px"/>
                                </div>
                            </div>
                        
                        <div class="diary-text">
                            {{ diaryDetail.diaryContent }}
                        </div>
                        <div class="upload">
                            <div v-if="fileData.data && fileData.data.data && fileData.data.data.length > 0 ">
                                <div class="upload-header">
                                    <img src="../../assets/img/Attachfile.png" alt="attach-img-err" />
                                    <span class="attach-title">첨부된 파일</span>
                                </div>
                            <div v-for="(file, index) in fileData.data.data" :key="index" class="fileList">
                                <button @click="download(file.fileId, file.fileOriginalName)">
                                    {{ file.fileOriginalName }}
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="empty-diary">
                    <div class="sub-title">😂 작성한 일기가 없어요...</div>
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
    /* background-color: chocolate; */
    margin: 0 1.2rem 1.2rem;
    /* 일기상세에서 보여줄 이미지 크기 정해야함 (임시) */
    width: 31.25rem;
    height: 18.75rem;
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
.list-title a:hover span {
    color: #fff !important;
    transition-duration: 0.5s;
}

.empty-diary {
    font-size: 3.5rem;
}

.upload-header {
    width: 30%;
    margin-top: 3rem;
    display: grid;
    grid-template-columns: 10% 90%;
    align-items: center;
}

.upload span {
    font-size: 1.5rem;
    font-weight: 600;
    margin-left: 1rem;
}

.fileList button {
    background-color: #fff8f2;
}
</style>
