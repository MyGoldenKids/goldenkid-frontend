<script setup></script>

<template>
    <form>
        <div class="diary-write">
            <!-- 글 작성 부분 -->
            <div class="diary-write-left">
                <div class="write-box">
                    <input
                        type="text"
                        placeholder="일기 제목을 적어주세요"
                        class="write-title"
                    />
                    <p># 189번째 일기 2024.01.19</p>
                </div>
                <div>
                    <textarea
                        cols="50"
                        rows="10"
                        placeholder="일기를 내용을 적어주세요"
                        class="write-content"
                    ></textarea>
                </div>
                <div class="save-temp">
                    <button>임시저장</button>
                </div>
            </div>
            <div class="diary-write-right">
                <!-- 첨부파일 박스 -->
                <div class="upload-box">
                    <label for="file">
                        <img
                            src="../../assets/img/AddNew.png"
                            alt="add-img-err"
                        />
                        <span class="attach-content">파일찾기</span>
                    </label>
                    <input type="file" id="file" />
                </div>
                <!-- 버튼 -->
                <div class="submit-btn">
                    <button>등록</button>
                    <button>글쓰기 취소</button>
                </div>
            </div>
        </div>
    </form>
</template>

<style scoped>
/* 다이어리 컨텐츠 */
.diary-write {
    display: grid;
    grid-template-columns: 70% 30%;
}
/* 글 작성 부분 */
.diary-write-left {
    display: grid;
    padding: 1.875rem;
}
.diary-write-left div {
    padding: 0.625rem 1.875rem;
}
.write-box p {
    padding-top: 0.313rem;
    font-size: 0.8rem;
    text-align: right;
}
input[type="text"] {
    background-color: inherit;
    border: none;
    border-bottom: 0.313rem solid #89b9ad;
}
input[type="text"]::placeholder {
    color: #89b9ad;
}
input[type="text"]:focus {
    outline: none;
}
textarea {
    resize: none;
}
textarea:focus {
    outline: none;
}
textarea::placeholder {
    color: #89b9ad;
}
.write-title {
    width: 100%;
    height: 1.875rem;
    padding-left: 0.625rem;
    padding-bottom: 0.625rem;
    font-size: 1.2rem;
    font-family: "NanumNeuRisNeuRisCe";
    font-size: 2rem;
    font-weight: 700;
    color: #665031;
}
.write-content {
    width: 100%;
    height: 18.75rem;
    padding: 0.625rem;
    background-color: inherit;
    border: none;
    border-bottom: 0.313rem solid #89b9ad;
    box-sizing: border-box;
    font-size: 1.2rem;
    font-family: "NanumNeuRisNeuRisCe";
    font-size: 2rem;
    font-weight: 700;
    color: #665031;
}
.save-temp {
    justify-self: end;
}
.save-temp button {
    padding: 0.625rem 1.2rem;
    background-color: #89b9ad;
    border: none;
    box-shadow: none;
    border-radius: 0.625rem;
    color: #ffffff;
}

/* 파일 첨부 부분 */
.diary-write-right {
    background-color: #89b9ad;
    display: grid;
    height: 100%;
    padding-bottom: 1.2rem;
    border-radius: 1.2rem;
    box-sizing: border-box;
}
.upload-box {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.625rem;
    margin-bottom: 0.625rem;
}
.upload-header img {
    justify-self: start;
}
.attach-title {
    justify-self: start;
}
.upload-box .upload-name,
.upload-box label[for="file"] {
    justify-self: start;
}
.upload-box input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
}
.upload-box label {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin-left: 2.2rem;
    cursor: pointer;
}
.upload-box label :hover {
    color: #665031;
}
.upload-box img {
    width: 20%;
    height: auto;
}
.attach-content {
    color: #ad9478;
}
.submit-btn {
    align-self: end;
}
.submit-btn button {
    display: block;
    width: 70%;
    padding: 0.625rem 0;
    margin: 0.313rem auto;
    border-radius: 0.625rem;
    background-color: #fff;
    color: #89b9ad;
}
</style>