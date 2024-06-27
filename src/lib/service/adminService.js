import axios from "../axiosCustomize";
const getAllUser = async () => {
  return await axios.get(`ManageAccount/GetAllUsers`);
};
const getUserById = async (id) => {
  return await axios.get(`ManageAccount/GetUserById/${id}`);
};
export { getAllUser, getUserById };
