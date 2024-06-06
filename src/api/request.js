import axios from "axios";

const URL = "http://localhost:8080/api";
//const URL = "https://ban-dien-thoai-back-end.onrender.com/api";
const jwt = localStorage.getItem("jwt");

async function postLogin(data) {
    const response = await axios.post(URL + "/login", { ...data });
    return response.data;
}

async function postGetInforToJwt(jwt) {
    const response = await axios.post(URL + "/getInforToJwt", jwt);
    return response.data;
}

async function addPhone(data) {
    const response = await axios.post(URL + "/phone/add", data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwt}`,
        },
    });
    return response.data;
}

async function getAllPhone() {
    const response = await axios.get(URL + "/phone/all");
    return response.data;
}

async function updatePhone(data) {
    const response = await axios.put(URL + "/phone", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

async function deletePhone(id) {
    const response = await axios.delete(URL + `/phone/${id}`);
    return response.data;
}

export {
    postLogin,
    postGetInforToJwt,
    addPhone,
    getAllPhone,
    updatePhone,
    deletePhone,
};
