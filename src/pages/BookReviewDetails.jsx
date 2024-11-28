import React from 'react';
import BookReviewForm from '../components/BookReviewForm';
import apiClient from '../services/apiClient';
import { useNavigate } from 'react-router-dom';

const BookReviewDetails = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await apiClient.post('', data);
    navigate('/');
  };

  return (
    <div className="p-4">
      <BookReviewForm onSubmit={handleCreate} />
    </div>
  );
};

export default BookReviewDetails;
