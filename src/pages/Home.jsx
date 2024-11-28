import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import BookReviewCard from '../components/BookReviewCard';
import apiClient from '../services/apiClient';
import { BookOpen, PlusCircle, Search, Filter, ArrowUpDown, Layout, LayoutGrid } from 'lucide-react';
import { useToast } from '../components/Toast';

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('list');
  const showToast = useToast();

  const fetchReviews = useCallback(async () => {
    try {
      const response = await apiClient.get('/reviews');
      setReviews(response.data);
    } catch (error) {
      showToast('Failed to fetch reviews', 'error');
    }
  }, [showToast]);

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/reviews/${id}`);
      showToast('Review deleted successfully');
      fetchReviews();
    } catch (error) {
      showToast('Failed to delete review', 'error');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const filteredAndSortedReviews = useMemo(() => {
    return reviews
      .filter(review => 
        (review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         review.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (ratingFilter === 0 || review.rating >= ratingFilter)
      )
      .sort((a, b) => {
        const dateA = new Date(a.reviewDate || a.createdAt);
        const dateB = new Date(b.reviewDate || b.createdAt);
        
        return sortBy === 'newest' 
          ? dateB - dateA 
          : dateA - dateB;
      });
  }, [reviews, searchTerm, ratingFilter, sortBy]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="Search by title or author" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="text-gray-600" />
            <select 
              value={ratingFilter}
              onChange={(e) => setRatingFilter(Number(e.target.value))}
              className="px-4 py-2 border bg-white border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>All Ratings</option>
              {[1, 2, 3, 4, 5].map(rating => (
                <option key={rating} value={rating}>
                  {rating} Star{rating !== 1 ? 's' : ''} and above
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <ArrowUpDown className="text-gray-600" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border bg-white border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
              className="p-2 rounded-full hover:bg-gray-200 transition-all"
            >
              {viewMode === 'list' ? <LayoutGrid className="text-gray-600" /> : <Layout className="text-gray-600" />}
            </button>
          </div>

          <Link
            to="/new"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add New Review</span>
          </Link>
        </div>

        {filteredAndSortedReviews.length === 0 ? (
          <div className="text-center bg-white shadow-lg rounded-xl p-12">
            <BookOpen className="w-16 h-16 mx-auto text-blue-600 mb-6" strokeWidth={1.5} />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              No Reviews Found
            </h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setRatingFilter(0);
                setSortBy('newest');
              }}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'list' 
            ? 'space-y-4' 
            : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'
          }>
            {filteredAndSortedReviews.map((review) => (
              <BookReviewCard
                key={review.id}
                review={review}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;