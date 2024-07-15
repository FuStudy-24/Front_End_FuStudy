"use client"
import React, { useState, useEffect } from 'react';
import { getAllMentorVerify } from '@/lib/service/mentorService';
import BookingModal from './BookingModal';
import Image from 'next/image';

interface User {
  fullname: string;
  avatar: string;
}

interface Mentor {
  academicLevel: string;
  workPlace: string;
  skill: string;
  profession: string;
  user: User;
  id: number; // Đảm bảo id là một phần của đối tượng mentor
}

const Mentor: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await getAllMentorVerify();
        setMentors(response.data.data);
      } catch (error) {
        console.error('Failed to fetch mentors:', error);
      }
    };

    fetchMentors();
  }, []);

  return (
    <div className="py-10 sm:py-24 bg-paleblue">
      <div className="mx-auto max-w-2xl lg:max-w-7xl sm:py-4 px-4 lg:px-8">
        <h2 className="text-4xl md:text-5xl text-center font-semibold text-midnightblue mb-8">
          Meet with our Mentors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor) => (
            <div
              key={mentor.id} // Thêm thuộc tính key ở đây
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
            >
              <Image
                src={mentor.user.avatar}
                alt="user-avatar"
                width={100}
                height={100}
                className="w-32 h-32 rounded-full mb-4 cursor-pointer"
                onClick={() => {
                  setSelectedMentor(mentor);
                  setShowModal(true);
                }}
              />
              <h3 className="text-2xl font-semibold text-gray-800">{mentor.user.fullname}</h3>
              <h4 className="text-lg font-normal text-gray-600 pt-2">{mentor.profession}</h4>
              <p className="text-md font-normal text-gray-600 pt-2">{mentor.academicLevel} at {mentor.workPlace}</p>
              <p className="text-md font-normal text-gray-600 pt-2">Skill: {mentor.skill}</p>
              {/* <p className="text-md font-normal text-gray-600 pt-2">ID: {mentor.id}</p> */}
              <div className="mt-4">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Image src="/assets/mentor/linkedin.svg" alt="linkedin-icon" className="w-6 h-6" width={24} height={24} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BookingModal mentor={selectedMentor} showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default Mentor;
