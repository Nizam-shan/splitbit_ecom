"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Don't render until mounted
  if (!isMounted) {
    return null;
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">T-Shirt Store</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <FaShoppingCart size={20} />
          </Link>
          <button className="md:hidden" onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* {isOpen && (
        <div className="md:hidden bg-gray-700">
          <Link href="/catalog" className="block px-4 py-2 hover:bg-gray-600">
            Catalog
          </Link>
          <Link href="/cart" className="block px-4 py-2 hover:bg-gray-600">
            Cart
          </Link>
        </div>
      )} */}
    </nav>
  );
};

export default Navbar;
