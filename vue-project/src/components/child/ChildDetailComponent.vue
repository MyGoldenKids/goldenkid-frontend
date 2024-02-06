<script setup>
import { getChildList, updateChildInfo, deleteChildInfo } from "@/api/child";
import { ref, onMounted } from "vue";
import { useMemberStore } from "@/stores/member-store";
const store = useMemberStore();
const memberNo = store.memberInfo.memberNo; // 로그인한 memberNO
const childList = ref([]);
const isDisabled = ref([]);

onMounted(() => {
    getChild(memberNo); // 아이 목록 가져오기
});

const getChild = (memberNo) => {
    getChildList(memberNo, (response) => {
        childList.value = response.data.data;
        isDisabled.value = childList.value.map(() => true);
    }).catch((error) => {
        console.log(error);
    });
};

const updateChild = (child, index) => {
    if (!isDisabled.value[index]) {
        if (window.confirm("정말 수정하시겠습니까?")) {
            updateChildInfo(child, (response) => {
                getChild(memberNo); // 수정 후 아이 목록 가져오기
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    isDisabled.value[index] = !isDisabled.value[index];
};

const deleteChild = (childId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
        deleteChildInfo(
            childId,
            () => getChild(memberNo), // 삭제 후 아이 목록 가져오기
            (error) => console.log(error)
        );
    }
};
</script>

<template>
    <!-- 애기 -->
    <div class="kid-grid">
        <div class="kid-list-2">
            <div
                class="kid-box"
                v-for="(child, index) in childList"
                :key="index"
            >
                <img src="@/assets/img/bear-profile.png" alt="금쪽프로필" />
                <p>{{ child.childName }}</p>
                <p v-if="child.childGender">남아</p>
                <p v-else>여아</p>
                <p>{{ child.childBirth }}</p>
                <div class="mypage-grid">
                    <div class="btn-box">
                        <button @click="regist">수정</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.kid-grid {
    width: 50%;
    margin: 0 auto;
}
.kid-list-1 {
    display: grid;
    width: 50%;
    grid-template-columns: 1fr;
}
.kid-list-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}
/* 애기 */
.kid-box {
    background-color: #e1baad;
    text-align: center;
    border-radius: 1.87rem;
    color: #fff;
    padding: 0.625rem 0;
}
.kid-box img {
    width: 50%;
}
.kid-box p {
    margin: 0.625rem 0;
    font-size: 1.1rem;
}

/* 버튼 */
.btn-box {
    width: 50%;
    margin: 0 auto;
}
.btn-box button {
    width: 100%;
    border: none;
    height: 2.5rem; 
    background-color: #fff8f2;
    border-radius: 0.625rem;
    margin-top: 0.625rem;
}
.btn-box button:hover {
    background-color: #ad9478;
    color: #fff;
    transition-duration: 0.5s;
}
</style>
