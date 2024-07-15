"use client";
import React, { useEffect, useState } from 'react';
import useAuthStore from '@/lib/hooks/useUserStore';
import MyRequest from '@/app/myrequest/MyRequest'; 
import MyOrder from '@/app/myorder/MyOrder'; 
import dynamic from 'next/dynamic';

const Calling = dynamic(() => import('@/app/Calling'), { ssr: false });

const MyBooking: React.FC = () => {
  const [showCalling, setShowCalling] = useState<boolean>(false);
  const [joinRoom, setJoinRoom] = useState<string | null>(null);
  const { userInfo } = useAuthStore((state) => ({
    userInfo: state.userInfo,
  }));

  const handleCountdownComplete = (bookingId: number) => {
    console.log('Countdown complete for bookingId:', bookingId);
    setJoinRoom(bookingId.toString());
  };

  const handleJoinRoom = () => {
    console.log('Joining room...');
    setShowCalling(true);
  };

  useEffect(() => {
    console.log('userInfo:', userInfo);
  }, [userInfo]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {userInfo.roleName === 'Mentor' && <MyRequest />}
      {userInfo.roleName === 'Student' && <MyOrder />}
      {joinRoom && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="callContainer bg-white rounded-lg shadow-lg p-4">
            <Calling />
          </div>
        </div>
      )}
    </div>
  );
};

// Countdown Timer Component
const CountdownTimer: React.FC<{ targetTime: Date, onComplete: () => void }> = ({ targetTime, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState<number>(targetTime.getTime() - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = targetTime.getTime() - new Date().getTime();
      if (newTimeLeft <= 0) {
        clearInterval(interval);
        onComplete();
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime, onComplete]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Time until call:</h3>
      <p>{formatTime(timeLeft)}</p>
    </div>
  );
};

export default MyBooking;
