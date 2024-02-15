<script setup>
import { getArticleList, searchArticle, getArticleListSize } from "@/api/article.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// 게시글 전체 리스트 조회
const currentPage = ref(1);
const articleList = ref("");
const articleListSize = ref(0);
const articleInfo = async (size, page) => {
  getArticleList(
    size,
    page,
    (response) => {
      articleList.value = response.data.data;
      articleList.value.forEach((article) => {
        article.formattedCreatedAt = formatCreatedAt(article.createdAt);
      });
    },
    (error) => {
      console.error(error);
    }
  );
};

const category = ref("title");
const searchContent = ref("");

const search = () => {
  searchArticle(
    category.value,
    searchContent.value,
    (response) => {
      articleList.value = response.data.data;
      articleList.value.forEach((article) => {
        article.formattedCreatedAt = formatCreatedAt(article.createdAt);
      });
      articleListSize.value = articleList.value.length;
    },
    (error) => {
      console.error(error);
    }
  );
}

// 작성일 연-월-일 포매팅 할 함수
const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const router = useRouter();

const goDetail = (articleId) => {
  router.push(`/article/detail/${articleId}`);
};

const articlePageHandler = () => {
  articleInfo(10, currentPage.value);
  getArticleListSize((response)=> {
    articleListSize.value = response.data.data;
  }, (error) => {
    console.error(error);
  })
};

onMounted(async () => {
  articleInfo(10, currentPage.value);
  getArticleListSize((response)=> {
    articleListSize.value = response.data.data;
  }, (error) => {
    console.error(error);
  })
});
</script>

<template>
  <div class="board-wrap">
    <div class="board-top">
      <div class="search">
        <div class="select-box">
          <select v-model="category" name="search" class="sel">
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="nickname">작성자</option>
          </select>
        </div>
        <div class="search-box">
          <input type="text" @keyup.enter="search" v-model="searchContent" class="input-with-button"/>
          <button type="button" @click="search" class="search-button">
            <img src="@/assets/img/SearchButton01.png">
          </button>
        </div>
      </div>
      <div class="write">
        <div class="write-box">
          <router-link to="/article/write"><button>글쓰기</button></router-link>
        </div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th class="id">번호</th>
          <th class="title">제목</th>
          <th class="nickname">작성자</th>
          <th class="createdAt">등록일</th>
          <th class="hit">조회</th>
          <th class="recommendCount">추천</th>
        </tr>
      </thead>
      <!-- 게시글 리스트 조회 시작 -->
      <tbody>
        <tr
          v-for="article in articleList"
          :key="article.id"
          @click="goDetail(article.articleId)"
          class="cursor-pointer"
        >
          <td class="id">{{ article.articleId }}</td>
          <td class="title">{{ article.articleTitle }}</td>
          <td class="nickname">{{ article.nickname }}</td>
          <td class="createAt">{{ article.formattedCreatedAt }}</td>
          <td class="hit">{{ article.hit }}</td>
          <td class="recommendCount">{{ article.recommendCount }}</td>
        </tr>
      </tbody>
      <!-- 게시글 리스트 조회 끝 -->
    </table>
    <vue-awesome-paginate
      :total-items="articleListSize"
      v-model="currentPage"
      :items-per-page="10"
      :max-pages-shown="10"
      @click="articlePageHandler"
    />
  </div>
</template>

<style scoped>
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
  font-weight: 100px;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
a {
  text-decoration-line: none;
}
.board-wrap {
  /* background-color: beige; */
  padding: 1.25rem 0;
  color: #665031;
}
.board-top {
  /* background-color: pink; */
  display: grid;
  grid-template-columns: 70% 30%;
  margin: 0 0 0.313rem 0;
}
select {
  color: #665031;
  font-family: "Jalnan";
}

button {
  color: #665031;
  font-family: "Jalnan";
}

.search {
  /* background-color: aquamarine; */
  height: 3.125rem;
}
.write {
  display: grid;
  align-items: center; /* 수직 가운데 정렬 */
}

.write-box button {
  display: block;
  float: right;
  width: 30%;
  background-color: #fff8f2;
  border: 0.125rem solid #ad9478;
  box-sizing: border-box;
  border-radius: 1.25rem;
  padding: 0.625rem;
  line-height: 1rem;
}
.write-box button:hover {
  background-color: #ad9478;
  color: #fff;
  transition-duration: 0.5s;
}
.search {
  /* background-color: pink; */
  height: 3.125rem;
  display: grid;
  grid-template-columns: 15% 50%; /* 두 열로 설정 (select-box와 search-box를 가로로 나란히 배열) */
  gap: 0.313rem; /* 열 사이 간격 설정 (필요에 따라 조정 가능) */
  align-items: center; /* 수직 가운데 정렬 */
}
.sel {
  width: 100%;
  background-color: #fff8f2;
  border: 0.125rem solid #ad9478;
  box-sizing: border-box;
  border-radius: 1.25rem;
  padding: 0.625rem 0.625rem 0.625rem 1.25rem;
  line-height: 1rem;
}
.sel:focus {
  border: 0.063rem solid #ad9478;
  box-sizing: border-box;
  border-radius: 1.25rem;
  outline: 0.125rem solid #ad9478;
}
.search-box input[type="text"] {
  width: 100%;
  background-color: #fff8f2;
  padding: 0.625rem;
  box-sizing: border-box;
  border: 0.125rem solid #ad9478;
  border-radius: 1.25rem;
}
.search-box input[type="text"]:focus {
  border: 0.125rem solid #ad9478;
  box-sizing: border-box;
  border-radius: 1.25rem;
  outline: 0.063rem solid #ad9478;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-button {
  width: 100%;
  padding-right: 3.125rem;
}
.search-button {
  position: absolute;
  right: 0.625rem;
  top: 0.1rem;
  height: 100%;
  border: none; /* 기본 테두리 제거 */
  background-color: transparent; /* 배경색 투명 */
  cursor: pointer; /* 마우스 오버 시 커서 변경 */
}

.search-button img {
  height: 60%; /* 버튼 내 이미지 크기 조정 */
}

table {
  table-layout: fixed;
  width: 100%;
  border: 0.063rem #a39485 solid;
  font-size: 0.9em;
  box-shadow: 0 0.063rem 0.25rem rgba(0, 0, 0, 0.2);
  border-collapse: collapse;
  border-radius: 0.313rem;
  overflow: hidden;
  color: #665031;
  text-align: center;
}
thead {
  color: #fff;
  background: #ad9478;
}
td,
th {
  padding: 1.25em 0.5em;
  vertical-align: middle;
}
td {
  border-bottom: 0.063rem solid #ad9478;
}
a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  font-weight: 700;
}

.cursor-pointer {
  cursor: pointer;
}

.article-title, .article-nickname {
  text-align: left;
}

th.id {
  width: 10%;
}
th.title {
  width: 55%;
}

td.title {
  text-align: left;
  padding-left: 3rem;
}

th.nickname {
  width: 10%;
  text-align: left;
}

td.nickname {
  text-align: left;
}

th.createdAt {
  width: 15%;
}

th.hit {
  width: 10%;
}

th.recommendCount {
  width: 10%;
}
</style>
