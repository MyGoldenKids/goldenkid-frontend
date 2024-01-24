<script setup>
import { ref } from "vue";
import { checkId, message, signup } from "@/api/member";

const member = ref({
    memberId: "",
    password: "",
    nickname: "",
    phoneNumber: "",
});

const checked = ref(false); // 체크박스 체크여부
const passwordValidate = ref(""); // 비밀번호 확인

function submitForm() {
    if (checked.value && passwordValidate.value == member.value.password) {
        signup(member);
    } else if (!checked.value) {
        // 체크박스 미체크
        alert("개인정보 이용에 동의해주세요!");
    } else if (passwordValidate.value != member.value.password) {
        // 비밀번호 불일치
        alert("비밀번호를 확인해주세요!");
    }
}
</script>

<template>
    <div>
        <div>
            <form @submit.prevent="submitForm">
                <div>
                    <label for="memberId">아이디(이메일)</label>
                    <input
                        type="email"
                        v-model="member.memberId"
                        required
                        @keyup="checkId(member.memberId)"
                    />
                    {{ message }}
                </div>
                <div>
                    <label for="password">비밀번호</label>
                    <input type="password" required v-model="member.password" />
                </div>
                <div>
                    <label for="passwordValidate">비밀번호 확인</label>
                    <input type="password" v-model="passwordValidate" />
                </div>
                <div>
                    <label for="nickname">닉네임</label>
                    <input type="text" required v-model="member.nickname" />
                </div>
                <div>
                    <label for="phoneNumber">연락처</label>
                    <input type="tel" required v-model="member.phoneNumber" />
                </div>
                <div>
                    <label for="checkbox">개인정보 이용 동의(필수)</label>
                    <input type="checkbox" v-model="checked" />
                </div>
                <button type="submit">가입하기</button>
            </form>
        </div>
    </div>
</template>

<style scoped></style>
