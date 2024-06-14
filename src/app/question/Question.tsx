"use client";
import React, { useEffect, useState } from 'react';
import { getQuestion } from "@/lib/service/questionService";

interface QuestionData {
  studentId: number;
  categoryId: number;
  content: string;
  image: string;
  totalRating: number;
}

const Question = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuestion();
        if (response.status === 200) {
          setQuestions(response.data.data);
        } else {
          setError("Failed to load data");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {questions.map((question) => (
          <div key={question.studentId} className="bg-white p-6 rounded-lg shadow-md">
            {question.image && <img src={question.image} alt="Question" className="w-full h-40 object-cover mb-4 rounded-lg shadow-md" />}
            <h2 className="text-xl font-bold text-gray-800 mb-2">{question.content}</h2>
            {/* <p className="text-gray-600 mb-2">Category ID: {question.categoryId}</p>
            <p className="text-gray-600 mb-2">Total Rating: {question.totalRating}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
