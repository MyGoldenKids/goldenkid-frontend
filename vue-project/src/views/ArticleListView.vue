<script setup>
import ArticleHeaderComponent from "@/components/article/ArticleHeaderComponent.vue";
import ArticleListComponent from "@/components/article/ArticleListComponent.vue";
</script>

<template>
  <div class="article-wrap">
    <ArticleHeaderComponent></ArticleHeaderComponent>
    <!-- 게시글 클릭 후 디테일 페이지 이동 -->
    <router-link to="/article/detail">
      <ArticleListComponent></ArticleListComponent>
    </router-link>
  </div>
</template>

<style scoped>
a {
  text-decoration-line: none;
}
</style>
