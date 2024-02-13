<script setup>
import MemberLeftComponent from "@/components/member/MemberLeftComponent.vue";
import MemberSignupComponent from "@/components/member/MemberSignupComponent.vue";
</script>

<template>
    <div class="user-wrap">
        <MemberLeftComponent></MemberLeftComponent>
        <MemberSignupComponent></MemberSignupComponent>
    </div>
</template>

<style scoped>
.user-wrap {
    display: grid;
    grid-template-columns: 40% 60%;
    height: 100vh;
}
</style>
