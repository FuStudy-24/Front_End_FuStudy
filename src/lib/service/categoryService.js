import axios from "../axiosCustomize";
const getAllCategory = async () => {
  return await axios.get("Category/GetAllCategories");
};

export { getAllCategory };
