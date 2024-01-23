import { instance } from "@/api//axios";

const checkId = async (member_id) => {
    await instance
        .post("member/idcheck/" + member_id)
        .then((response) => {
            console.log(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
};

export { checkId };
