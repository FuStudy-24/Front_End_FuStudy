import axios from "../axiosCustomize";
const getAllUser = async () => {
  return await axios.get(`ManageAccount/GetAllUsers`);
};

const getUserById = async (id) => {
  return await axios.get(`ManageAccount/GetUserById/${id}`);
};

const getAllTransaction = async () => {
  return await axios.get("Transaction/GetAllTransactions");
}

const getAllMentor = async () => {
  return await axios.get("Mentor/GetAllMentor");
};

const addUser = async (data) => {
  return await axios.post("ManageAccount/CreateUser", data);
};
export { getAllUser, getUserById, addUser, getAllMentor, getAllTransaction };
