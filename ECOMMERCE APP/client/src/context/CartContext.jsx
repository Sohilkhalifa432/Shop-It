import { useContext, createContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  // 1. Load cart from localStorage on first render
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });

  // 2. Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      // Optionally handle quota exceeded error here
    }
  }, [cart]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const cartApi = () => useContext(CartContext);

export { cartApi, CartProvider };
