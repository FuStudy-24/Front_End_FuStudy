"use client";
import React, { useEffect, useState } from 'react';
import { GetAllStudentBookingByHttpContext, CancelBooking } from '@/lib/service/bookingService';
import { getChatByUserID, getConversationMessagesByConversationId, createConversationMessage } from '@/lib/service/chatService';
import useAuthStore from '@/lib/hooks/useUserStore';
import { Conversation, Message } from "@/app/myorder/type"

interface Order {
  id: string;
  startTime: string;
  status: string;
  user: {
    id: string;
    fullname: string;
  };
}

const MyOrder: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ordersPerPage = 5;
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState<string>('');

  const { userInfo, token } = useAuthStore((state) => ({
    userInfo: state.userInfo,
    token: state.token,
  }));

  useEffect(() => {
    const fetchOrders = async () => {
      if (token) {
        try {
          const response = await GetAllStudentBookingByHttpContext(token);
          if (response.status === 200) {
            const userOrders = response.data.data.filter((order: Order) => order.user.id === userInfo.id);
            setOrders(userOrders);
            setFilteredOrders(userOrders);
          } else {
            console.error('Failed to fetch orders: ', response.statusText);
          }
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        }
      }
    };

    const fetchConversations = async () => {
      if (token) {
        try {
          const response = await getChatByUserID(token);
          if (response.status === 200) {
            const data = Array.isArray(response.data) ? response.data : [];
            setConversations(data.filter(conversation => !conversation.isClose));
          } else {
            console.error('Failed to fetch conversations: ', response.statusText);
          }
        } catch (error) {
          console.error('Failed to fetch conversations:', error);
        }
      }
    };

    fetchOrders();
    fetchConversations();
  }, [token, userInfo]);

  useEffect(() => {
    if (selectedStatus === 'All') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === selectedStatus));
    }
    setCurrentPage(1); // Reset to first page when filter changes
  }, [selectedStatus, orders]);

  const handleCancel = async (id: string) => {
    const order = orders.find(order => order.id === id);
    if (order?.status !== 'Pending') {
      alert('Only pending bookings can be cancelled.');
      return;
    }

    try {
      const response = await CancelBooking(id, token);
      if (response.status === 200) {
        alert('Booking cancelled successfully!');
        setOrders(orders.filter(order => order.id !== id));
        setFilteredOrders(filteredOrders.filter(order => order.id !== id));
      } else {
        alert('Failed to cancel booking');
      }
    } catch (error) {
      console.error('Failed to cancel booking:', error);
    }
  };

  const handleConversationClick = async (conversationId: number) => {
    setCurrentConversationId(conversationId);
    if (token) {
      try {
        const response = await getConversationMessagesByConversationId(conversationId, token);
        if (response.status === 200) {
          setMessages(response.data);
        } else {
          console.error('Failed to fetch messages: ', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    }
  };

  const handleSendMessage = async () => {
    if (currentConversationId && newMessage.trim() !== '') {
      try {
        const response = await createConversationMessage({ conversationId: currentConversationId, content: newMessage }, token);
        if (response.status === 200) {
          setMessages([...messages, response.data]);
          setNewMessage('');
        } else {
          console.error('Failed to send message: ', response.statusText);
        }
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  // Logic for displaying current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredOrders.length / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">Filter by status:</label>
        <select
          id="statusFilter"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border rounded p-2"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Declined">Declined</option>
          <option value="OverTime">OverTime</option>
        </select>
      </div>
      {currentOrders.length > 0 ? (
        <div className="space-y-4">
          {currentOrders.map((order: Order) => (
            <div key={order.id} className="p-4 border rounded-lg shadow-md bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Start Time</h3>
                  <p>{new Date(order.startTime).toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Booked By</h3>
                  <p>{order.user.fullname}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Status</h3>
                  <p>{order.status}</p>
                </div>
                {order.status === 'Pending' && (
                  <div>
                    <button
                      onClick={() => handleCancel(order.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-full"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
      <div className="mt-4 flex justify-center">
        <ul className="flex space-x-2">
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <button
                onClick={() => paginate(number)}
                className={`px-4 py-2 border rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Conversations</h2>
        <div className="space-y-4">
          {conversations.map((conversation) => (
            <div key={conversation.id} className="p-4 border rounded-lg shadow-md bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <p>Last Message: {conversation.lastMessage}</p>
                </div>
                <button
                  onClick={() => handleConversationClick(conversation.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full"
                >
                  Chat
                </button>
              </div>
            </div>
          ))}
        </div>

        {currentConversationId && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Messages</h2>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
                  <p>{message.content}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="border rounded p-2 w-full"
                placeholder="Type your message"
              ></textarea>
              <button
                onClick={handleSendMessage}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-full"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
