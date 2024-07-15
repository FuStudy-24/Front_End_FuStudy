import axios from "../axiosCustomize";

const getChatByUserID = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.get("Conversation/GetConversationByUserId1", config);
};
const getConversationMessagesByConversationId = async (
  conversationId,
  token
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.get(
    `ConversationMessage/GetConversationMessagesByConversationId/${conversationId}`,
    config
  );
};
const createConversationMessage = async (conversationId, message, token) => {
  const formData = {
    conversationId,
    message,
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await axios.post(
    "ConversationMessage/CreateConversationMessage",
    formData,
    config
  );
};

export {
  getChatByUserID,
  getConversationMessagesByConversationId,
  createConversationMessage,
};
