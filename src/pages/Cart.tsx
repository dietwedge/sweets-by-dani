import React from "react";

const Cart = () => {
  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-bold mb-4">Your Shopping Cart</h1>
      <p className="text-lg text-gray-600">Your cart is currently empty.</p>
      <p className="text-md text-gray-500 mt-2">Start adding some delicious cookies!</p>
    </div>
  );
};

export default Cart;