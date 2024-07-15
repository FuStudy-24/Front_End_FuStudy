import axios from "../axiosCustomize";

const addMajor = async (data, config) => {
  return await axios.post("MentorMajor/CreateMentorMajor", data, config);
};

const getAllMentorVerify = async () => {
  return await axios.get("Mentor/GetAllMentorVerify");
};
const getMajor = async () => {
  return await axios.get("Major/GetAllMajor");
};

const deleteMajor = async (id) => {
  return await axios.delete(`MentorMajor/DeleteMentorMajor/${id}`);
};

const getMentorMajor = async (id) => {
  return await axios.get(`MentorMajor/GetAllMentorMajorByMentorId/${id}`);
};

const getAllMajor = async () => {
  return await axios.get("Major/GetAllMajor");
};

const getMentor = async (id) => {
  return await axios.get(`Mentor/GetMentorByUserId/${id}`);
};

const updateMentorInfo = async (id, data) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data", // Adjust if necessary
    },
  };
  return await axios.patch(`Mentor/UpdateMentor/${id}`, data, config);
};

export {
  addMajor,
  getAllMajor,
  getMentorMajor,
  getMentor,
  updateMentorInfo,
  deleteMajor,
  getAllMentorVerify,
};
