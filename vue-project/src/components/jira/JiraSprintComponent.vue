<script setup>

</script>

<template>
    <div>
        <div class="jira-wrap">
            <div class="jira-dash">
                <div class="jira-home-header">JIRA</div>
                <div class="jira-explain">현재 상태로 스토리를 이동시키며 사용해보세요.</div>
                <div class="sprint-wrap">
                    <div class="sprint-board">
                        <div class="todolist">
                            <div>해야 할 일</div>
                            <div class="todolist-content">
                                <p>시장가기</p>
                                <p>2</p>
                            </div>
                        </div>
                    </div>
                    <div class="sprint-board">
                        <div class="todolist">
                            <div>진행 중</div>
                        </div>
                    </div>
                    <div class="sprint-board">
                        <div class="todolist">
                            <div>완료</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>        
</template>

<style scoped>
.jira-wrap {
    background-color: #AD9478;
    text-align: center;
    border-radius: 1.25rem;
    padding: 1.25rem;
    box-sizing: border-box;
}

.jira-dash {
    border: 4px dashed #665031;
    display: grid;
    justify-items: center;
    border-radius: 1.25rem;
    grid-template-rows: 1fr 0.7fr 6.5fr;
}

.jira-home-header {
    width: 17%;
    height: auto;
    background-image: url(@/assets/img/sticker9.png);
    background-size: cover;
    padding: 0.438rem 0;
    color: #AD9478;
    font-size: 1.5rem;
    margin: 1rem 0;
}

.jira-explain {
    font-size: 1.25rem;
    color: #FFF8F2;
    margin: 0.7rem;
    text-align: center;
}

.sprint-wrap {
    display: grid;
    width: 85%;
    grid-template-columns: repeat(3, 1fr);
    gap: 3.5rem;
    margin: 1rem 0;
}

.sprint-board {
    background-color: #665031;
    padding: 1rem;
    border-radius: 1.25rem;
    box-sizing: border-box;
    width: 100%;
}

.todolist {
    display: grid;
    justify-items: center;
    grid-template-rows: 1fr 1.2fr 1.2fr 1.2fr 1.2fr 1.2fr;
    gap: 0.7rem;
    height: 100%;
}

.todolist > div {
    color: #FFF8F2;
    font-size: 130%;
    display: grid;
    align-items: center;
}

.todolist-content {
    display: grid;
    grid-template-columns: 77% 20% 3%;
    background-color: #FFF8F2;
    width: 100%;
    border-radius: 1rem;
    color: #665031;
}

.todolist-content :last-child {
    background-color: #665031;
    color: #FFF8F2;
    border-radius: 1rem;
    width: 90%;
    height: 70%;
    display: grid;
    align-items: center;

}
</style>