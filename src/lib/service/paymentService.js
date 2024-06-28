import axios from "../axiosCustomize";

const getWallet = async (id) => {
  return await axios.get(`Wallet/GetWalletById/${id}`);
};

const createPayment = async (data, config) => {
  return await axios.post("Payment/create", data, config);
};

export { getWallet, createPayment };
