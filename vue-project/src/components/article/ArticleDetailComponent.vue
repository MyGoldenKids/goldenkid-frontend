<script setup>
import _ from 'lodash'
import { ref, onMounted } from "vue";
import { getArticle, deleteArticle, recommendArticle, checkRecommendArticle } from "@/api/article";
import { getFileInfo, downloadFile } from "@/api/file";
import { getCommentByArticleId, writeComment, updateComment, deleteComment } from "@/api/comment";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useArticleStore } from "@/stores/article-store";
import { useMemberStore } from "@/stores/member-store";

const memberStore = useMemberStore();
const articleStore = useArticleStore();
const article = ref("");
const route = useRoute();
const router = useRouter();
const articleId = route.params.id;
const fileData = ref([]);
const comment = ref({
  content: "",
  memberId: memberStore.memberInfo.memberNo,
});
const commentList = ref([]);
const recommendCount = ref("");
const isRecommendedLocal = ref(false);
const isRecommendedServer = ref(false);
// 게시글 상세 조회
const articleInfo = async () => {
  getArticle(
    articleId,
    async (response) => {
      article.value = response.data.data;
      recommendCount.value = article.value.recommendCount
      article.value.formattedCreatedAt = formatCreatedAt(
        article.value.createdAt
      );
      fileData.value = await getFileInfo(article.value.fileListId);
      articleStore.articleInfo = article.value;
    },
    (error) => {
      router.push("/error");
      console.log(error);
    }
  );
};

const checkRecommend = () => {
  checkRecommendArticle(
    articleId,
    memberStore.memberInfo.memberNo,
    (response) => {
      const status = response.data.data;
      if (status === 1) {
        isRecommendedServer.value = true;
      } else {
        isRecommendedServer.value = false;
      }
      isRecommendedLocal.value = isRecommendedServer.value
    }
  )
}

const debounceRecommend = _.debounce(async() => {
  if (isRecommendedLocal.value !== isRecommendedServer.value) {
    recommendArticle(
    {
      articleId: Number(articleId),
      memberId: memberStore.memberInfo.memberNo,
    },
    (response) => {
      const retValue = response.data.data;
    },
    (error) => {
      console.error(error);
    }
  )
  isRecommendedServer.value = !isRecommendedServer.value;
  }
}, 500);


const recommend = () => {
  if (isRecommendedLocal.value) {
    article.value.recommendCount -= 1;
  } else {
    article.value.recommendCount += 1;
  }
  isRecommendedLocal.value = !isRecommendedLocal.value
  
  debounceRecommend();
  
}

// 작성일 연-월-일 포매팅 할 함수
const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 게시글 삭제
const deleteArticleById = async (articleId) => {
  const answer = window.confirm("게시글을 삭제 하시겠습니까?");
  if (answer) {
    await deleteArticle(articleId);
    router.push("../list");
  }
};

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

const getCommentList = async () => {
  getCommentByArticleId(
    articleId,
    (response) => {
      commentList.value = response.data.data.map(comment => ({
        ...comment,
        isEditing: false, // 수정 상태 추가
        editingContent: comment.content, // 수정 중인 내용 저장
      }));
      commentList.value.forEach((comment) => {
        comment.createdAt = formatCreatedAt(comment.createdAt);
      });
    },      
    (error) => {
      console.log(error);
    }
  );
};

const registerComment = async () => {
  // 댓글 내용이 없을 경우 경고창 띄우기
  if (!comment.value.content) {
    alert("댓글을 입력해주세요.");
    return;
  }
  if(comment.value.content.length > 45) {
    alert("댓글은 45자 이내로 작성해주세요.");
    return;
  }
  writeComment(
    articleId,
    comment.value,
    (response) => {
      getCommentList();
      comment.value.content = ""; // 댓글 작성 후 입력창 초기화
    },
    (error) => {
      console.log(error);
    }
  );
};

const deleteCommentById = async (commentId) => {
  deleteComment(
    commentId,
    memberStore.memberInfo.memberNo,
    () => {
      getCommentList();
    },
    (error) => {
      console.log(error);
    }
  );
};

const editComment = (commentId) => {
  commentList.value.forEach((c) => {
    if (c.commentId === commentId) {
      c.isEditing = true; // 현재 클릭된 댓글을 수정 모드로 설정
      c.editingContent = c.content; // 현재 내용을 수정 중인 내용으로 초기화
    } else {
      c.isEditing = false; // 나머지는 수정 모드 해제
    }
  });
};

const saveEditedComment = async (commentId) => {
  const commentToSave = commentList.value.find((c) => c.commentId === commentId);
  if (commentToSave) {
    if(!commentToSave.editingContent) {
      alert("수정할 내용을 입력해주세요.");
      return;
    }
    if(commentToSave.editingContent.length > 45) {
      alert("댓글은 45자 이내로 작성해주세요.");
      return;
    }
    await updateComment(commentId, { memberId: memberStore.memberInfo.memberNo, content: commentToSave.editingContent });
    commentToSave.isEditing = false; // 수정 모드 해제
    getCommentList(); // 댓글 목록 새로고침
  }
};

onMounted(() => {
  articleInfo();
  getCommentList();
  // 로그인 상태라면 추천을 했는지 확인
  if (memberStore.isLoggedIn) {
    checkRecommend();
  }
});
</script>

<template>
  <!-- 꿀팁 게시판 상세-->
  <div class="board-detail">
    <!-- 게시글 타이틀 -->
    <div class="board-title">
      <h1>{{ article.articleTitle }}</h1>
      <div class="title-sub">
        <div class="title-sub-left">
          <div class="left-item1">
            <img src="@/assets/img/basic_profile.png" alt="프로필기본이미지" />
            <!-- 추후 Id가 아닌 닉네임으로 바꿔야할 부분 -->
            <span>{{ article.nickname }}</span>
            <!-- ------------------------------------- -->
          </div>
          <div class="left-item2">{{ article.formattedCreatedAt }}</div>
          <div class="left-item2">조회수 : {{ article.hit }}</div>
          <div class="left-item2">추천수 : {{ article.recommendCount }}</div>
        </div>
        <div class="title-sub-right">
          <div class="right-item">
            <button class="default-like-btn" :class="{ 'like-btn' : !isRecommendedLocal }" type="button" @click="recommend" :disabled="!memberStore.isLoggedIn">추천하기 ❤️</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 게시글 내용 -->
    <div class="board-content">
      <p>{{ article.articleContent }}</p>
      <!-- 첨부파일 -->
      <div class="upload">
        <!-- 클립사진 + '파일첨부' 글자 삽입 -->
        <!-- 첨부된 파일 리스트 -->
        <div
          v-if="
            fileData.data && fileData.data.data && fileData.data.data.length > 0
          "
        >
          <div class="upload-header">
            <img src="../../assets/img/Attachfile.png" alt="attach-img-err" />
            <span class="attach-title">첨부된 파일</span>
          </div>
          <div
            v-for="(file, index) in fileData.data.data"
            :key="index"
            class="fileList"
          >
            <button @click="download(file.fileId, file.fileOriginalName)">
              {{ file.fileOriginalName }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 게시글 댓글 -->
    <div class="board-comment">
      <div class="comments-header">
        <div class="comment-count">댓글 <span>{{ commentList.length }}</span></div>
        <div class="article-delete-put">
          <!-- 본인이 작성한 글만 수정 삭제 버튼 보이기 -->
          <div v-if="memberStore.memberInfo.memberNo === article.memberId">
            <router-link to="/article/modify"><button>글수정</button></router-link>
            <button @click="deleteArticleById(articleId)">글삭제</button>
          </div>
        </div>
      </div>

      <div v-for="(item, index) in commentList" :key="index">
        <div class="board-comment-sub">
          <div class="comment-sub-left">
            <div class="comment-writer">
              <img src="@/assets/img/basic_profile.png" alt="프로필기본이미지" />
              <span>{{item.nickname}}</span>
            </div>
          <!-- <div class="comment-content">{{ item.content }}</div> -->
          <div v-if="item.isEditing" class="comment-edit">
            <input type="text" v-model="item.editingContent" />
          </div>
          <div v-else>
            <span>{{ item.content }}</span>
          </div>
        </div>
        <div class="comment-sub-right">
          <div class="comment-date">{{ item.createdAt }}</div>
          <!-- 여기는 로그인한 회원정보 일치할 때만 보일거야  -->
          <div v-if="memberStore.memberInfo.memberNo === item.memberId" class="comment-btn">
          <div v-if="!item.isEditing">
            <button class="comment-modify" @click="editComment(item.commentId)">수정</button> |
            <button class="comment-delete" @click="deleteCommentById(item.commentId)">삭제</button>
            </div>
            <div v-else>
              <button @click="saveEditedComment(item.commentId)">저장</button> |
              <button class="comment-cancel" @click="item.isEditing = false">취소</button>
            </div>
          </div>
        </div>
      </div>
      </div>

      <!-- 댓글 작성 폼 -->
      <div class="comment-add">
        <input type="text" class="add-input" placeholder="댓글작성" v-model="comment.content" />
        <button class="add-btn" @click="registerComment">등록</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board-detail {
  /* background-color: beige; */
  max-width: 62.5rem;
  margin: 0 auto;
  padding: 1.25rem 0;
  color: #665031;
}

/* 게시글 타이틀 부분 */
.board-title {
  border-bottom: 0.063rem solid #ad9478;
}
.board-title h1 {
  font-size: 1.625rem;
  padding: 0 1.25rem;
  font-weight: 300;
}
.title-sub {
  display: grid;
  grid-template-columns: 55% 45%;
  align-items: center;
  padding: 0.625rem 1.25rem;
}
.title-sub-left {
  display: grid;
  grid-template-columns: 30% 20% 20% 20%;
  align-items: center;
  padding: 0.625rem 0;
}
.left-item1 {
  font-weight: 400;
  font-size: 1.1rem;
  display: grid;
  grid-template-columns: 20% 60%;
  align-items: center;
}
.left-item2 {
  font-size: 0.8rem;
  text-align: center;
  border-right: 0.125rem solid #ad9478;
}
.left-item2:last-child {
  border: none;
}
.title-sub-right {
  display: grid;
  align-items: center;
  padding: 0.625rem 0;
  font-size: 0.7rem;
}
.right-item {
  width: 20%;
  float: right;
  justify-self: end;
}
.default-like-btn {
  width: 100%;
  padding: 0.625rem;
  border: 0.063rem solid #665031;
  background-color: #ad9478;
  color: #fff8f2;
  font-size: 0.7rem;
}

.like-btn {
  width: 100%;
  padding: 0.625rem;
  border: 0.063rem solid #665031;
  background-color: #fff8f2;
  color: #665031;
  font-size: 0.7rem;
}

.like-btn:hover {
  background-color: #ad9478;
  color: #fff8f2;
  cursor: pointer;
}

/* 게시글 내용 부분 */
.board-content {
  padding: 1.25rem;
}
.board-content p {
  line-height: 1.5rem;
}

.fileList button {
  background-color: #fff8f2;
}

/* 게시글 댓글 부분 */
.board-comment {
  padding: 1.25rem;
}

.upload-header {
  width: 30%;
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 10% 90%;
  align-items: center;
}
/* 댓글 카운트 부분 */
.comment-count {
  padding: 1.25rem;
  font-size: 1.25rem;
}
.comment-count span {
  font-weight: 800;
  color: #89b9ad;
}

/* 댓글 리스트 */
.board-comment-sub {
  /* background-color: pink; */
  display: grid;
  grid-template-columns: 80% 20%;
  align-items: center;
  padding: 1.25rem;
  border-bottom: 0.063rem solid #ad9478;
}

.comment-writer {
  /* background-color: pink; */
  font-weight: 300;
  padding: 1.25rem 0;
  font-size: 1.2rem;
  display: grid;
  grid-template-columns: 5% 20%;
  align-items: center;
}
.comment-content {
  width: 100%;
  padding-left: 2.3rem;
}
.comment-sub-right {
  /* background-color: pink; */
  justify-self: end;
}
.comment-date {
  padding: 0.625rem 0.313rem;
  text-align: right;
  font-size: 0.8rem;
}
.comment-btn button {
  border: none;
  background-color: #fff8f2;
}
.comment-add {
  padding: 1.25rem;
  display: grid;
  grid-template-columns: 85% 15%;
  gap: 1rem;
}
.add-input {
  border-radius: 3.125rem;
  height: 3.125rem;
  border: 0.125rem solid #89b9ad;
  padding-left: 1.25rem;
  background-color: #fff8f2;
  box-sizing: border-box;
}
.add-input:focus {
  border: 0.125rem solid #89b9ad;
  box-sizing: border-box;
  border-radius: 3.125rem;
  outline: 0.063rem solid #89b9ad;
}
.add-btn {
  border-radius: 3.125rem;
  height: 3.125rem;
  background-color: #89b9ad;
  color: #fff;
  border: none;
  font-size: 1.1rem;
}

.article-delete-put button {
  border: 0.125rem solid #665031;
  border-radius: 1.25rem;
  background-color: #fff8f2;
  padding: 0.625rem;
  margin: 0.125rem;
  max-width: 4.75rem;
  max-height: 2.6rem;
  cursor: pointer;
}

.comments-header {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.063rem solid #ad9478;
}
.comment-edit input {
  border-radius: 3.125rem;
  height: 3.125rem;
  border: 0.125rem solid #89b9ad;
  padding-left: 1.25rem;
  background-color: #fff8f2;
  box-sizing: border-box;
}
.comment-edit input:focus {
  border: 0.125rem solid #89b9ad;
  box-sizing: border-box;
  border-radius: 3.125rem;
  outline: 0.063rem solid #89b9ad;
}
</style>
