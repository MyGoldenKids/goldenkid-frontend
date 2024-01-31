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
    <div class="child-wrap">
        <div
            class="child-list"
            v-for="(child, index) in childList"
            :key="index"
        >
            <input
                type="text"
                v-model="child.childName"
                :disabled="isDisabled[index]"
                required
            />
            <br />
            <input
                type="date"
                v-model="child.childBirth"
                :disabled="isDisabled[index]"
                required
            />
            <fieldset id="gender">
                <input
                    type="radio"
                    :value="true"
                    v-model="child.childGender"
                    :disabled="isDisabled[index]"
                />남
                <input
                    type="radio"
                    :value="false"
                    v-model="child.childGender"
                    :disabled="isDisabled[index]"
                />여
            </fieldset>
            <button @click="updateChild(child, index)">
                {{ isDisabled[index] ? "수정" : "등록" }}
            </button>
            <button @click="deleteChild(child.childId, index)">삭제</button>
        </div>
    </div>
</template>

<style scoped>
.child-list {
    margin-top: 1rem;
}
</style>
