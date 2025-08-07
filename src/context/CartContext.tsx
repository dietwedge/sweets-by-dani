import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cookie } from '@/data/mock-cookies';
import { toast } from 'sonner';

interface CartItem extends Cookie {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (cookie: Cookie, quantity: number) => void;
  removeFromCart: (cookieId: string) => void;
  updateQuantity: (cookieId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('sweets-by-dani-cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sweets-by-dani-cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (cookie: Cookie, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === cookie.id);
      if (existingItem) {
        const updatedCart = prevCart.map((item) =>
          item.id === cookie.id ? { ...item, quantity: item.quantity + quantity } : item
        );
        toast.success(`${quantity} more ${cookie.name} added to cart!`);
        return updatedCart;
      } else {
        const newCart = [...prevCart, { ...cookie, quantity }];
        toast.success(`${quantity} ${cookie.name} added to cart!`);
        return newCart;
      }
    });
  };

  const removeFromCart = (cookieId: string) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find(item => item.id === cookieId);
      if (itemToRemove) {
        toast.info(`${itemToRemove.name} removed from cart.`);
      }
      return prevCart.filter((item) => item.id !== cookieId);
    });
  };

  const updateQuantity = (cookieId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cookieId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === cookieId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Your cart has been cleared.");
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};