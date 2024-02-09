<script setup>
import MemberMyPageComponent from "@/components/member/MemberMyPageComponent.vue";
import ChildDetailComponent from "@/components/child/ChildDetailComponent.vue";
</script>

<template>
    <div class="user-wrap">
        <div class="wrap-left">
            <h1>금쪽이 해방일지</h1>
        </div>
        <div class="wrap-right">
            <h1 class="mypage-title">MYPAGE</h1>
            <MemberMyPageComponent></MemberMyPageComponent>
            <ChildDetailComponent></ChildDetailComponent>
        </div>
    </div>
</template>

<style scoped>
.user-wrap {
    display: grid;
    grid-template-columns: 40% 60%;
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
