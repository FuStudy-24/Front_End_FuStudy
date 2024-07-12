import axios from "../axiosCustomize";

const getProfile = async (id) => {
  return await axios.get(`ManageAccount/GetUserById/${id}`);
};

const updateProfile = async (id, data, config) => {
  return await axios.put(`ManageAccount/UpdateUser/${id}`, data, config);
};

const getTransaction = async (id) => {
  return await axios.get(`Transaction/GetAllTransactionByWalletId/${id}`);
};

export { getProfile, updateProfile, getTransaction };
