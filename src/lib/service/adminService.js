import axios from "../axiosCustomize";
const getAllUser = async () => {
  return await axios.get(`ManageAccount/GetAllUsers`);
};

const getUserById = async (id) => {
  return await axios.get(`ManageAccount/GetUserById/${id}`);
};

const getAllTransaction = async (index, size) => {
  return await axios.get(
    `Transaction/GetAllTransactions?PageIndex=${index}&PageSize=${size}`
  );
};

const getAllMentor = async () => {
  return await axios.get("Mentor/GetAllMentor");
};

const addUser = async (data) => {
  return await axios.post("ManageAccount/CreateUserForAdmin", data);
};

const updateUser = async (id, data) => {
  return await axios.put(`ManageAccount/UpdateUser/${id}`, data);
};

const activateUser = async (id) => {
  return await axios.patch(`ManageAccount/ActivateUser/${id}`);
};

const deactivateUser = async (id) => {  // Ensure semicolon is present
  return await axios.patch(`ManageAccount/Deactivate/${id}`);
};

const verifyMentor = async (id) => {
  return await axios.patch(`Mentor/VerifyMentor/${id}`);
};

export {
  getAllUser,
  getUserById,
  addUser,
  getAllMentor,
  getAllTransaction,
  verifyMentor,
  updateUser,
  activateUser,
  deactivateUser,
};
