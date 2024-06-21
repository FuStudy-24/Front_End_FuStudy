import axios from "../axiosCustomize";

const getQuestion = async () => {
  return await axios.get("Question/GetAllQuestions");
};

const createQuestionByCoin = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post("Question/CreateQuestionByCoin", formData, config);
};
const createQuestionBySubscription = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post(
    "Question/CreateQuestionWithSubscription",
    formData,
    config
  );
};

const updateQuestion = async (id, formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.patch(`Question/UpdateQuestion/${id}`, formData, config);
};

const deleteQuestion = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.delete(`Question/DeleteQuestion/${id}`, config);
};

const getQuestionByUserId = async (id) => {
  return await axios.get(`Question/GetAllQuestionsByUserId/${id}`);
};

export {
  getQuestion,
  createQuestionByCoin,
  getQuestionByUserId,
  updateQuestion,
  deleteQuestion,
  createQuestionBySubscription,
};
