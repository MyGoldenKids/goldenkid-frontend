<script setup>
import { ref, onMounted } from "vue";
import { useMemberStore } from "@/stores/member-store";
import { useDiaryStore } from "@/stores/diary-store";
import { useFileStore } from "@/stores/file-store";
import { updateDiary } from "@/api/diary";
import { getFileInfo, modifyFile, deleteFile, createFileList } from "@/api/file";

import router from "@/router";
const memberStore = useMemberStore();
const diaryStore = useDiaryStore();
const fileStore = useFileStore();
const formData = new FormData();
const fileList = ref([]);
const fileListId = ref(diaryStore.diaryInfo.fileListId);
const deleteFileList = [];

onMounted(() => {
    printFileList();
});

const printFileList = async () => {
    if (diaryStore.diaryInfo.fileListId) {
        const response = await getFileInfo(fileListId.value);
        
        fileList.value = response.data.data;
        fileList.value.forEach((file) => {
            fileStore.fileInfo = file;
        });
    }
};

const updateForm = ref({
    memberId: memberStore.memberInfo.memberNo,
    diaryId: diaryStore.diaryInfo.diaryId,
    diaryTitle: diaryStore.diaryInfo.diaryTitle,
    diaryContent: diaryStore.diaryInfo.diaryContent,
    diaryReview: diaryStore.diaryInfo.diaryReview,
    fileListId: diaryStore.diaryInfo.fileListId,
});

const createFiles = async(memberNo, formData) => {
    for (let file of fileList.value) {
        formData.append("files", file);
    }
    const fileListId = await createFileList(memberNo, formData);

    return fileListId;
};

const updateFiles = async (fileListId, memberId, formData) => {
    // 삭제할 부분 삭제
    for (let fileId of deleteFileList) {
        await deleteFile(fileId);
    }

    for (let file of fileList.value) {
        // 새로 추가한 파일은 추가한다.
        if(file.memberId !== memberId) {
            formData.append("files", file);
        }   
    }

    if(!isFormDataEmpty(formData)) {
        await modifyFile(fileListId, memberId, formData);
    }
};

// 폼에 아무것도 없는지 확인
const isFormDataEmpty = (formData) => {
    return Array.from(formData.entries()).length === 0;
}

const update = async () => {
    console.log(fileListId.value)
    if(!fileListId.value && isFormDataEmpty(formData)){
        fileListId.value = await createFiles(memberStore.memberInfo.memberNo, formData);
    } else {
        await updateFiles(fileListId.value, memberStore.memberInfo.memberNo, formData);
    }

    await updateDiary(
        diaryStore.diaryInfo.diaryId,
        {
            memberId: memberStore.memberInfo.memberNo,
            diaryTitle: updateForm.value.diaryTitle,
            diaryContent: updateForm.value.diaryContent,
            diaryReview: updateForm.value.diaryReview,
            fileListId: fileListId.value,
        },
        () => {
            diaryStore.diaryInfo = ""; // 수정할 다이어리 정보 초기화
            router.push({ name: "diary-list" }); // 다이어리 모음으로 이동
        },
        (error) => {
            console.log(error);
        }
    );
};

const handleFileChange = (event) => {
    for (const file of Array.from(event.target.files)) {
        fileList.value.push(file);
    }
};

// 삭제 버튼 누르면
const deleteButton = (idx) => {
  // 기존에 저장한 파일이라면?
    if (fileList.value[idx].fileId) {
        deleteFileList.push(fileList.value[idx].fileId);
    }

    // 자바스크립트 전용 0번 인덱스 삭제 로직
    if (idx >= 0 && idx < fileList.value.length) {
        fileList.value.splice(idx, 1);
    } else {
        fileList.value.splice(idx, idx);
    }
}

const cancelUpdate = () => {
    diaryStore.diaryInfo = ""; // 수정할 다이어리 정보 초기화
    router.push({ name: "diary-list" }); // 다이어리 모음으로 이동
};
</script>

<template>
    <form @submit.prevent="update">
        <div class="diary-update">
            <!-- 글 작성 부분 -->
            <div class="diary-update-left">
                <div class="update-box">
                    <input
                        type="text"
                        placeholder="일기 제목을 적어주세요"
                        class="update-title"
                        v-model="updateForm.diaryTitle"
                    />
                    <p>{{ diaryStore.diaryInfo.cratedAt }}</p>
                </div>
                <div>
                    <textarea
                        cols="50"
                        rows="10"
                        placeholder="일기를 내용을 적어주세요"
                        class="update-content"
                        required
                        v-model="updateForm.diaryContent"
                    ></textarea>
                </div>
            </div>
            <div class="diary-update-right">
                <!-- 첨부파일 박스 -->
                <div class="upload-box">
                <form @submit.prevent="updateFiles" enctype="multipart/form-data">
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
                    <div v-if="file.fileOriginalName">
                        {{ file.fileOriginalName }}
                        <button type="button" @click="deleteButton(index)">삭제</button>
                    </div>
                    <div v-else>
                        {{ file.name }}
                    <button type="button" @click="deleteButton(index)">삭제</button>
                    </div>
                </div>
                <!-- 버튼 -->
                <div class="submit-btn">
                    <button type="submit">수정</button>
                    <button type="button" @click="cancelUpdate">취소</button>
                </div>
            </div>
        </div>
    </form>
</template>

<style scoped>
.diary-update {
    display: grid;
    grid-template-columns: 70% 30%;
}

.diary-update-left {
    display: grid;
    padding: 1.875rem;
}
.diary-update-left div {
    padding: 0.625rem 1.875rem;
}
.update-box p {
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
.update-title {
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
.update-content {
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

/* 파일 첨부 부분 */
.diary-update-right {
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
