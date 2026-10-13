
import React from "react";
import { Link } from "react-router-dom";

const FixedHeader = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">Finance Brunch</span>
          </Link>
          
          <nav className="hidden md:flex space-x-1">
            <Link 
              to="/calculators" 
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Calculators
            </Link>
            <Link 
              to="/investment-planning" 
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Investment Planning
            </Link>
            <Link 
              to="/indian-stock-analysis" 
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Stock Analysis
            </Link>
            <Link 
              to="/tax-filing" 
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Tax Filing
            </Link>
          </nav>
          
          <div className="md:hidden">
            <button 
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
              aria-label="Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default FixedHeader;
