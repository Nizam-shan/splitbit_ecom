"use client";
import { useState, useEffect, useContext } from "react";
import Products from "../../utils/productsList.json";
import ProductCard from "./productCard";
import { CartContext, CartProvider } from "@/Context/cartProvider";
console.log("🚀 ~ Products:", Products);

const ProductListingPage = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(Products);
  const [genderFilter, setGenderFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  console.log("🚀 ~ ProductListingPage ~ colorFilter:", colorFilter);
  const [typeFilter, setTypeFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [gender, setGender] = useState("");
  console.log("🚀 ~ ProductListingPage ~ gender:", gender);

  // Filter products based on search and filters
  useEffect(() => {
    const filtered = Products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.color.toLowerCase().includes(searchText.toLowerCase()) ||
        product.type.toLowerCase().includes(searchText.toLowerCase());

      const matchesColor = colorFilter ? product.color === colorFilter : true;
      const matchesType = typeFilter ? product.type === typeFilter : true;
      const matchesGender = gender ? product.gender === gender : true;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return (
        matchesSearch &&
        matchesColor &&
        matchesType &&
        matchesPrice &&
        matchesGender
      );
    });

    setFilteredProducts(filtered);
  }, [searchText, gender, colorFilter, typeFilter, priceRange]);

  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold mb-6">Browse Products</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, color, or type (e.g. green polo)"
          className="w-full p-2 border border-gray-300 rounded"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 text-black">
        {/* Color Filter */}
        <select
          className="p-2 border border-gray-300 rounded"
          onChange={(e) => setColorFilter(e.target.value)}
          value={colorFilter}
        >
          <option value="">All Colors</option>
          <option value="Green">Green</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          {/* Add more color options */}
        </select>
        {/* gender */}
        <select
          className="p-2 border border-gray-300 rounded cursor-pointer"
          onChange={(e) => setGender(e.target.value)}
          value={gender}
        >
          <option value="">All Types</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>

          {/* Add more types */}
        </select>

        {/* Type Filter */}
        <select
          className="p-2 border border-gray-300 rounded cursor-pointer"
          onChange={(e) => setTypeFilter(e.target.value)}
          value={typeFilter}
        >
          <option value="">All Types</option>
          <option value="Polo">Polo</option>
          <option value="Hoodie">Hoodie</option>
          <option value="Basic">Basic</option>
          {/* Add more types */}
        </select>

        {/* Price Range Filter */}
        <div className="flex flex-col text-white">
          <label>Price Range</label>
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
          />
          <span>{`INR 0 - INR ${priceRange[1]}`}</span>
        </div>
      </div>

      <ProductCard filteredProducts={filteredProducts} />
    </div>
  );
};

export default ProductListingPage;
