import axios from "../axiosCustomize";

const getMajor = async () => {
  return await axios.get("Major/GetAllMajor");
};

const getMentor = async (id) => {
  return await axios.get(`Mentor/GetMentorByUserId/${id}`);
};

const updateMentor = async (id) => {
    return await axios.patch(`Mentor/UpdateMentor/${id}`);
  };

export { getMajor, getMentor, updateMentor };
