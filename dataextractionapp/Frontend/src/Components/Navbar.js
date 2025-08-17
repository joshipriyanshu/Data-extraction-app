import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Upload Invoice", path: "/" },
    { name: "Product Info", path: "/productinfopage" },
    { name: "Invoice Info", path: "/Invoice" },
    { name: "Customer Info", path: "/Customer" },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-6 py-4">
        <div className="text-2xl font-extrabold tracking-wide mb-3 sm:mb-0">
          <span className="text-yellow-300">Data Extraction</span> App
        </div>

        <div className="flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:scale-105 
                ${
                  location.pathname === item.path
                    ? "bg-yellow-400 text-gray-900 shadow-lg"
                    : "bg-white/20 hover:bg-white/30"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
