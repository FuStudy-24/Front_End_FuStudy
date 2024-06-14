import axios from "../axiosCustomize";
const getAllUser = async () => {
    return await axios.get(`ManageAccount/GetAllUsers`)
}
export {getAllUser}