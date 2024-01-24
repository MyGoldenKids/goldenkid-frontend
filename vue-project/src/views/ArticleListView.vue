<script setup>
import ArticleHeaderComponent from "@/components/article/ArticleHeaderComponent.vue";
import ArticleListComponent from "@/components/article/ArticleListComponent.vue";
</script>

<template>
  <div class="article-wrap">
    <ArticleHeaderComponent></ArticleHeaderComponent>
    <ArticleListComponent></ArticleListComponent>
  </div>
</template>

<style scoped>
a {
  text-decoration-line: none;
}
</style>
