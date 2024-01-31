import { fileInstance } from "./fileaxios";

const createFileList = (memberNo, data, success, fail) => {
  //   const formData = new FormData();
  fileInstance.post(`file/upload/${memberNo}`, data).then(success).catch(fail);
};

export { createFileList };
