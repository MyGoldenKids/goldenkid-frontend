<script setup>
import { getArticleList, searchArticle } from "@/api/article.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// 게시글 전체 리스트 조회
const articleList = ref("");
const articleInfo = async () => {
  getArticleList(
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
const serachContent = ref("");

const search = () => {
  searchArticle(
    category.value,
    serachContent.value,
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

onMounted(articleInfo);
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
          <input type="text" @keyup.enter="search" v-model="serachContent"/>
          <button type="button" @click="search">
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
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>등록일</th>
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
          <td>{{ article.articleId }}</td>
          <td>{{ article.articleTitle }}</td>
          <td>{{ article.nickname }}</td>
          <td>{{ article.formattedCreatedAt }}</td>
        </tr>
      </tbody>
      <!-- 게시글 리스트 조회 끝 -->
    </table>
  </div>
</template>

<style scoped>
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
  padding: 0.625rem;
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
.search-box button {
  position: absolute;
}

table {
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
  padding: 1.5em 0.5em;
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
</style>
