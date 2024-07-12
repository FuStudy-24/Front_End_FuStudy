import axios from "../axiosCustomize";

const getWallet = async (id) => {
  return await axios.get(`Wallet/GetWalletById/${id}`);
};

const createPayment = async (data, config) => {
  return await axios.post("Payment/create", data, config);
};

const addCoin = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.get(`Payment/${id}`, config);
};

export { getWallet, createPayment, addCoin };
