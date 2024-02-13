<script setup>
import {
    submitDiary,
    updateDiary,
    deleteDiary
} from "@/api/diary";
import { createFileList } from "@/api/file";
import { ref } from "vue";
import { useMemberStore } from "@/stores/member-store";
import router from "@/router";
import { useDiaryStore } from "@/stores/diary-store";
const memberStore = useMemberStore();
const diaryStore = useDiaryStore();
const formData = new FormData();
const memberNo = memberStore.memberInfo.memberNo;

const createFiles = async(memberNo, formData) => {
    for (let file of fileList.value) {
        formData.append("files", file);
    }
    const fileListId = await createFileList(memberNo, formData);

    return fileListId;
};

// 첨부한 파일의 이름으로 넣어주는 코드
const fileList = ref([]);
const handleFileChange = (event) => {
    for (const file of Array.from(event.target.files)) {
        fileList.value.push(file);
    }
};

// 삭제 버튼
const deleteButton = (idx) => {
    if (idx >= 0 && idx < fileList.value.length) {
        fileList.value.splice(idx, 1);
    } else {
        fileList.value.splice(idx, idx);
    }
}

// 다이어리 제출 폼
const diarySubmitForm = ref({
    diaryId:
        diaryStore.createdDiaryId === ""
            ? diaryStore.selectedDraftId
            : diaryStore.createdDiaryId, // 다이어리 생성 시 받야와야 함
    memberId: memberStore.memberInfo.memberNo,
    diaryTitle: diaryStore.draft.diaryTitle,
    diaryContent: diaryStore.draft.diaryContent,
    diaryReview: diaryStore.draft.diaryReview,
    fileListId: diaryStore.draft.fileListId,
});

const date = new Date().toLocaleDateString();

const submitDiaryForm = async () => {
    if(diarySubmitForm.value.diaryTitle === undefined) {
        alert("제목을 입력해주세요");
        return;
    }
    if(diarySubmitForm.value.diaryContent === undefined) {
        alert("내용을 입력해주세요");
        return;
    }
    if(diarySubmitForm.value.diaryTitle.length > 100) {
        alert("제목은 100자 이내로 입력해주세요");
        return;
    }
    if(diarySubmitForm.value.diaryContent.length > 3000) {
        alert("내용은 3000자 이내로 입력해주세요");
        return;
    }
    if (window.confirm("일기를 등록할까요?")) {
        if(fileList.value.length > 0) {
            diarySubmitForm.value.fileListId = await createFiles(memberNo, formData);
        }


        await submitDiary(
            diarySubmitForm,
            () => {
                // 등록 성공 시 일기모음 페이지로 이동
                router.push({ name: "diary-list" });
                diaryStore.draft = "";
                diaryStore.selectedDraftId = "";
                diaryStore.createdDiaryId = "";
            },
            (error) => {
                console.log(error);
            }
        );
    }
};

const cancel = (diaryId) => {
    if (
        window.confirm(
            "일기 작성을 취소할까요? 작성한 일기는 저장되지 않습니다."
        )
    ) {
        deleteDiary(
            diaryId,
            () => {
                // 취소 시 일기모음 페이지로 이동
                router.push({ name: "diary-list" });
                diaryStore.draft = "";
                diaryStore.selectedDraftId = "";
                diaryStore.createdDiaryId = "";
            },
            (error) => {
                console.log(error);
            }
        );
    }
};

const save = (diaryId) => {
    if(diarySubmitForm.value.diaryTitle === '') {
        alert("제목을 입력해주세요");
        return;
    }
    if(diarySubmitForm.value.diaryContent === '') {
        alert("내용을 입력해주세요");
        return;
    }
    if(diarySubmitForm.value.diaryTitle.length > 100) {
        alert("제목은 100자 이내로 입력해주세요");
        return;
    }
    if(diarySubmitForm.value.diaryContent.length > 3000) {
        alert("내용은 3000자 이내로 입력해주세요");
        return;
    }
    updateDiary(
        diaryId,
        diarySubmitForm.value,
        () => {
            router.push({ name: "diary-list" }); // 다이어리 모음으로 이동
            diaryStore.draft = "";
            diaryStore.selectedDraftId = "";
            diaryStore.createdDiaryId = "";
        },
        (error) => {
            console.log(error);
        }
    );
};
</script>

<template>
    <form @submit.prevent="submitDiaryForm">
        <div class="diary-write">
            <!-- 글 작성 부분 -->
            <div class="diary-write-left">
                <div class="write-box">
                    <input
                        type="text"
                        placeholder="일기 제목을 적어주세요"
                        class="write-title"
                        v-model="diarySubmitForm.diaryTitle"
                    />
                    <p>{{ date }}</p>
                </div>
                <div>
                    <textarea
                        cols="50"
                        rows="10"
                        placeholder="일기를 내용을 적어주세요"
                        class="write-content"
                        v-model="diarySubmitForm.diaryContent"
                    ></textarea>
                </div>
                <div class="save-temp">
                    <button
                        type="button"
                        @click="save(diarySubmitForm.diaryId)"
                    >
                        임시저장
                    </button>
                </div>
            </div>
            <div class="diary-write-right">
                <!-- 첨부파일 박스 -->
                <div class="upload-box">
                <form @submit.prevent="upLoadFile" enctype="multipart/form-data">
                    <label for="file">
                        <img
                            src="../../assets/img/AddNew.png"
                            alt="add-img-err"
                        />
                        <span class="attach-content">파일찾기</span>
                    </label>
                    <input type="file" id="file" name="files" @change="handleFileChange" multiple/>
                </form>
                </div>
                <div v-for="(file, index) in fileList" :key="index" class="fileList">
                        {{ file.name }}
                    <button type="button" @click="deleteButton(index)">삭제</button>
                </div>
                <!-- 버튼 -->
                <div class="submit-btn">
                    <button type="submit">등록</button>
                    <button
                        type="button"
                        @click="cancel(diarySubmitForm.diaryId)"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>

<style scoped>
/* 다이어리 컨텐츠 */
.diary-write {
    display: grid;
    grid-template-columns: 70% 30%;
}
/* 글 작성 부분 */
.diary-write-left {
    display: grid;
    padding: 1.875rem;
}
.diary-write-left div {
    padding: 0.625rem 1.875rem;
}
.write-box p {
    padding-top: 0.313rem;
    font-size: 0.8rem;
    text-align: right;
}
input[type="text"] {
    background-color: inherit;
    border: none;
    border-bottom: 0.313rem solid #89b9ad;
}
input[type="text"]::placeholder {
    color: #89b9ad;
}
input[type="text"]:focus {
    outline: none;
}
textarea {
    resize: none;
}
textarea:focus {
    outline: none;
}
textarea::placeholder {
    color: #89b9ad;
}
.write-title {
    width: 100%;
    height: 1.875rem;
    padding-left: 0.625rem;
    padding-bottom: 0.625rem;
    font-size: 1.2rem;
    font-family: "NanumNeuRisNeuRisCe";
    font-size: 2rem;
    font-weight: 700;
    color: #665031;
}
.write-content {
    width: 100%;
    height: 18.75rem;
    padding: 0.625rem;
    background-color: inherit;
    border: none;
    border-bottom: 0.313rem solid #89b9ad;
    box-sizing: border-box;
    font-size: 1.2rem;
    font-family: "NanumNeuRisNeuRisCe";
    font-size: 2rem;
    font-weight: 700;
    color: #665031;
}
.save-temp {
    justify-self: end;
}
.save-temp button {
    padding: 0.625rem 1.2rem;
    background-color: #89b9ad;
    border: none;
    box-shadow: none;
    border-radius: 0.625rem;
    color: #ffffff;
}

.save-temp button:hover {
    transform: scale(1.1);
}

/* 파일 첨부 부분 */
.diary-write-right {
    background-color: #89b9ad;
    display: grid;
    height: 100%;
    padding-bottom: 1.2rem;
    border-radius: 1.2rem;
    box-sizing: border-box;
}
.upload-box {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.625rem;
    margin-bottom: 0.625rem;
}
.upload-header img {
    justify-self: start;
}
.attach-title {
    justify-self: start;
}
.upload-box .upload-name,
.upload-box label[for="file"] {
    justify-self: start;
}
.upload-box input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
}
.upload-box label {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin-left: 2.2rem;
    cursor: pointer;
}
.upload-box label :hover {
    color: #665031;
}
.upload-box img {
    width: 20%;
    height: auto;
}
.attach-content {
    color: #ad9478;
}
.submit-btn {
    align-self: end;
}
.submit-btn button {
    display: block;
    width: 70%;
    padding: 0.625rem 0;
    margin: 0.313rem auto;
    border-radius: 0.625rem;
    background-color: #fff;
    color: #89b9ad;
}

.submit-btn button:hover {
    transform: scale(1.1);
}

.fileList button {
    margin-left: 0.313rem;
    background-color: #fff;
    border-radius: 0.625rem;
    padding: 0.313rem;
    color: #89b9ad;
}

.fileList button:hover {
    transform: scale(1.1);
}
</style>
