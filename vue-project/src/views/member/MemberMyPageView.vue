<script setup>
import MemberMyPageComponent from "@/components/member/MemberMyPageComponent.vue";
import ChildRegisterComponent from "@/components/child/ChildRegisterComponent.vue";
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
            <!-- <ChildRegisterComponent></ChildRegisterComponent> -->
            <ChildDetailComponent></ChildDetailComponent>
            <div class="mypage-grid">
                <div class="btn-box">
                    <button @click="signOut(memberNo)">회원탈퇴</button>
                </div>
            </div>
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
}

.mypage-grid {
    width: 50%;
    margin: 0 auto;
}
/* 버튼 */
.btn-box {
    width: 50%;
    margin: 0 auto;
}
.btn-box button {
    width: 100%;
    border: none;
    height: 40px;
    background-color: inherit;
    border: 3px solid #AD9478;
    border-radius: 10px;
}
.btn-box button:hover {
    background-color: #AD9478;
    color:#fff;
    transition-duration: 0.5s;
}
</style>
