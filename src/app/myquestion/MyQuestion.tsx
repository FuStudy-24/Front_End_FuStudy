"use client"
import React, { useState, useEffect } from 'react';
import { createQuestionByCoin, getQuestionByUserId, updateQuestion, deleteQuestion } from "@/lib/service/questionService";
import { getAllCategory } from "@/lib/service/categoryService";
import useAuthStore from '@/lib/hooks/useUserStore'; // Ensure this import path matches your project structure
import { Button } from '@headlessui/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

interface Question {
  id: string;
  categoryName: string;
  content: string;
  userId: string;
  image?: string;
}

interface Category {
  id: number;
  categoryName: string;
}

const MyQuestion: React.FC = () => {
  const [categoryName, setCategoryName] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  const { token, userInfo } = useAuthStore();

  const fetchQuestions = async () => {
    if (!userInfo || !userInfo.id || !token) {
      setError("Authentication details are missing.");
      return;
    }
    try {
      const response = await getQuestionByUserId(userInfo.id);
      if (response) {
        setQuestions(response.data.data);
      } else {
        throw new Error("No data received");
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      setError('Failed to load your questions');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getAllCategory();
      if (response.status === 200) {
        setCategories(response.data.data);
      } else {
        throw new Error("No data received");
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setError('Failed to load categories');
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchCategories();
  }, [userInfo, token]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!categoryName || !content) {
//       setError("Category and Content are required.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('categoryName', categoryName);
//     formData.append('content', content);
//     if (image) {
//       formData.append('image', image);
//     }

//     try {
//       if (isUpdating && selectedQuestionId) {
//         const response = await updateQuestion(selectedQuestionId, formData, token);
//         if (response.status === 200) {
//           toast.success("Question updated successfully!");
//           setError(null);
//           setShowForm(false);
//           setCategoryName('');
//           setContent('');
//           setImage(null);
//           setIsUpdating(false);
//           setSelectedQuestionId(null);
//           fetchQuestions();
//         } else {
//           setError("Failed to update question. Please try again.");
//         }
//       } else {
//         const response = await createQuestionByCoin(formData, token);
//         if (response.status === 200) {
//           toast.success("Question created successfully!");
//           setError(null);   
//           setShowForm(false);
//           setCategoryName('');
//           setContent('');
//           setImage(null);
//           fetchQuestions();
//         } else {
//           setError("Failed to create question. Please try again.");
//         }
//       }
//     } catch (err: any) {
//       setError(`Error: ${err.message}`);
//     }
//   };
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryName || !content) {
      setError("Category and Content are required.");
      return;
    }

    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (isUpdating && selectedQuestionId) {
        const response = await updateQuestion(selectedQuestionId, formData, token);
        if (response.status === 200) {
          toast.success("Question updated successfully!");
          setError(null);
          setShowForm(false);
          setCategoryName('');
          setContent('');
          setImage(null);
          setIsUpdating(false);
          setSelectedQuestionId(null);
          fetchQuestions();
        } else {
          setError("Failed to update question. Please try again.");
        }
      } else {
        const response = await createQuestionByCoin(formData, token);
        if (response.status === 200) {
          toast.success("Question created successfully!");
          setError(null);   
          setShowForm(false);
          setCategoryName('');
          setContent('');
          setImage(null);
          fetchQuestions();
        } else {
          setError("Failed to create question. Please try again.");
        }
      }
    } catch (err: any) {
      setError(`Error: ${err.message}`);
    }
};


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpdateClick = (question: Question) => {
    setSelectedQuestionId(question.id);
    setCategoryName(question.categoryName);
    setContent(question.content);
    setIsUpdating(true);
    setShowForm(true);
  };

  const handleDeleteClick = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this question?");
    if (!confirmed) return;

    try {
      const response = await deleteQuestion(id, token);
      if (response.status === 204) {
        toast.success("Question deleted successfully!");
        fetchQuestions(); // Refresh the list of questions
      } else {
        setError("Failed to delete question. Please try again.");
      }
    } catch (err: any) {
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Questions</h1>
        <Button onClick={() => setShowForm(true)} className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600">
          Create New Question
        </Button>
      </div>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <div 
              key={index} 
              className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 group">
              {question.image && <img src={question.image} alt="Question" className="w-full h-40 object-cover mb-4 rounded-lg shadow-md" />}
              <h3 className="text-xl font-bold text-gray-800 mb-2">{question.categoryName}</h3>
              <p className="text-gray-600 mb-2">{question.content}</p>
              <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Pencil1Icon
                  className="h-6 w-6 text-gray-500 hover:text-gray-800 cursor-pointer"
                  onClick={() => handleUpdateClick(question)}
                />
                <TrashIcon
                  className="h-6 w-6 text-gray-500 hover:text-red-600 cursor-pointer"
                  onClick={() => handleDeleteClick(question.id)}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No questions found.</p>
        )}
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-1/2 max-w-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500"
                />
              </div>
              <Button type="submit" className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-full">
                {isUpdating ? 'Update' : 'Create'}
              </Button>
              <Button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 ml-4 bg-red-500 text-white rounded-full hover:bg-red-600">
                Close
              </Button>
            </form>
          </div>
        </div>
      )}
    
    </div>
    
  );
};

export default MyQuestion;
