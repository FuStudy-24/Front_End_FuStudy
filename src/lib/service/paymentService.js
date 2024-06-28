import axios from "../axiosCustomize";

const getWallet = async (id) => {
  return await axios.get(`Wallet/GetWalletById/${id}`);
};

const createPayment = async (data) => {
  return await axios.post("Payment/create", data);
};

export { getWallet, createPayment };
