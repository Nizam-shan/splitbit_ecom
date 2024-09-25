import { CartContext } from "@/Context/cartProvider";
import React, { useContext } from "react";

export default function ProductCard({ filteredProducts }) {
  const { addToCart, cartItem } = useContext(CartContext);
  console.log("🚀 ~ ProductCard ~ cartItem:", cartItem);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border rounded p-4">
            <img
              src={
                product.image
                  ? product.image
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
              }
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <h2 className="text-xl font-bold mt-4">{product.name}</h2>
            <p className="text-gray-700">Color: {product.color}</p>
            <p className="text-gray-700">Type: {product.type}</p>
            <p className="text-gray-700">
              Price: {product?.currency} {product.price}
            </p>
            <button
              className="bg-white p-2 text-black rounded"
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
      {/* No Products Found */}
      {filteredProducts.length === 0 && (
        <div className="text-center mt-8">
          <p>No products match your search criteria.</p>
        </div>
      )}
    </div>
  );
}
