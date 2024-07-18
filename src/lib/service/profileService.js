import axios from "../axiosCustomize";

const getProfile = async (id) => {
  return await axios.get(`ManageAccount/GetUserById/${id}`);
};

const updateProfile = async (id, data, config) => {
  return await axios.put(`ManageAccount/UpdateUser/${id}`, data, config);
};

const getTransaction = async (id,index,size) => {
  return await axios.get(`Transaction/GetAllTransactionByWalletId/${id}?PageIndex=${index}&PageSize=${size}`);
};

export { getProfile, updateProfile, getTransaction };
