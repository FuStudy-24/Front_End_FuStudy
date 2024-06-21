"use client";
import React, { useState } from 'react';
import { Button } from '@headlessui/react';

interface QuestionData {
  studentId: number;
  categoryName: string;
  content: string;
  image: string;
  totalRating: number;
}

interface CommentsProps {
  question: QuestionData | null;
  onClose: () => void;
}

const Comments: React.FC<CommentsProps> = ({ question, onClose }) => {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  if (!question) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-10 rounded-lg w-full max-w-4xl shadow-lg flex">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="w-1/2 pr-8">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{question.content}</h3>
          <p className="text-gray-600 mb-4">{question.categoryName}</p>
          {question.image && <img src={question.image} alt="Question" className="w-full h-40 object-cover rounded-lg shadow-md" />}
        </div>
        <div className="w-1/2 pl-8 border-l border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Comments</h3>
          <div className="space-y-4 mb-4">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg">{comment}</div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-md"
              placeholder="Add a comment"
            />
            <Button onClick={handleAddComment} className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">Add</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
