import React from 'react';
import { BookOpen } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 shadow-lg p-4 text-white flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <BookOpen className="w-8 h-8 text-white" strokeWidth={2} />
        <h1 className="text-2xl font-extrabold tracking-tight">Book Review Hub</h1>
      </div>
    </nav>
  );
};

export default Navbar;