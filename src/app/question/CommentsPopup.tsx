// CommentsPopup.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { GetAllQuestionCommentsByQuestionId, CreateQuestionComment, DeleteQuestionComment, UpdateQuestionComment } from '@/lib/service/questionService';
import useAuthStore from '@/lib/hooks/useUserStore';

interface CommentData {
  id: number; // Ensure that CommentData includes an ID field
  content: string;
  user: string;
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

interface CommentsPopupProps {
  question: QuestionData | null;
  onClose: () => void;
}

const CommentsPopup: React.FC<CommentsPopupProps> = ({ question, onClose }) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editCommentContent, setEditCommentContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(7); // Adjust page size as needed
  const { userInfo, token } = useAuthStore();

  const fetchComments = async () => {
    if (!question) return;
    setLoading(true);
    setError(null);
    try {
      const response = await GetAllQuestionCommentsByQuestionId(question.id, pageIndex, pageSize);
      if (response.status === 200) {
        setComments(response.data.data);
      } else if (response.status === 404) {
        setComments([]); // No comments found for this question
      } else {
        setError("Failed to load comments. Please try again later.");
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        setComments([]); // No comments found for this question
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [question, pageIndex]);

  if (!question) return null;

  const getUsername = (userId: string) => {
    const user = userInfo;
    return user ? user.username : 'Unknown User';
  };

  const handleNextPage = () => setPageIndex((prev) => prev + 1);
  const handlePrevPage = () => setPageIndex((prev) => Math.max(prev - 1, 1));

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleEditCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditCommentContent(e.target.value);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      questionId: question?.id,
      content: newComment.trim(),
    };

    try {
      const response = await CreateQuestionComment(commentData, token);
      if (response.status === 201) {
        setNewComment(""); // Clear the comment input field
        //await fetchComments(); // Reload comments after successful creation
      } else {
        await fetchComments();
      }
    } catch (err: any) {
      setError(`Error: ${err.message}`);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      const response = await DeleteQuestionComment(commentId, token);
      if (response.status === 200) {
       // Reload comments after successful deletion
      } else {
        await fetchComments();
      }
    } catch (err: any) {
      setError(`Error: ${err.message}`);
    }
  };

  const handleEditComment = (comment: CommentData) => {
    setEditCommentId(comment.id);
    setEditCommentContent(comment.content);
  };

  const handleUpdateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editCommentId === null || !editCommentContent.trim()) return;

    const commentData = {
      questionId: question?.id,
      content: editCommentContent.trim(),
    };

    try {
      const response = await UpdateQuestionComment(editCommentId, commentData, token);
      if (response.status === 200) {
        setEditCommentId(null);
        setEditCommentContent(""); // Clear the edit input field
        await fetchComments(); // Reload comments after successful update
      } else {
        setError("Failed to update comment. Please try again later.");
      }
    } catch (err: any) {
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mx-4 flex flex-col">
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-1/2 pr-4">
            <img src={question.image} alt={question.content} className="w-full h-40 object-cover mb-4 rounded-lg shadow-md" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{question.categoryName}</h2>
            <p className="text-gray-600 mb-2">{question.content}</p>
          </div>
          <div className="w-full md:w-1/2 pl-4 border-l-2 border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Comments</h2>
              <button onClick={onClose} className="text-gray-600 hover:text-gray-900">&times;</button>
            </div>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="mb-4 flex justify-between items-start group">
                  <div>
                    <p className="text-gray-800"><strong>{getUsername(comment.user)}</strong></p>
                    <p className="text-gray-600">{comment.content}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleEditComment(comment)}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No comments available.</p>
            )}
            {!editCommentId && (
              <form onSubmit={handleCommentSubmit} className="mt-4">
                <textarea
                  className="w-full p-2 border rounded"
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Add a comment..."
                  rows={3}
                />
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
            )}
            {editCommentId && (
              <form onSubmit={handleUpdateComment} className="mt-4">
                <textarea
                  className="w-full p-2 border rounded"
                  value={editCommentContent}
                  onChange={handleEditCommentChange}
                  placeholder="Edit your comment..."
                  rows={3}
                />
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Update
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={handlePrevPage}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            disabled={pageIndex === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsPopup;
