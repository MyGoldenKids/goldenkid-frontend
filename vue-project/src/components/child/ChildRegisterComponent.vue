<script setup>
import { registerChild } from "@/api/child";
import { ref } from "vue";
import { useMemberStore } from "@/stores/member-store";

const store = useMemberStore();
const memberNo = store.memberInfo.memberNo;

const child = ref({
    childName: "",
    childBirth: "",
    childGender: true,
    memberId: memberNo,
    fileId: "",
});

function submitForm() {
    registerChild(child);
}
</script>

<template>
    <div class="child-wrap">
        <div class="child-wrap-right">
            <div class="register-form">
                <h1>금쪽이 정보 등록</h1>
                <form @submit.prevent="submitForm">
                    <div class="register-grid">
                        <div>
                            <label for="childName">이름</label>
                            <input
                                type="text"
                                v-model="child.childName"
                                required
                                placeholder="이름"
                            />
                        </div>
                        <div>
                            <label for="birthday">생년월일</label>
                            <input
                                type="date"
                                v-model="child.childBirth"
                                required
                                placeholder="생년월일"
                            />
                        </div>
                        <div>
                            <fieldset id="gender-group">
                                <label for="gender">성별</label>
                                <input
                                    type="radio"
                                    name="gender-group"
                                    value="true"
                                    v-model="child.childGender"
                                    required
                                />
                                <input
                                    type="radio"
                                    name="gender-group"
                                    value="false"
                                    v-model="child.childGender"
                                    required
                                />
                            </fieldset>
                        </div>
                    </div>
                    <button type="submit">등록하기</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
