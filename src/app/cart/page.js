"use client";
import { CartContext } from "@/Context/cartProvider";
import React, { useContext, useEffect, useState } from "react";

export default function CartPage() {
  const { cartItem, getTotalAmount, removeFromCart, updateQuantity } =
    useContext(CartContext);
  console.log("🚀 ~ CartPage ~ cartItem:", cartItem);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {/* If cart is empty */}
      {cartItem.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <div>
          {/* Cart Items */}
          <div className="space-y-6">
            {cartItem.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p className="text-gray-600">Color: {item.color}</p>
                    <p className="text-gray-600">Price: INR {item.price}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-4  text-black">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    className="w-16 p-1 border border-gray-300 rounded"
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="mt-6 text-right">
            <h3 className="text-xl font-bold">Total: INR {getTotalAmount()}</h3>
            <button className="mt-4 p-2 bg-blue-500 text-white rounded">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
