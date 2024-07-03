import axios from "../axiosCustomize";

const CreateBooking = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post("Booking/CreateBooking", formData, config);
};

const GetAllMentorBookingByUserId = async (id) => {
  return await axios.get(`Booking/GetAllMentorBookingByUserId/${id}`);
};
const GetAllStudentBookingByHttpContext = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.get("Booking/GetAllStudentBookingByHttpContext", config);
};

const AcceptBooking = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post(`Booking/AcceptBooking/${id}`, {}, config);
};
const CancelBooking = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post(`Booking/CancelBooking/${id}`, {}, config);
};

const RejectBooking = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post(`Booking/RejectBooking?id=${id}`, {}, config);
};

export {
  CreateBooking,
  GetAllMentorBookingByUserId,
  AcceptBooking,
  RejectBooking,
  GetAllStudentBookingByHttpContext,
  CancelBooking,
};
