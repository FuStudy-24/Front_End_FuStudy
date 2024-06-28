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

const getAllQuestionComments = async () => {
  return await axios.get("QuestionComment/GetAllQuestionComments");
};

const CreateQuestionComment = async (commentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post(
    "QuestionComment/CreateQuestionComment",
    commentData,
    config
  );
};

const GetCommentQuestionById = async (id) => {
  return await axios.get(`QuestionComment/GetQuestionCommentById/${id}`);
};
const GetAllQuestionCommentsByQuestionId = async (
  id,
  pageIndex = 1,
  pageSize = 5
) => {
  return await axios.get(
    `QuestionComment/GetAllQuestionCommentsByQuestionId/${id}`,
    {
      params: { PageIndex: pageIndex, PageSize: pageSize },
    }
  );
};
const DeleteQuestionComment = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.delete(
    `QuestionComment/DeleteQuestionComment/${id}`,
    config
  );
};
const UpdateQuestionComment = async (id, formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.patch(
    `QuestionComment/UpdateQuestionComment/${id}`,
    formData,
    config
  );
};
export {
  getQuestion,
  createQuestionByCoin,
  getQuestionByUserId,
  updateQuestion,
  deleteQuestion,
  createQuestionBySubscription,
  CreateQuestionComment,
  GetCommentQuestionById,
  getAllQuestionComments,
  GetAllQuestionCommentsByQuestionId,
  DeleteQuestionComment,
  UpdateQuestionComment,
};
