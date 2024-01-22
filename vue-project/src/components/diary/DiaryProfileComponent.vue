<script setup></script>

<template>
    <div class="diary-profile">
        <div class="profile-mom">
            <!-- 이미지가 없을 때 -->
            <div class="image-temp">
                <button class="plus-btn">+</button>
                <p>이미지 등록하기</p>
            </div>
        </div>
        <div class="profile-text">8조와 20일 째🤎</div>
        <div class="profile-kid">
            <!-- 이미지가 없을 때 -->
            <div class="image-temp">
                <button class="plus-btn">+</button>
                <p>이미지 등록하기</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.diary-profile {
    padding-top: 1.0rem;
}
.image-temp p{
    font-size: 0.7rem;
    margin-top: 0.313rem;
    color: #AD9478;
}
.plus-btn {
    border: 2px solid #AD9478;
    width: 1.875rem;
    height: 1.875rem;
    line-height: 1.6rem; /* 수정필요 */
    border-radius: 1.875rem;
    background-color: inherit;
    color: #AD9478;
    
}
.profile-mom {
    border: 2px solid #AD9478;
    width: 9.375rem;
    height: 12.5rem;
    border-radius: 1.25rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.profile-text {
    /* background-color: aquamarine; */
    padding: 0.625rem 0;
    margin: 0.9rem auto;
}
.profile-kid {
    border: 2px solid #AD9478;
    width: 9.375rem;
    height: 12.5rem;
    border-radius: 1.25rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
