<script setup>
import { getArticleList } from "@/api/article.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// 게시글 전체 리스트 조회
const articleList = ref('');
const articleInfo = async () => {
  articleList.value = await getArticleList();
  articleList.value.forEach((article) => {
    article.formattedCreatedAt = formatCreatedAt(article.createdAt);
  });
};

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
          <select name="search" class="sel">
            <option value="">제목</option>
            <option value="">내용</option>
            <option value="">작성자</option>
          </select>
        </div>
        <div class="search-box">
          <input type="text" />
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
  padding: 20px 0;
  color: #665031;
}
.board-top {
  /* background-color: pink; */
  display: grid;
  grid-template-columns: 70% 30%;
  margin: 0 0 5px 0;
}
select {
  color: #665031;
  font-family: "BMDOHYEON";
}

button {
  color: #665031;
  font-family: "BMDOHYEON";
}

.search {
  /* background-color: aquamarine; */
  height: 50px;
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
  border: 2px solid #ad9478;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 10px;
  line-height: 16px;
}
.write-box button:hover {
  background-color: #ad9478;
  color: #fff;
  transition-duration: 0.5s;
}
.search {
  /* background-color: pink; */
  height: 50px;
  display: grid;
  grid-template-columns: 15% 50%; /* 두 열로 설정 (select-box와 search-box를 가로로 나란히 배열) */
  gap: 5px; /* 열 사이 간격 설정 (필요에 따라 조정 가능) */
  align-items: center; /* 수직 가운데 정렬 */
}
.sel {
  width: 100%;
  background-color: #fff8f2;
  border: 2px solid #ad9478;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 10px;
  /* font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px; */
  line-height: 16px;
}
.sel:focus {
  border: 1px solid #ad9478;
  box-sizing: border-box;
  border-radius: 20px;
  outline: 2px solid #ad9478;
}
.search-box input[type="text"] {
  width: 100%;
  background-color: #fff8f2;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid #ad9478;
  border-radius: 20px;
}
.search-box input[type="text"]:focus {
  border: 2px solid #ad9478;
  box-sizing: border-box;
  border-radius: 20px;
  outline: 1px solid #ad9478;
}

table {
  width: 100%;
  border: 1px #a39485 solid;
  font-size: 0.9em;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  border-collapse: collapse;
  border-radius: 5px;
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
  border-bottom: 1px solid #ad9478;
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
