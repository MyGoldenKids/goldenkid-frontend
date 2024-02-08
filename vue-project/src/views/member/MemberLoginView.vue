<script setup>
import MemberLoginComponent from "@/components/member/MemberLoginComponent.vue";
import MemberLeftComponent from "@/components/member/MemberLeftComponent.vue";
</script>

<template>
    <div class="user-wrap">
        <MemberLeftComponent></MemberLeftComponent>
        <MemberLoginComponent></MemberLoginComponent>
    </div>
</template>

<style scoped>
.user-wrap {
    width: 100%;
    /* background-color: blanchedalmond; */
    display: grid;
    grid-template-columns: minmax(200px, 40%) 60%;
    height: 100vh;
}
</style>
