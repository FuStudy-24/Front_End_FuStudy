"use client"
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { CreateBooking } from "@/lib/service/bookingService";
import useAuthStore from '@/lib/hooks/useUserStore';

interface BookingModalProps {
  mentor: Mentor | null;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

interface Mentor {
  academicLevel: string;
  workPlace: string;
  skill: string;
  profession: string;
  user: {
    fullname: string;
    avatar: string;
  };
  id: number; // Sử dụng id của mentor ở đây
}

const BookingModal: React.FC<BookingModalProps> = ({ mentor, showModal, setShowModal }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [duration, setDuration] = useState<string>("00:30:00");
  const [bookingMethod, setBookingMethod] = useState<string>("Coin");
  const { token } = useAuthStore();

  const handleBooking = async () => {
    if (mentor && startDate) {
      const bookingPayload = {
        mentorId: mentor.id, // Sử dụng id của mentor
        bookingMethod,
        startTime: format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
        duration
      };

      // Gửi yêu cầu booking tới API của bạn
      try {
        const response = await CreateBooking(bookingPayload, token);
        if (response.status === 200) {
          alert('Booking successful!');
          setShowModal(false);
        } else {
          alert('Booking failed!');
        }
      } catch (error) {
        console.error('Failed to book:', error);
      }
    }
  };

  if (!showModal || !mentor) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg w-full max-w-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Book a session with {mentor.user.fullname}</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Date and Time</label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full border border-gray-300 rounded-md p-2"
            minDate={new Date(Date.now() + 60 * 60 * 1000)} // Start time must be at least 1 hour from now
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="00:30:00">30 minutes</option>
            <option value="00:45:00">45 minutes</option>
            <option value="01:00:00">1 hour</option>
            <option value="01:30:00">1 hour 30 minutes</option>
            <option value="02:30:00">2 hours 30 minutes</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Booking Method</label>
          <select
            value={bookingMethod}
            onChange={(e) => setBookingMethod(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="Coin">Coin</option>
            <option value="Subscription">Subscription</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 mr-2 bg-gray-500 text-white rounded-full"
          >
            Cancel
          </button>
          <button
            onClick={handleBooking}
            className="px-4 py-2 bg-blue-500 text-white rounded-full"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
