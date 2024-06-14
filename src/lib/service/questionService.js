import axios from "../axiosCustomize";

const getQuestion = async () => {
  return await axios.get("Question/GetAllQuestions");
};

export { getQuestion };
