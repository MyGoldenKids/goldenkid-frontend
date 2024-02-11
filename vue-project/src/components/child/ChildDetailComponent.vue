<script setup>
import { getChildList, updateChildInfo, registerChild, deleteChildInfo } from "@/api/child";
import { ref, onMounted } from "vue";
import { useMemberStore } from "@/stores/member-store";
const store = useMemberStore();
const memberNo = store.memberInfo.memberNo; // 로그인한 memberNO
const childList = ref([]);
const isDisabled = ref([]);
const editingChildName = ref("");
const editingChildGender = ref("");
const editingChildBirth = ref("");
const isAdding = ref(false);
const addChildName = ref("");
const addChildGender = ref(true);
const addChildBirth = ref("");

onMounted(() => {
    getChild(memberNo); // 아이 목록 가져오기
});

// 금쪽이 목록 가져오기
const getChild = (memberNo) => {
    getChildList(memberNo, (response) => {
        childList.value = response.data.data;
        isDisabled.value = childList.value.map(() => true);
    }).catch((error) => {
        console.log(error);
    });
};

// 금쪽이 수정 폼
const editChild = (childId) => {
    childList.value.forEach((c) => {
        if (c.childId === childId) {
            c.isEditing = true;
            editingChildName.value = c.childName
            editingChildGender.value = c.childGender
            editingChildBirth.value = c.childBirth
        }
    });
};

// 수정하다가 취소버튼 눌렀을 때
const cancelEdit = (childId) => {
    childList.value.forEach((c) => {
        if (c.childId === childId) {
            c.isEditing = false;
        }
    });
};

// 금쪽이 수정 submit
const updateChild = async (childId) => {
    const childToSave = childList.value.find((c) => c.childId === childId);
    if (childToSave) {
        if(!editingChildName.value) {
            alert("이름을 입력해주세요.");
            return;
        }
        if(!editingChildBirth.value) {
            alert("생년월일을 입력해주세요.");
            return;
        }
        try {
            await updateChildInfo({
                childId: childId,
                childName: editingChildName.value,
                childGender: editingChildGender.value,
                childBirth: editingChildBirth.value
            });
            childToSave.isEditing = false; // 수정 모드 해제
            getChild(memberNo); // 아이 목록 새로고침
        } catch (error) {
            console.error("아이 정보 업데이트 중 오류 발생:", error);
        }
    }
};

// 금쪽이 추가
const newChild = () => {
    isAdding.value = true;
};

// 금쪽이 추가 취소
const cancelAdd = () => {
    isAdding.value = false;

};

// 새 금쪽이 등록
const addChild = async () => {
    try {
        if(!addChildName.value) {
            alert("이름을 입력해주세요.");
            return;
        }
        if(!addChildBirth.value) {
            alert("생년월일을 입력해주세요.");
            return;
        }
        await registerChild({
            memberId: memberNo,
            childName: addChildName.value,
            childGender: addChildGender.value,
            childBirth: addChildBirth.value
        });
        isAdding.value = false;
        getChild(memberNo); // 아이 목록 새로고침
        addChildName.value = "";
        addChildGender.value = true;
        addChildBirth.value = "";
    } catch (error) {
        console.error("아이 정보 등록 중 오류 발생:", error);
    }
};

// 금쪽이 삭제
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
            <div class="kid-box" v-for="(child, index) in childList" :key="index">
                <!-- 수정화면 -->
                <div v-if="child.isEditing">
                    <span>금쪽이 수정</span>
                    <input type="text" v-model="editingChildName">
                    <div class="radio-box">
                        <div class="radio-box">
                            <div class="radio-button">
                                <input type="radio" id="male" value="true" v-model="editingChildGender">
                                <label for="male">남아</label>
                            </div>
                            <div class="radio-button">
                                <input type="radio" id="female" value="false" v-model="editingChildGender">
                                <label for="female">여아</label>
                            </div>
                        </div>
                    </div>
                    <input type="date" v-model="editingChildBirth">
                    <div class="mypage-grid">
                        <div class="btn-box">
                            <button @click="updateChild(child.childId)">저장</button>
                            <button @click="cancelEdit(child.childId)">취소</button>
                        </div>
                    </div>
                </div>


                <!-- 조회화면 -->
                <div v-else>
                    <img src="@/assets/img/bear-profile.png" alt="금쪽프로필" />
                    <p>{{ child.childName }}</p>
                    <p v-if="child.childGender">남아</p>
                    <p v-else>여아</p>
                    <p>{{ child.childBirth }}</p>
                    <div class="mypage-grid">
                        <div class="btn-box">
                            <button @click="editChild(child.childId)">수정</button>
                            <button @click="deleteChild(child.childId)">삭제</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 금쪽이 추가화면 -->
            <div v-if="isAdding" class="kid-box">
                <span>금쪽이 추가</span>
                <input type="text" v-model="addChildName">
                <div class="radio-box">
                    <div class="radio-box">
                        <div class="radio-button">
                            <input type="radio" id="male" value="true" v-model="addChildGender">
                            <label for="male">남아</label>
                        </div>
                        <div class="radio-button">
                            <input type="radio" id="female" value="false" v-model="addChildGender">
                            <label for="female">여아</label>
                        </div>
                    </div>
                </div>
                <input type="date" v-model="addChildBirth">
                <div class="mypage-grid">
                    <div class="btn-box">
                        <button @click="addChild">저장</button>
                        <button @click="cancelAdd">취소</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-plus-box">
            <button @click="newChild">금쪽이 추가하기</button>
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
    margin-top: 2.25rem;
}

/* 애기 */
.kid-box {
    background-color: #e1baad;
    text-align: center;
    border-radius: 1.87rem;
    color: #fff;
    padding: 0.625rem 0 1.25rem 0;
    opacity: 1;
    /* 시작 투명도 */
    transition: opacity 0.5s ease-in-out;
    /* 트랜지션 효과 적용 */
}

.kid-box span {
    display: block;
    padding: 0.625rem 0;
}

.kid-box img {
    width: 50%;
}

.kid-box p {
    margin: 0.625rem 0;
    font-size: 1.1rem;
}

.kid-box input {
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

/* 버튼 */
.btn-box {
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.625rem;
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

.btn-plus-box button {
    display: block;
    width: 60%;
    margin: 1.25rem auto;
    border: none;
    height: 2.5rem;
    border: 3px solid #ad9478;
    background-color: inherit;
    border-radius: 0.625rem;
}

.btn-plus-box button:hover {
    background-color: #ad9478;
    color: #fff;
    transition-duration: 0.3s;
}

/* 라디오버튼 디자인 */
.radio-button {
    display: inline-block;
    margin-right: 20px;
}

.radio-button input[type="radio"] {
    display: none;
    /* 기본 라디오 버튼 숨기기 */
}

.radio-button label {
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    display: inline-block;
    line-height: 20px;
}

.radio-button label:before,
.radio-button label:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.radio-button label:before {
    background-color: #fff8f2;
    border: 2px solid #ad9478;
    box-sizing: border-box;
}

.radio-button label:after {
    background-color: #e1baad;
    transform: scale(0);
}

.radio-button input[type="radio"]:checked+label:after {
    transform: scale(0.5);
}</style>
