import { instance } from "./axios";


// 파일 리스트 생성하기
// const createFileList = (memberNo, data, success, fail) => {
//   instance.defaults.headers.post["Content-Type"] = "multipart/form-data";
//   instance.post(`file/upload/${memberNo}`, data).then(success).catch(fail);
//   instance.defaults.headers.post["Content-Type"] = "application/json";
// };

// new 파일 리스트 생성하기
const createFileList = (memberNo, data) => {
  instance.defaults.headers.post["Content-Type"] = "multipart/form-data";
  return instance.post(`file/upload/${memberNo}`, data)
  .then(response => {
    return response.data.data;
  })
  .catch(error => {
    throw error;
  })
  .finally(() => {
    instance.defaults.headers.post["Content-Type"] = "application/json";
  })  
};

// 파일 불러오기
const getFileInfo = (fileListId, success, fail) => {
  return instance
    .get(`file/detail/all/${fileListId}`)
    .then(success)
    .catch(fail);
};

// 파일 다운로드
const downloadFile = (fileId, success, fail) => {
  return instance
    .get(`file/download/${fileId}`, { responseType: "blob" })
    .then(success)
    .catch(fail);
};

// new 파일 수정
const modifyFile = (fileListId, memberId, data) => {
  instance.defaults.headers.post["Content-Type"] = "multipart/form-data";
  return instance.post(`file/upload/flist/${fileListId}/${memberId}`, data)
  .then(response => {
    return response.data.data;
  })
  .catch(error => {
    throw error;
  })
  .finally(() => {
    instance.defaults.headers.post["Content-Type"] = "application/json";
  })
};

// 파일 삭제
const deleteFile = (fileId, success, fail) => {
  return instance
    .put(`file/delete/${fileId}`)
    .then(success)
    .catch(fail);
};

// // 파일 수정
// const modifyFile = (fileListId, memberId, data, success, fail) => {
//   instance.defaults.headers.post["Content-Type"] = "multipart/form-data";
  
//   const res = instance
//     .post(`file/upload/flist/${fileListId}/${memberId}`, data)
//     .then(success)
//     .catch(fail);
//   // instance.defaults.headers.post["Content-Type"] = "application/json";
//   console.log(res);
//   return res;
// };



export { createFileList, getFileInfo, downloadFile, modifyFile, deleteFile };
