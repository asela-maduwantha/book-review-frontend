import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import BookReviewCard from '../components/BookReviewCard';
import apiClient from '../services/apiClient';
import { BookOpen, PlusCircle } from 'lucide-react';
import { useToast } from '../components/Toast';

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const showToast = useToast();

  const fetchReviews = useCallback(async () => {
    try {
      const response = await apiClient.get('');
      setReviews(response.data);
    } catch (error) {
      showToast('Failed to fetch reviews', 'error');
    }
  }, [showToast]); 

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/${id}`);
      showToast('Review deleted successfully');
      fetchReviews();
    } catch (error) {
      showToast('Failed to delete review', 'error');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {reviews.length === 0 ? (
          <div className="text-center bg-white shadow-lg rounded-xl p-12">
            <BookOpen className="w-16 h-16 mx-auto text-blue-600 mb-6" strokeWidth={1.5} />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              No Book Reviews Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start your reading journey by adding your first review!
            </p>
            <Link 
              to="/new" 
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Add First Review</span>
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex justify-end mb-6">
              <Link 
                to="/new" 
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Add New Review</span>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <BookReviewCard 
                  key={review.id} 
                  review={review} 
                  onDelete={handleDelete} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;