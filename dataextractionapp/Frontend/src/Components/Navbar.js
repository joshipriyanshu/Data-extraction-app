import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Uploadsection from './Input';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-2xl sm:text-3xl font-bold tracking-wide mb-2 sm:mb-0">
          Welcome to the <span className="text-yellow-300">Data Extraction App</span>
        </div>
        <div className="flex space-x-4">
          {/* Product Page Button */}
          <Link
            to="/productinfopage" // Use Link to navigate
            className="px-6 py-2 rounded-full font-semibold text-white bg-blue-500 hover:bg-blue-600
                       transition-all duration-300 ease-in-out transform hover:scale-105
                       focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-75 shadow-md
                       flex items-center justify-center" // Added flex for consistent button styling
          >
            Product Page
          </Link>

          {/* Invoice Info Button */}
          <Link
            to="/Invoice" // Use Link to navigate
            className="px-6 py-2 rounded-full font-semibold text-white bg-purple-500 hover:bg-purple-600
                       transition-all duration-300 ease-in-out transform hover:scale-105
                       focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-75 shadow-md
                       flex items-center justify-center" // Added flex for consistent button styling
          >
            Invoice Info
          </Link>

          <Link
            to="/Uploadsection" // Use Link to navigate
            className="px-6 py-2 rounded-full font-semibold text-white bg-purple-500 hover:bg-purple-600
                       transition-all duration-300 ease-in-out transform hover:scale-105
                       focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-75 shadow-md
                       flex items-center justify-center" // Added flex for consistent button styling
          >
            Upload File  
          </Link>
        </div>
      </div>
      
    </nav>
  );
}

export default Navbar;