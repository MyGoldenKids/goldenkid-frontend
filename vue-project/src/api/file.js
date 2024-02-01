import { fileInstance } from "./fileaxios";

// 파일 리스트 생성하기
const createFileList = (memberNo, data, success, fail) => {
  fileInstance.post(`file/upload/${memberNo}`, data).then(success).catch(fail);
};

// 파일 불러오기
const getFileInfo = (fileListId, success, fail) => {
  return fileInstance
    .get(`file/detail/all/${fileListId}`)
    .then(success)
    .catch(fail);
};

// 파일 다운로드
const downloadFile = (fileId, success, fail) => {
  return fileInstance
    .get(`file/download/${fileId}`, { responseType: "blob" })
    .then(success)
    .catch(fail);
};

export { createFileList, getFileInfo, downloadFile };
