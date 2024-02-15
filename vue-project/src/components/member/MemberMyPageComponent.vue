<script setup>
import { onMounted, ref } from "vue";
import {
    getMemberDetail,
    modifyMemberDetail,
    deleteMember,
} from "@/api/member";
import { useMemberStore } from "@/stores/member-store";
import router from "@/router";
const store = useMemberStore();
const memberNo = store.memberInfo.memberNo;
const isEditing = ref(false);
const editingNick = ref("");
const editingPhone = ref("");

const memberDetail = ref({
    memberNo: memberNo,
    password: "",
    newPassword: "",
    nickname: "",
    phoneNumber: "",
});
onMounted(() => {
    getMemberDetail(
        memberNo,
        (response) => {
            memberDetail.value.nickname = response.data.data.nickname;
            memberDetail.value.phoneNumber = response.data.data.phoneNumber;
            editingNick.value = response.data.data.nickname; // 수정 전 데이터
            editingPhone.value = response.data.data.phoneNumber; // 수정 전 데이터
        },
        () => {
            console.log("회원정보를 가져올 수 없습니다.");
        }
    );
});

// 수정버튼 눌렀을 때
const editInfo = () => {
    isEditing.value = true;
};
// 수정하다가 취소버튼 눌렀을 때
const cancelEdit = () => {
    isEditing.value = false;
};

// 저장버튼 눌렀을 때
const registEdit = () => {
    memberDetail.value.nickname = editingNick.value;
    memberDetail.value.phoneNumber = editingPhone.value;
    submitForm();
};

function submitForm() {
    // TO DO: 회원정보 수정 form의 로직 추가
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (!passwordRegex.test(memberDetail.value.newPassword)){
        alert("비밀번호는 영문, 숫자, 특수문자를 포함한 8~16자리여야 합니다.");
        return;
    }

    if (memberDetail.value.nickname.length < 2) {
        alert("닉네임을 2자 이상 입력해주세요!");
        return;
    } else if (memberDetail.value.nickname.length > 10) {
        alert("닉네임을 10자 이하로 입력해주세요!");
        return;
    }

    if (memberDetail.value.password === "") {
        alert("비밀번호를 입력해주세요.");
        return;
    }

    modifyMemberDetail(
        memberDetail,
        () => {
            // 회원정보 수정 시 수정한 닉네임으로 업데이트
            store.memberInfo.nickname = memberDetail.value.nickname;
            alert("회원정보가 변경되었습니다.");
            isEditing.value = false;
            memberDetail.value.password = "";
            memberDetail.value.newPassword = "";
        },
        () => {
            alert("비밀번호가 일치하지 않습니다.");
        }
    );
}

function signOut() {
    if (confirm("정말로 회원탈퇴 하시겠습니까?")) {
        deleteMember(memberNo);
        store.isLoggedIn = false; // 로그인 여부 false로 갱신
        store.memberInfo = ""; // 로그인한 사용자 정보 초기화
        sessionStorage.clear(); // 세션 스토리지 초기화
        router.push("/"); // 탈퇴 후 메인 페이지로 이동
    }
}
</script>

<template>
    <!-- 엄마 -->
    <div class="mypage-grid">
        <div class="mom-box" v-if="isEditing">
            <span>회원 정보 변경</span>
            <input type="text" v-model="editingNick" />
            <input type="tel" v-model="editingPhone" />
            <input type="password" placeholder="현재 비밀번호" v-model="memberDetail.password" />
            <input type="password" placeholder="새 비밀번호" v-model="memberDetail.newPassword" />
        </div>
        <div class="mom-box" v-else>
            <img src="@/assets/img/profile-bear-mom.png" alt="부모프로필" />
            <p>{{ memberDetail.nickname }}</p>
            <p>{{ memberDetail.phoneNumber }}</p>
        </div>
        <div class="btn-box" v-if="isEditing">
            <button @click="registEdit">저장</button>
            <button @click="cancelEdit">취소</button>
        </div>
        <div class="btn-box" v-else>
            <button @click="editInfo">정보수정</button>
            <button @click="signOut">회원탈퇴</button>
        </div>
    </div>
</template>

<style scoped>
* {
    font-family: "Jalnan";
}

.mypage-grid {
    width: 50%;
    margin: 0 auto;
}

/* 엄마 정보 */
.mom-box {
    width: 50%;
    margin: 0 auto;
    background-color: #89b9ad;
    text-align: center;
    border-radius: 1.87rem;
    color: #fff;
    padding: 1.25rem 0;
}

.mom-box img {
    width: 50%;
}

.mom-box p {
    margin: 3rem 0 1.25rem 0;
    font-size: 1.1rem;
}

.mom-box input {
    display: block;
    width: 80%;
    margin: 0.625rem auto;
    font-size: 1.1rem;
    background-color: #fff8f2;
    border: none;
    border-radius: 10px;
    padding: 0.625rem;
    color: #665031;
    font-size: 0.9rem;
}

.mom-box span {
    display: block;
    width: 100%;
    padding: 0.625rem 0;
}

.mom-box input::placeholder {
    font-size: 0.8rem;
    color: #AD9478;
}

/* 버튼 */
.btn-box {
    width: 50%;
    margin: 1.25rem auto 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.625rem;
}

.btn-box button {
    width: 100%;
    border: none;
    height: 2.5rem;
    border: 3px solid #ad9478;
    background-color: inherit;
    border-radius: 0.625rem;
}

.btn-box button:hover {
    background-color: #ad9478;
    color: #fff;
    transition-duration: 0.3s;
}
</style>
