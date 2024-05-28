import axios from "../axiosCustomize";
const postLogin = async (data) => {
  return await axios.post(`Authentication/Login`, data);
};
export { postLogin };
