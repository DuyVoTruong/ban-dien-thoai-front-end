import axios from "axios";

// const URL = "http://localhost:8080/api";
const URL = "https://ban-dien-thoai-back-end.onrender.com/api";

async function postLogin(data) {
    const response = await axios.post(URL + "/login", { ...data });
    return response.data;
}

async function postGetInforToJwt(jwt) {
    const response = await axios.post(URL + "/getInforToJwt", jwt);
    return response.data;
}

export { postLogin, postGetInforToJwt };
