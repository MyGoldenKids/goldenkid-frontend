<script setup>
import { ref, onMounted } from "vue";
import { getArticle, deleteArticles, getFileInfo } from "@/api/article";
import { useRoute } from "vue-router";
import router from "@/router";
import { useArticleStore } from "@/stores/article-store";
import { useMemberStore } from "@/stores/member-store";

const store = useMemberStore();
const articleStore = useArticleStore();
const article = ref("");
const route = useRoute();
const articleId = route.params.id;
const formattedDate = ref("");
const fileData = ref([]);
const articleInfo = async () => {
  const data = await getArticle(articleId);
  article.value = data.data;
  formattedDate.value = formatCreatedAt(article.value.createdAt);
  fileData.value = await getFileInfo(article.value.fileListId);
  articleStore.articleInfo = article.value;
};

// 작성일 연-월-일 포매팅 할 함수
const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const deleteArticle = async (articleId) => {
  const answer = window.confirm("게시글을 삭제 하시겠습니까?");
  if (answer) {
    await deleteArticles(articleId);
    router.push("../list");
  }
};

onMounted(() => {
  articleInfo();
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
          <div class="left-item2">{{ formattedDate }}</div>
          <div class="left-item2">조회수 : {{ article.hit }}</div>
          <div class="left-item2">추천수 : {{ article.recommendCount }}</div>
        </div>
        <div class="title-sub-right">
          <div class="right-item">
            <button class="like-btn">추천하기 ❤</button>
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
        <div v-if="fileData && fileData.data && fileData.data.length > 0">
          <div class="upload-header">
            <img src="../../assets/img/Attachfile.png" alt="attach-img-err" />
            <span class="attach-title">첨부된 파일</span>
          </div>
          <div
            v-for="(file, index) in fileData.data"
            :key="index"
            class="fileList"
          >
            {{ file.fileOriginalName }}
          </div>
        </div>
      </div>
    </div>
    <!-- 게시글 댓글 -->
    <div class="board-comment">
      <div class="comments-header">
        <div class="comment-count">댓글 <span>2</span></div>
        <div class="article-delete-put">
          <!-- 본인이 작성한 글만 수정 삭제 버튼 보이기 -->
          <div v-if="store.memberInfo.memberNo === article.memberId">
            <router-link to="/article/modify"
              ><button>글수정</button></router-link
            >
            <button @click="deleteArticle(articleId)">글삭제</button>
          </div>
        </div>
      </div>

      <!-- for문 돌릴듯1 -->
      <div class="board-comment-sub">
        <div class="comment-sub-left">
          <div class="comment-writer">
            <img src="@/assets/img/basic_profile.png" alt="프로필기본이미지" />
            <span>영소정</span>
          </div>
          <div class="comment-content">소중한 정보 감상이잉ㅇ</div>
        </div>
        <div class="comment-sub-right">
          <div class="comment-date">2024.01.20</div>
          <!-- 여기는 로그인한 회원정복 일치할 때만 보일거야  -->
          <div class="comment-btn">
            <button class="comment-modify">수정</button> |
            <button class="comment-delete">삭제</button>
          </div>
        </div>
      </div>

      <!-- for문 돌릴듯2 -->
      <div class="board-comment-sub">
        <div class="comment-sub-left">
          <div class="comment-writer">
            <img src="@/assets/img/basic_profile.png" alt="프로필기본이미지" />
            <span>영소정</span>
          </div>
          <div class="comment-content">
            소중한 정보 감상이잉ㅇdddddddddddddddddddd
          </div>
        </div>
        <div class="comment-sub-right">
          <div class="comment-date">2024.01.20</div>
          <!-- 여기는 로그인한 회원정복 일치할 때만 보일거야  -->
          <div class="comment-btn">
            <button class="comment-modify">수정</button> |
            <button class="comment-delete">삭제</button>
          </div>
        </div>
      </div>
      <!-- for문 끝 -->

      <!-- 댓글 작성 폼 -->
      <div class="commet-add">
        <input type="text" class="add-input" placeholder="댓글작성" value="" />
        <button class="add-btn">등록</button>
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
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  padding: 0.625rem 1.25rem;
}
.title-sub-left {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  padding: 0.625rem 0;
}
.left-item1 {
  font-weight: 400;
  font-size: 1.1rem;
  display: grid;
  grid-template-columns: 30% 60%;
  gap: 0.313rem;
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
.like-btn {
  width: 100%;
  padding: 0.625rem;
  border: 0.063rem solid #665031;
  background-color: #fff8f2;
  font-size: 0.7rem;
}

/* 게시글 내용 부분 */
.board-content {
  padding: 1.25rem;
}
.board-content p {
  line-height: 1.5rem;
}

/* 게시글 댓글 부분 */
.board-comment {
  padding: 1.25rem;
}

.upload-header {
    margin-top: 3rem;
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
  display: grid;
  grid-template-columns: 80% 20%;
  align-items: center;
  padding: 1.25rem;
  border-bottom: 0.063rem solid #ad9478;
}

.comment-writer {
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
.commet-add {
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
</style>
