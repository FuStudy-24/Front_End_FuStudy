import axios from "../axiosCustomize";
const forgetPass = async (data) => {
  return await axios.post(`Authentication/ForgotPassword`, data);
};
const resetPass = async (data) => {
  return await axios.post(`Authentication/ResetPassword`, data);
};

export {forgetPass, resetPass}
