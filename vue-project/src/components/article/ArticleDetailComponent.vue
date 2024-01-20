<script setup></script>

<template>
    <!-- ==============모든페이지 여기부터 바뀜===================== -->
    <!-- 꿀팁 게시판 상세-->
    <div class="board-detail">
        <!-- 게시글 타이틀 -->
        <div class="board-title">
            <h1>금쪽다이어리 작성하는 꿀팁 전수해드립니다.</h1>
            <div class="title-sub">
                <div class="title-sub-left">
                    <div class="left-item1">
                        <img
                            src="@/assets/img/basic_profile.png"
                            alt="프로필기본이미지"
                        />
                        <span>영소정</span>
                    </div>
                    <div class="left-item2">2024.01.16</div>
                    <div class="left-item2">조회수 : 116</div>
                    <div class="left-item2">추천수 : 29</div>
                </div>
                <div class="title-sub-right">
                    <div class="right-item">
                        <button class="like-btn">추천하기 ❤</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 게시글 내용 -->
        <div class="board-content">
            <p>
                한 가족이 함께 공원에 나가서 피크닉을 즐기고 있었습니다.
                아이들은 잔디밭에서 놀이를 하고, 부모님은 고기를 구워 맛있는
                점심을 준비했습니다. 햇빛은 따뜻하게 미소 짓고 있었고, 새들의
                노래가 시원한 바람과 어우러져 피크닉의 날은 완벽한
                휴식이었습니다. 한적한 산골 마을에 사는 사람들은 서로 친밀하게
                지내며 평화로운 삶을 즐기고 있습니다. 이 마을은 자연의
                아름다움과 조용한 분위기로 둘러싸여 있어 일상의 스트레스로부터
                벗어나기에 안성맞춤입니다. 아침에는 새소리가 귀를 감동시키고,
                저녁에는 별들이 하늘에 빛나며 마을 사람들은 마음껏 대화하며
                평화롭게 지낼 수 있습니다.
            </p>
        </div>

        <!-- 게시글 댓글 -->
        <div class="board-comment">
            <div class="comment-count">댓글 <span>2</span></div>

            <!-- for문 돌릴듯1 -->
            <div class="board-comment-sub">
                <div class="comment-sub-left">
                    <div class="comment-writer">
                        <img
                            src="@/assets/img/basic_profile.png"
                            alt="프로필기본이미지"
                        />
                        <span>영소정</span>
                    </div>
                    <div class="comment-content">소중한 정보 감상이잉ㅇ</div>
                </div>
                <div class="comment-sub-right">
                    <div class="comment-date">2024.01.20</div>
                    <!-- 여기는 로그인한 회원정복 일치할 때만 보일거야  -->
                    <div class="comment-btn">
                        <button class="comment-modify">수정</button> |
                        <button class="comment-delete">삭제</button>
                    </div>
                </div>
            </div>

            <!-- for문 돌릴듯2 -->
            <div class="board-comment-sub">
                <div class="comment-sub-left">
                    <div class="comment-writer">
                        <img
                            src="@/assets/img/basic_profile.png"
                            alt="프로필기본이미지"
                        />
                        <span>영소정</span>
                    </div>
                    <div class="comment-content">
                        소중한 정보 감상이잉ㅇdddddddddddddddddddd
                    </div>
                </div>
                <div class="comment-sub-right">
                    <div class="comment-date">2024.01.20</div>
                    <!-- 여기는 로그인한 회원정복 일치할 때만 보일거야  -->
                    <div class="comment-btn">
                        <button class="comment-modify">수정</button> |
                        <button class="comment-delete">삭제</button>
                    </div>
                </div>
            </div>
            <!-- for문 끝 -->

            <!-- 댓글 작성 폼 -->
            <div class="commet-add">
                <input
                    type="text"
                    class="add-input"
                    placeholder="댓글작성"
                    value=""
                />
                <button class="add-btn">등록</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.board-detail {
    /* background-color: beige; */
    max-width: 1000px;
    margin: 0 auto;
    padding: 1.25rem 0;
    color:#665031;
}

/* 게시글 타이틀 부분 */
.board-title {
    border-bottom: 1px solid #AD9478;
}
.board-title h1 {
    font-size: 1.625rem;
    padding: 0 1.25rem;
    font-weight: 300;
}
.title-sub {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    padding: 0.625rem 1.25rem;
}
.title-sub-left {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    padding: 0.625rem 0;
}
.left-item1 {
    font-weight: 400;
    font-size:1.1rem;
    display: grid;
    grid-template-columns: 30% 60%;
    gap: 0.313rem;
    align-items: center;
}
.left-item2 {
    font-size:0.8rem;
    text-align: center;
    border-right: 2px solid #AD9478;
}
.left-item2:last-child {
    border:none;
}
.title-sub-right {
    display: grid;
    align-items: center;
    padding: 0.625rem 0;
    font-size: 0.7rem;
}
.right-item {
    width: 20%;
    float: right;
    justify-self: end;
}
.like-btn {
    width:100%;
    padding: 0.625rem;
    border: 1px solid #665031;
    background-color: #FFF8F2;
    font-size : 0.7rem;
}

/* 게시글 내용 부분 */
.board-content {
    padding: 1.25rem;
}
.board-content p {
    line-height: 1.5rem;
}

/* 게시글 댓글 부분 */
.board-comment {
    padding: 1.25rem;
}
/* 댓글 카운트 부분 */
.comment-count {
    padding: 1.25rem;
    font-size: 1.25rem;
    border-bottom: 1px solid #AD9478;
}
.comment-count span {
    font-weight: 800;
    color: #89B9AD;
}

/* 댓글 리스트 */
.board-comment-sub {
    /* background-color: pink; */
    display: grid;
    grid-template-columns: 80% 20%;
    align-items: center;
    padding: 1.25rem;
    border-bottom: 1px solid #AD9478;
}

.comment-writer {
    /* background-color: pink; */
    font-weight: 300;
    padding: 1.25rem 0;
    font-size: 1.2rem;
    display: grid;
    grid-template-columns: 5% 20%;
    align-items: center;
}
.comment-content {
    width: 100%;
    padding-left: 2.3rem;
}
.comment-sub-right {
    /* background-color: pink; */
    justify-self: end;
}
.comment-date {
    padding: 0.625rem 0.313rem;
    text-align: right;
    font-size: 0.8rem;
}
.comment-btn button {
    border: none;
    background-color: #FFF8F2;
}
.commet-add {
    padding: 1.25rem;
    display: grid;
    grid-template-columns: 85% 15%;
    gap: 1rem;
}
.add-input {
    border-radius: 50px;
    height: 50px;
    border: 2px solid #89B9AD;
    padding-left: 20px;
    background-color: #FFF8F2;
    box-sizing: border-box;
}
.add-input:focus{
    border: 2px solid #89B9AD;
    box-sizing: border-box;
    border-radius: 50px;
    outline: 1px solid #89B9AD;
}
.add-btn {
    border-radius: 50px;
    height: 50px;
    background-color: #89B9AD;
    color: #fff;
    border: none;
    font-size: 1.1rem;
}
</style>
