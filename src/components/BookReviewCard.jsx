import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Trash2, Edit } from 'lucide-react';

const BookReviewCard = ({ review, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-2xl">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{review.title}</h2>
            <p className="text-gray-600 text-sm">by {review.author}</p>
          </div>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <Star
                key={value}
                className={`w-5 h-5 ${
                  review.rating >= value ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill={review.rating >= value ? 'currentColor' : 'none'}
              />
            ))}
          </div>
        </div>
        <p className="text-gray-800 mb-4 leading-relaxed">{review.reviewText}</p>
        <div className="flex justify-end space-x-2">
          <Link 
            to={`/edit/${review.id}`} 
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-full transition-all"
          >
            <Edit className="w-5 h-5" />
            <span className="text-sm font-medium">Edit</span>
          </Link>
          <button
            onClick={() => onDelete(review.id)}
            className="flex items-center space-x-2 text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-full transition-all"
          >
            <Trash2 className="w-5 h-5" />
            <span className="text-sm font-medium">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookReviewCard;