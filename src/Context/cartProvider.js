"use client";

import { createContext, useEffect, useState } from "react";
import products from "../utils/productsList.json";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(() => {
    if (typeof window !== "undefined") {
      const savedItem = localStorage?.getItem("cartItems");
      return savedItem ? JSON.parse(savedItem) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItem));
  }, [cartItem]);

  const addToCart = (product) => {
    setCartItem((prevItem) => {
      const exist = prevItem?.find((item) => item.id === product?.id);

      if (exist) {
        const newQuantity = exist.quantity + 1;
        alert(
          `${exist?.name} product quantity increased by ${exist.quantity + 1}`
        );

        if (newQuantity > product.quantity) {
          alert(`cannot more than ${product?.quantity} items`);
          return prevItem;
        }

        return prevItem?.map((item) =>
          item?.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      }
      alert("Item added to cart");

      if (product.quantity > 0) {
        return [...prevItem, { ...product, quantity: 1 }];
      }
      alert(`Cannot add more than ${product.quantity} items`);
      return prevItem;
    });
  };

  const getTotalAmount = () => {
    console.log(
      "to",
      cartItem.reduce((total, item) => total + item.price * item.quantity, 0)
    );

    return cartItem.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const removeFromCart = (id) => {
    setCartItem((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    console.log("🚀 ~ CartProvider ~ quantity:", quantity);
    console.log("🚀 ~ CartProvider ~ id:", id);

    const prodQty = products.find((item) => item.id === id);
    console.log("🚀 ~ updateQuantity ~ prodQty:", prodQty);
    if (prodQty.quantity < quantity) {
      console.log("kya bhai");

      alert("quantity is greater than available product quantity");
    } else {
      setCartItem((prevItem) =>
        prevItem.map((item) =>
          item?.id === id ? { ...item, quantity: quantity } : item
        )
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        setCartItem,
        cartItem,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
