<script setup>
import MemberLeftComponent from "@/components/member/MemberLeftComponent.vue";
import MemberMyPageComponent from "@/components/member/MemberMyPageComponent.vue";
import ChildDetailComponent from "@/components/child/ChildDetailComponent.vue";
</script>

<template>
    <div class="user-wrap">
        <MemberLeftComponent></MemberLeftComponent>
        <div class="wrap-right">
            <h1 class="mypage-title">MYPAGE</h1>
            <MemberMyPageComponent></MemberMyPageComponent>
            <ChildDetailComponent></ChildDetailComponent>
        </div>
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

.user-title {
    text-align: center;
    font-size: 3rem;
    color: #89b9ad;
}

.wrap-left {
    display: grid;
}

.wrap-right {
    display: grid;
    align-items: center;
    padding-top: 50px;
}

.mypage-title {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2.25rem;
}

.mypage-grid {
    width: 50%;
    margin: 0 auto;
}</style>
