import axios from "../axiosCustomize";
const postLogin = async (data) => {
  return await axios.post(`Authentication/Login`, data);
};
const postRegis = async (data) => {
  return await axios.post(`Authentication/Register`, data);
};
export { postLogin, postRegis };
