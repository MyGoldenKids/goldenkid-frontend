<script setup>
import { checkId } from "@/api/member";
</script>

<template>
    <div>
        <button @click="checkId('aaaa@naver.com')">아이디 중복 검사</button>
    </div>
</template>

<style scoped></style>
