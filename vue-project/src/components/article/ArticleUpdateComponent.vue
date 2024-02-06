<script setup>
import { ref, onMounted } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member-store";
import { useArticleStore } from "@/stores/article-store";
import { useFileStore } from "@/stores/file-store";
import {
  getFileInfo,
  modifyFile,
} from "@/api/file";
import { modifyArticle } from "@/api/article";

// 게시글 수정
const articleStore = useArticleStore();
const articleId = ref(articleStore.articleInfo.articleId);
const articleTitle = ref(articleStore.articleInfo.articleTitle);
const articleContent = ref(articleStore.articleInfo.articleContent);

const memberStore = useMemberStore();
const memberNo = memberStore.memberInfo.memberNo;
const fileStore = useFileStore();
const fileListId = ref(articleStore.articleInfo.fileListId);
let isCanceling = false; //onBeforeRouteLeave, 게시글 등록, 게시글 등록 취소 동시 사용시에 필요합니다.

// 게시판 수정 PUT 요청
const updateArticle = async () => {
  if (articleTitle.value.length == 0 || articleContent.value.length == 0) {
    window.alert("게시글의 제목/내용 이 없습니다.");
    return;
  }
  await modifyArticle(
    {
      articleId: articleId.value,
      fileListId: fileListId.value,
      articleTitle: articleTitle.value,
      articleContent: articleContent.value,
    },
    (response) => {
      if (response.status === 200) {
        isCanceling = true;
        router.push(`detail/${articleId.value}`);
      } else {
        console.log("게시글 작성 실패");
      }
    },
    (error) => {
      console.log(error);
    }
  );
};

// 첨부한 파일의 이름으로 넣어주는 코드
const fileList = ref([]);

const printFileList = async () => {
  if (articleStore.articleInfo.fileListId) {
    const response = await getFileInfo(fileListId.value);
    fileList.value = response.data.data;
    fileList.value.forEach((file) => {
      fileStore.fileInfo = file;
    });
  }
};

const handleFileChange = (event) => {
  fileList.value = Array.from(event.target.files);
  updateFiles(fileListId.value, memberNo, formData);
};

const formData = new FormData();
const updateFiles = (fileListId, memberId, formData) => {
  for (let file of fileList.value) {
    formData.append("files", file);
  }
  isCanceling = true;
  modifyFile(fileListId, memberId, formData, (response) => {
    if (response.status === 200) {
    } else {
      console.log("파일 업로드 실패");
    }
  });
};

// 뒤로가기 이벤트 발생 시 alert 기능
onBeforeRouteLeave((to, from) => {
  if (isCanceling === false) {
    const answer = window.confirm("작성 중이던 게시글은 저장되지 않습니다.");
    if (answer === false) {
      return false;
    }
  }
});

// 취소버튼
const router = useRouter();
const goArticleList = () => {
  const answer = window.confirm(
    "글 작성을 취소하시겠습니까?\n작성중이던 게시글은 저장되지 않습니다."
  );
  if (answer) {
    isCanceling = true;
    return router.push("/list");
  }
};

onMounted(() => {
  printFileList();
});
</script>

<template>
  <div>
    <form @submit.prevent="updateArticle" class="article">
      <!-- 게시글 제목 작성 -->
      <div class="article-title">
        <input
          type="text"
          placeholder="이 곳에 제목을 입력해주세요."
          v-model.trim="articleTitle"
        />
      </div>

      <!-- 게시글 내용 작성 -->
      <textarea
        cols="30"
        rows="15"
        placeholder="이 곳에 내용을 입력해주세요."
        v-model.trim="articleContent"
      ></textarea>

      <!-- 첨부파일 -->
      <div class="upload">
        <!-- 클립사진 + '파일첨부' 글자 삽입 -->
        <div class="upload-header">
          <img src="../../assets/img/Attachfile.png" alt="attach-img-err" />
          <span class="attach-title">파일첨부</span>
        </div>

        <!-- 첨부파일 박스 -->
        <form
          class="upload-box"
          @submit.prevent="upLoadFile"
          enctype="multipart/form-data"
        >
          <label for="file">
            <img src="../../assets/img/AddNew.png" alt="add-img-err" />
            <span class="attach-content">파일첨부</span>
          </label>
          <!-- 파일첨부 버튼 -->
          <input
            type="file"
            id="file"
            name="files"
            @change="handleFileChange"
            multiple
          />
        </form>
        <div v-for="(file, index) in fileList" :key="index" class="fileList">
          <div v-if="file">
            {{ file.fileOriginalName }}
          </div>
        </div>
      </div>

      <!-- 취소&등록 bar -->
      <div class="write-control-bar">
        <!-- 게시글 등록 버튼 -->
        <div class="write-control-btn">
          <!-- <button type="submit" @click="goArticleList">취소</button> -->
          <button @click="goArticleList">취소</button>
          <button type="submit">등록</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
input {
  color: #665031;
  font-family: "Jalnan";
}

textarea {
  color: #665031;
  font-family: "Jalnan";
}
.article {
  width: 63.813rem;
  /* 초기 상자 크기 */
  transition: width 0.3s ease-in-out;
  /* 애니메이션 효과를 위한 트랜지션 설정 */
  display: grid;
  margin: 0 auto;
}

.article input {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0.625rem;
  font-size: 2.813rem;
  border: none;
  background-color: #fff8f2;
}

.article input:focus {
  outline: none;
  /* 테두리 제거 커서만 깜빡이게*/
}

.article input::placeholder {
  color: #ad9478;
}

.article-title {
  border-bottom: solid 0.063rem #ad9478;
}

.article-title::placeholder {
  color: #665031;
}

.article-title input:focus::placeholder {
  color: transparent;
}

.article textarea {
  margin: 1rem 0;
  font-size: 1.813rem;
  background-color: #fff8f2;
  border: none;
  padding: 0.625rem;
}

.article textarea:focus {
  outline: none;
}

.article textarea::placeholder {
  color: #ad9478;
}

.article textarea:focus::placeholder {
  color: transparent;
}

/* 첨부파일 커스텀 */
.upload {
  margin-bottom: 3rem;
}

.upload-header,
.upload-box {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 0.5rem;
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

.fileList {
  padding-left: 2.5rem;
}

.deletefile {
  background-color: #665031;
  color: #fff8f2;
}

/* 취소&등록 bar */
.write-control-bar {
  height: 2.5rem;
  background-color: #ad9478;
  display: grid;
}

.write-control-btn {
  justify-self: end;
  align-self: center;
}

.write-control-btn button {
  width: 5.5rem;
  height: 1.7rem;
  margin-left: 0;
  margin-right: 1rem;
  border-radius: 0.75rem;
  border: none;
  background-color: #fff8f2;
}
</style>
