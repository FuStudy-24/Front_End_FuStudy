// Question.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { getQuestion, getAllQuestionComments} from "@/lib/service/questionService";
import Link from 'next/link';

import CommentsPopup from '@/app/question/CommentsPopup';

interface CommentData {
  questionId: number | undefined;
  id: number;
  content: string;
  userId: string;
  username: string; // Add username field
}

interface QuestionData {
  id: number;
  categoryName: string;
  content: string;
  image: string;
  totalRating: number;
  questionId: string;
  comments: CommentData[];
}

const Question: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionData | null>(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestion();
        if (response.status === 200) {
          setQuestions(response.data.data);
        } else {
          setError("Failed to load data. Please try again later.");
        }
      } catch (err: any) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleImageClick = (question: QuestionData) => {
    setSelectedQuestion(question);
    setShowComments(true);
  };

  const handleCloseComments = () => {
    setShowComments(false);
    setSelectedQuestion(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-2xl font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-600 text-2xl font-semibold">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8 mt-32 relative pt-20">
      <div className="absolute top-0 right-0 m-4">
        <Link href="/myquestion" passHref>
          <div className="text-blue-500 border border-blue-500 px-4 py-2 rounded-full shadow-md hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
            My Question
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {questions.map((question, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 relative">
            {question.image && <img src={question.image} alt="Question" className="w-full h-40 object-cover mb-4 rounded-lg shadow-md cursor-pointer" onClick={() => handleImageClick(question)} />}
            <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-1">{question.content}</h2>
            <p className="text-gray-600 mb-2">{question.categoryName}</p>
            <div className="flex items-center space-x-4 mt-4">
              
              <button 
                onClick={() => handleImageClick(question)}
                className="text-gray-500">  
              </button>
            </div>
          </div>
        ))}
      </div>
      {showComments && <CommentsPopup question={selectedQuestion} onClose={handleCloseComments} />}
    </div>
  );
};

export default Question;
